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

  toggleDateFloater(forcedVal) {
    console.info('setting dateFloater', forcedVal)
    this.setState(({dateFloater}) => (
      {dateFloater: forcedVal !== undefined ? forcedVal : !dateFloater}))
  }

  dateRender() {
    const {dateFloater, due_date} = this.state

    const datetimeOnChange = e =>
      this.setState(
        () => ({due_date: e.toISOString()}),
        () => this.updateBullet()
          .then(() => {
            this.toggleDateFloater(false)
          }))

    const floater = (
      <Datetime
        className='datetime'
        inputProps={{autoFocus: true}}
        defaultValue={moment()}
        value={moment(due_date)}
        dateFormat='MM/DD/YY'
        timeFormat=''
        onChange={datetimeOnChange}
        onBlur={() => this.setState({dateFloater: false, blurring: true}) }/>)


    const dateOnClick = () => {
      this.state.blurring ?
        this.setState({blurring: false}) :
        this.toggleDateFloater()
    }
    
    return (
      <div>
      <button className='bullet-date' onClick={dateOnClick}>
        {due_date ? moment(due_date).format('MM/DD/YY') : <i className="fa fa-calendar-plus-o" aria-hidden="true"></i>}
        { dateFloater ? floater : null }
      </button>
    </div>)
}

  render() {
    if (this.props.bullet.id === 39) console.log('rerendering', this.state)
    return this.protoRender(this.dateRender())
  }
}

export default EventBullet
