const noteDefn = (db, DataTypes) => {
  const Note = db.define('Note', {
    title: {
      type: DataTypes.STRING,
    },
    body: {
      type: DataTypes.TEXT,
    },
    body_type: {
      type: DataTypes.STRING
    },
  })

  Note.associate = db => {
    
    Note.belongsTo(db.models.Bullet, {
      foreignKey: {
        name: 'bullet_id',
        allowNull: false,
      }
    })
  }

  return Note
};

module.exports = noteDefn
