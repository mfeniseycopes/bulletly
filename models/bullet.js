const bulletDefn = (db, DataTypes) => {
  const Bullet = db.define('Bullet', {
    topic_id: {
      type: DataTypes.INTEGER
    },
  })

  Bullet.associate = db => {
    Bullet.belongsTo(db.models.Bullet, {
      foreignKey: {
        name: 'parent_id',
        allowNull: true,
      }
    })

    Bullet.hasMany(db.models.Bullet, {
      foreignKey: {
        name: 'parent_id',
        allowNull: true,
      }
    })

    Bullet.hasOne(db.models.Note, {
      foreignKey: {
        name: 'bullet_id',
      }
    })
  }

  return Bullet
};

module.exports = bulletDefn
