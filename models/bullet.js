const bulletDefn = (db, DataTypes) => {

  const Bullet = db.define('bullet', {

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
    prev_id: DataTypes.INTEGER,
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
