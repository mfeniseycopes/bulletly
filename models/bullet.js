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
      afterCreate: (bullet) => {
        return db.transaction()
          .then(transaction => {
            return Bullet.findAll({
              where: {
                ord: { $gte: bullet.ord },
                parent_id: bullet.parent_id,
                topic_id: bullet.topic_id,
              },
            }, 
            { transaction })
          })
          .then((others, transaction) => {
            return Promise.all(
              others.map(other =>
                other.update({ord: other.ord + 1},{validations: false, hooks: false, transaction}))
            )       
          })
      },
      afterUpdate: bullet => {
        return db.transaction()
          .then(transaction => Bullet.findById(bullet.id))
          .then((oldBullet, transaction) => {

            if (bullet.ord === oldBullet.ord) return

            const between = [oldBullet.ord, bullet.ord]
            between.sort()

            return Bullet.findAll({
              where: {
                ord: { $between: between },
                parent_id: bullet.parent_id,
                topic_id: bullet.topic_id,
              },
            }, 
            { transaction })
          })
          .then((others, transaction) => {
            
            return Promise.all(
              others.map(other =>
                other.update({
                  ord: other.ord + (bullet.ord < other.ord ? 1 : -1)
                },
                {
                  validations: false, hooks: false, transaction
                }))
            )       
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
