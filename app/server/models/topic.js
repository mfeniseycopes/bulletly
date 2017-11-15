const topicDefn = (db, DataTypes) => {

  const Topic = db.define('topic', {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 'Untitled Topic',
    }
  }, {
    hooks: {
      afterCreate: topic =>
        topic.createBullet({
          ord: 1,
          type: 'note',
        }),
    }
  })

  Topic.associate = db => {

    Topic.belongsTo(db.user, {
      foreignKey: 'ownerId',
      as: 'owner',
      hooks: true,
    })

    Topic.hasMany(db.bullet, {
      foreignKey: 'topic_id',
      as: 'bullets',
      hooks: true,
      onDelete: 'CASCADE',
    })
  }

  return Topic
}

module.exports = topicDefn
