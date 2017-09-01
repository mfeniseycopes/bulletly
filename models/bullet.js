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
              console.log('OTHERS', others)
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
          return Bullet.findById(bullet.id, { transaction: t })
            .then(oldBullet => {

              if (bullet.ord === oldBullet.ord) return []

              let where 
              
              // INDENTING
              // below on previous decrement ord 
              if (bullet.ord === 1) {
                where = {
                  ord: { $gt: oldBullet.ord },
                  parent_id: oldBullet.parent_id,
                  topic_id: oldBullet.topic_id,
                } 
              }

              // OUTDENTING
              // below on previous decrement ord
              // same and below on next increment
              if (bullet.parent_id !== oldBullet.parent_id && bullet.ord !== 1) {
                where = {
                  $or: [{
                    ord: { $gte: bullet.ord },
                    parent_id: bullet.parent_id,
                    topic_id: bullet.topic_id,
                  }, {
                    ord: { $gte: oldBullet.ord },
                    parent_id: oldBullet.parent_id,
                    topic_id: oldBullet.topic_id,
                  }] 
                }
              }

              return Bullet.findAll({
                where,
              },{
                transaction: t,
              })
            })
            .then(others => {

              return Promise.all(
                others.map(other => {

                  let ord = other.ord
                  // new parent bumps down (inc)
                  if (other.parent_id === bullet.parent_id) {
                    ord++
                  } 
                  // old parent children bump up (dec)
                  else {
                    ord--
                  }

                  other.update({
                    ord,
                  }, { 
                    validations: false, hooks: false, transaction: t 
                  })
                })
              )       
            })
        })
      },
      afterDestroy: bullet =>{
        return db.transaction()
          .then(transaction => {
            return Bullet.findAll({
              where: {
                ord: { $gt: bullet.ord },
                parent_id: bullet.parent_id,
                topic_id: bullet.topic_id,
              },
            }, 
              { transaction })
          })
          .then((others, transaction) => {
            return Promise.all(
              others.map(other =>
                other.update({ord: other.ord - 1},{validations: false, hooks: false, transaction}))
            )
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
