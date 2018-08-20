import React, { Component } from 'react';
import BigCalendar from 'react-big-calendar';
import moment from 'moment';
import dates from 'react-big-calendar/lib/utils/dates';
import ApiClient from '../ApiClient';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import './Calendar.css';

BigCalendar.setLocalizer(BigCalendar.momentLocalizer(moment));

const setVisibleDates = date => ({
  firstVisible: moment(dates.firstVisibleDay(date)),
  lastVisible: moment(dates.lastVisibleDay(date))
});

class Calendar extends Component {
  constructor(props) {
    super(props);
    this.state = { ...setVisibleDates(moment()), schedule: [] };
    this.getSchedule = this.getSchedule.bind(this);
    this.setCalendarDates = this.setCalendarDates.bind(this);
  }

  componentDidMount() {
    this.getSchedule();
  }

  getSchedule() {
    ApiClient.getCalendar(this.state.firstVisible.format('YYYY-MM-DD')).then(data => {
      const schedule = data.map(s => ({
        ...s,
        startDateTime: new Date(s.startDateTime),
        endDateTime: new Date(s.endDateTime)
      }));

      this.setState({ schedule });
    });
  }

  setCalendarDates(date) {
    if (date === undefined) return;

    const { firstVisible, lastVisible } = this.state;

    const newDates = setVisibleDates(date);

    if (
      firstVisible.isSame(newDates.firstVisible, 'day') ||
      lastVisible.isSame(newDates.lastVisible, 'day')
    )
      return;

    this.setState({ ...newDates }, this.getSchedule);
  }

  render() {
    return (
      <BigCalendar
        defaultView="month"
        events={this.state.schedule}
        startAccessor="startDateTime"
        endAccessor="endDateTime"
        titleAccessor="name"
        style={{ height: '100vh' }}
        views={['month', 'week']}
        eventPropGetter={event => ({ className: `rotation ${event.shift.toLowerCase()}` })}
        onNavigate={this.setCalendarDates}
      />
    );
  }
}

export default Calendar;
