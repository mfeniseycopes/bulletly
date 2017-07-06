const eventDefn = (db, DataTypes) => {

  const Event = db.define('Event', {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    recurring: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  })

  Event.associate = db => {

    Event.hasOne(db.models.Bullet, {
      foreignKey: 'bulletable_id',
      constraints: false,
      scope: {
        bulletable: 'Event',
      }
    })
  }

  return Event
};

module.exports = eventDefn
