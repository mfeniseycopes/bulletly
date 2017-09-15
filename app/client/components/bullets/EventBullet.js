import React from 'react'
import moment from 'moment'
import Datetime from 'react-datetime'

import BaseBullet from 'Components/bullets/BaseBullet'
import datetime from 'Styles/datetime.scss'

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

  dateOnChange(e) {
    this.setState(
      () => ({due_date: e.toISOString()}),
      () => this.updateBullet()
        .then(() => this.setState({dateFloater: false})))
  }

  // Datetime automatically closes on blur, so I need to keep track internally
  // also
  dateOnBlur() {
    this.setState({dateFloater: false, blurring: true})
  }

  dateOnClick() {
    this.state.blurring ?
      this.setState({blurring: false}) :
      this.setState({blurring: false, dateFloater: true})
  }

  dateRender() {
    const {dateFloater, due_date} = this.state

    const dateButton = due_date ?
      moment(due_date).format('MM/DD') :
      <i className="fa fa-calendar-plus-o" aria-hidden="true"></i>

    // if not autoFocused that datepicker will not appear
    // (this focus is actually on the hidden date input)
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
