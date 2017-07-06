const taskDefn = (db, DataTypes) => {

  const Task = db.define('Task', {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    due_date: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    completed: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    completed_on: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    recurring: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  })

  Task.associate = db => {

    Task.hasOne(db.models.Bullet, {
      foreignKey: 'bulletable_id',
      constraints: false,
      scope: {
        bulletable: 'Task'
      }
    })
  }

  return Task
}

module.exports = taskDefn
