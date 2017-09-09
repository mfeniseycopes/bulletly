import React from 'react'
import moment from 'moment'
import Datetime from 'react-datetime'

import BaseBullet from './BaseBullet'
import datetime from '../../styles/datetime.scss'

class EventBullet extends BaseBullet {

  constructor(props) {
    super(props)
    this.state.dateFloater = false
  }

  symbol() {
    return <i className='fa fa-circle-o symbol' aria-hidden="true"></i>
  }

  toggleDateFloater() {
    this.setState(({dateFloater}) => ({dateFloater: !dateFloater}))
  }

  dateRender() {
    const {dateFloater, due_date} = this.state
    let floater = null

    if (dateFloater) {
      const dateOnBlur = () =>
        this.updateBullet()
          .then(this.toggleDateFloater.bind(this))
      const dateOnChange = e =>
        this.setState({due_date: e.toISOString()})

       floater = (
        <Datetime
          className='datetime'
          inputProps={{autoFocus: true, placeholder: 'Enter a '}}
          defaultValue={moment()}
          value={moment(due_date)}
          dateFormat='MM/DD/YY'
          input={false}
          timeFormat=''
          onChange={dateOnChange}
          closeOnSelect={true}
          onBlur={dateOnBlur}/>)
    }
    const dateOnClick = e => this.setState({dateFloater: true})

    return (
      <button className='bullet-date' onClick={() => this.toggleDateFloater()}>
        {due_date ? moment(due_date).format('MM/DD/YY') : <i className="fa fa-calendar-plus-o" aria-hidden="true"></i>}
        {floater}
      </button>)
}

  render() {
    return this.protoRender(this.dateRender())
  }
}

export default EventBullet
