const bulletDefn = (db, DataTypes) => {

  const Bullet = db.define('Bullet', {
    topic_id: {
      type: DataTypes.INTEGER
    },
    bulletable: {
      type: DataTypes.STRING,
    },
    bulletable_id: {
      type: DataTypes.INTEGER,
    },
  })

  Bullet.associate = db => {
    Bullet.hasOne(db.models.Bullet, {
      foreignKey: {
        name: 'parent_id',
        allowNull: true,
      },
      as: 'Parent' 
    })

    Bullet.hasMany(db.models.Bullet, {
      foreignKey: {
        name: 'parent_id',
        allowNull: true,
      },
      as: 'Children'
    })

    Bullet.belongsTo(db.models.Note, {
      foreignKey: 'bulletable_id',
      constraints: false,
      as: 'Note',
    })

    Bullet.belongsTo(db.models.Task, {
      foreignKey: 'bulletable_id',
      constraints: false,
      as: 'Task',
    })

  }

  return Bullet
};

module.exports = bulletDefn
