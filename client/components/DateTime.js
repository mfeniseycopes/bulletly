import React from 'react'
import moment from 'moment'

const DateTime = ({onChange, onSubmit, date=new Date()})=> {

  const formattedDate = moment(date).format('YYYY-DD-DDTHH:mm:ss')

  return (
    <form onSubmit={onSubmit}>
      <input type='datetime-local' 
        autoFocus
        value={formattedDate}
        onChange={onChange}/>
      <button>Done</button>
    </form>
  )
}

export default DateTime
