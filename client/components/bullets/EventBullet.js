import React from 'react'
import moment from 'moment'
import Datetime from 'react-datetime'

import BaseBullet from './BaseBullet'
import datetime from '../../styles/datetime.scss'

class EventBullet extends BaseBullet {

  constructor(props) {
    super(props)
    this.state.dateFloater = false

    this.dateOnChange = this.dateOnChange.bind(this)
    this.dateOnBlur = this.dateOnBlur.bind(this)
    this.dateOnClick = this.dateOnClick.bind(this)
  }

  symbol() {
    return <i className='fa fa-circle-o symbol' aria-hidden="true"></i>
  }

  toggleDateFloater(forcedVal) {
    this.setState(({dateFloater}) => (
      {dateFloater: forcedVal !== undefined ? forcedVal : !dateFloater}))
  }

  dateOnChange() {
    this.setState(
      () => ({due_date: e.toISOString()}),
      () => this.updateBullet()
        .then(() => this.setState({dateFloater: false})))
  }

  dateOnBlur() {
    this.setState({dateFloater: false, blurring: true})
  }

  dateOnClick() {
    debugger
    this.state.blurring ?
      this.setState({blurring: false}) :
      this.setState({blurring: false, dateFloater: true})
  }

  dateRender() {
    const {dateFloater, due_date} = this.state

    const dateButton = due_date ?
      moment(due_date).format('MM/DD/YY') :
      <i className="fa fa-calendar-plus-o" aria-hidden="true"></i>

    const floater = dateFloater ? (
      <Datetime
        className='datetime'
        inputProps={{autoFocus: true}}
        defaultValue={moment()}
        value={moment(due_date)}
        dateFormat='MM/DD/YY'
        timeFormat=''
        onChange={this.dateOnChange}
        onBlur={this.dateOnBlur}/>) :
        null

    return (
      <button className='bullet-date' onClick={this.dateOnClick}>
        { dateButton }
        { floater }
      </button>)
}

  render() {
    return this.protoRender(this.dateRender())
  }
}

export default EventBullet
