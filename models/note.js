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

    Note.hasOne(db.models.Bullet, {
      foreignKey: 'bulletable_id',
      constraints: false,
      scope: {
        bulletable: 'Note'
      }
    })
  }

  return Note
};

module.exports = noteDefn
