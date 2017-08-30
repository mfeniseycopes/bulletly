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
      afterValidate: (bullet) => {

        Bullet.findById(bullet.id)
          .then(oldBullet => {
            let where
            let shift

            if (oldBullet) {
              where = { ord: { $between: [oldBullet.ord, bullet.ord].sort() } }
              shift = ldBullet.ord < bullet.ord ? -1 : 1
            } else {
              where = { ord: { $gte: bullet.ord } }
              shift = 1
            }

            Bullet.findAll({ where })
              .then(bullets => {
                bullets.forEach(bullet => bullet.ord += shift) 
                bullets.forEach(bullet => bullet.save({ validate: false, hooks: false }))
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
