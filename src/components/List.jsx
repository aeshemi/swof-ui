import React, { Component } from 'react';
import { Button, Col, Glyphicon, Grid, Row } from 'react-bootstrap';
import moment from 'moment';
import ListRow from './ListRow';
import ApiClient from '../ApiClient';

class List extends Component {
  constructor() {
    super();
    this.state = { currentDate: moment(), schedule: [] };
    this.getSchedule = this.getSchedule.bind(this);
    this.updateSchedule = this.updateSchedule.bind(this);
  }

  componentDidMount() {
    this.getSchedule(this.state.currentDate);
  }

  getSchedule(date) {
    ApiClient.getList(date.format('YYYY-MM-DD')).then(data => {
      const schedule = Object.values(
        data.reduce((s, d) => {
          /* eslint-disable no-param-reassign */
          const startDate = moment(d.date);

          s[d.date] = s[d.date] || {
            day: startDate.date(),
            dayOfWeek: startDate.format('ddd'),
            engineer: {}
          };

          s[d.date].engineer[d.shift] = d.name;

          return s;
          /* eslint-enable no-param-reassign */
        }, {})
      );

      this.setState({ schedule });
    });
  }

  updateSchedule(isForward) {
    const { currentDate } = this.state;
    const startDate = isForward ? currentDate.add(1, 'month') : currentDate.subtract(1, 'month');
    this.getSchedule(startDate.startOf('month'));
  }

  render() {
    const { currentDate, schedule } = this.state;

    const noRotations = <div className="no-rotations">No rotations to display.</div>;

    return (
      <div className="schedule-list">
        <Grid>
          <Row>
            <Col md={3}>
              <Button onClick={() => this.updateSchedule(false)}>
                <Glyphicon glyph="chevron-left" />
              </Button>
            </Col>
            <Col md={6} className="list-month">
              {currentDate.format('MMMM YYYY')}
            </Col>
            <Col md={3}>
              <Button className="pull-right" onClick={() => this.updateSchedule(true)}>
                <Glyphicon glyph="chevron-right" />
              </Button>
            </Col>
          </Row>
        </Grid>
        {schedule.length === 0 ? noRotations : schedule.map(s => <ListRow key={s.day} {...s} />)}
      </div>
    );
  }
}

export default List;
