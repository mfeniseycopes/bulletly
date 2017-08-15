const bulletDefn = (db, DataTypes) => {

  const Bullet = db.define('Bullet', {

    type: DataTypes.ENUM('task', 'note', 'event'),
    title: DataTypes.STRING,
    body: DataTypes.TEXT,
    body_type: DataTypes.ENUM('markdown', 'latex'),
    due_date: DataTypes.DATE,
    completed_on: DataTypes.DATE,
    recurrence: DataTypes.STRING,

    topic_id: DataTypes.INTEGER,
    parent_id: DataTypes.INTEGER,
  })

  Bullet.associate = db => {

    Bullet.belongsTo(db.models.Bullet, {
      foreignKey: {
        name: 'topic_id',
      },
      as: 'topic',
    })

    Bullet.belongsTo(db.models.Bullet, {
      foreignKey: {
        name: 'parent_id',
        allowNull: true,
      },
      as: 'parent',
    })

    Bullet.hasMany(db.models.Bullet, {
      foreignKey: {
        name: 'parent_id',
        allowNull: true,
      },
      as: 'children',
    })
  }

  return Bullet
}

  module.exports = bulletDefn
