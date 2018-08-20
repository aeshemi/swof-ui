import React from 'react';
import { Media, Panel, Row, Grid } from 'react-bootstrap';
import Shift from './Shift';

const ListRow = props => {
  const { day, dayOfWeek, engineer } = props;

  return (
    <Media>
      <Media.Left align="top">
        <Panel bsStyle="primary" className="date">
          <Panel.Heading className="day-of-week">{dayOfWeek}</Panel.Heading>
          <Panel.Body className="day">{day}</Panel.Body>
        </Panel>
      </Media.Left>
      <Media.Body>
        <Grid>
          <Row>
            {Object.keys(engineer).map(key => (
              <Shift key={key} shift={key} name={engineer[key]} />
            ))}
          </Row>
        </Grid>
      </Media.Body>
    </Media>
  );
};

export default ListRow;
