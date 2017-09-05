const bulletDefn = (db, DataTypes) => {

  const Bullet = db.define('bullet', {
    ord: DataTypes.INTEGER,
    type: {
      type: DataTypes.ENUM('task', 'note', 'event'),
      allowNull: false,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    body: DataTypes.TEXT,
    body_type: {
      type: DataTypes.ENUM('markdown', 'latex'),
      allowNull: false,
      defaultValue: 'markdown',
    },
    due_date: DataTypes.DATE,
    completed_on: DataTypes.DATE,
    recurrence: DataTypes.STRING,

    topic_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    parent_id: DataTypes.INTEGER,
  }, {
    hooks: {
      beforeCreate: bullet => {
        return db.transaction(t => {
          return Bullet.findAll({
            where: {
              ord: { $gte: bullet.ord },
              parent_id: bullet.parent_id,
              topic_id: bullet.topic_id,
            },
          }, { transaction: t })
            .then(others => {
            return Promise.all(
              others.map(other =>
                other.update({
                  ord: other.ord + 1
                }, {
                  validations: false, 
                  hooks: false, 
                  transaction: t 
                })))       
          })
        })
      },
      beforeUpdate: bullet => {
        return db.transaction(t => {
          let oldBullet
          const options = { 
            transaction: t,
            validations: false, 
            hooks: false,
          }

          return Bullet.findById(bullet.id, { transaction: t })
            .then(_oldBullet => {
              oldBullet = _oldBullet // closure

              if (bullet.parent_id === oldBullet.parent_id &&
                bullet.ord === oldBullet.ord) 
                return []

              // indent/outdent 
              // below on previous decrement ord 
              // below (inclusive) on current increment ord
              const query = {
                where: {
                  $or: [{
                    ord: { $gte: bullet.ord },
                    parent_id: bullet.parent_id,
                    topic_id: bullet.topic_id,
                  }, {
                    ord: { $gt: oldBullet.ord },
                    parent_id: oldBullet.parent_id,
                    topic_id: oldBullet.topic_id,
                  }] 
                }
              }

              return Bullet.findAll(query, options)
            })
            .then(others => {

              return Promise.all(
                others.map(other => {
                  const change = {
                    ord: other.ord + (other.parent_id === bullet.parent_id ? 1 : -1)
                  }

                  return other.update(change, options)
                })
              )       
            })
        })
      },
      afterDestroy: bullet => {
        return db.transaction(t => {
          const query = {
            where: {
              ord: { $gt: bullet.ord },
              parent_id: bullet.parent_id,
              topic_id: bullet.topic_id,
            },
          }

          const options = {
            validations: false,
            hooks: false,
            transaction: t,
          }

          return Bullet.findAll(query, options)
            .then((others, transaction) => {
              return Promise.all(
                others.map(other =>
                  other.update({ord: other.ord - 1}, options)))
            })
        })
      }
    }
  })


  Bullet.associate = db => {

    Bullet.belongsTo(db.models.topic, {
      foreignKey: 'topic_id',
      as: 'topic',
    })

    Bullet.belongsTo(db.models.bullet, {
      foreignKey: 'parent_id',
      as: 'parent',
    })

    Bullet.hasMany(db.models.bullet, {
      foreignKey: 'parent_id',
      as: 'children',
      hooks: true,
      onDelete: 'CASCADE',
    })

    Bullet.belongsTo(db.models.bullet, {
      foreignKey: 'prev_id',
      as: 'prev',
    })

    Bullet.hasMany(db.models.bullet, {
      foreignKey: 'prev_id',
      as: 'next',
    })
  }

  return Bullet
}

module.exports = bulletDefn
