const topicDefn = (db, DataTypes) => {

  const Topic = db.define('Topic', {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 'Untitled Topic',
    }
  })

  Topic.associate = db => {
  
    Topic.hasMany(db.models.Bullet, {
      foreignKey: {
        name: 'topic_id',
      },
      as: 'bullets',
      hooks: true,
      onDelete: 'CASCADE',
    })
  }

  return Topic
}

module.exports = topicDefn
