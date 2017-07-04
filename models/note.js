const noteDefn = (db, DataTypes) => {
  const Note = db.define('note', {
    title: {
      type: DataTypes.STRING,
    },
    body: {
      type: DataTypes.TEXT,
    },
    body_type: {
      type: DataTypes.STRING
    }
  })

  return Note
};

module.exports = noteDefn
