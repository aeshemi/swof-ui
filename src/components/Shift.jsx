import React from 'react';
import { Media, Col } from 'react-bootstrap';

const Shift = props => (
  <Col md={6}>
    <Media.Heading>{props.name}</Media.Heading>
    <p>
      <strong>{props.shift}</strong>
    </p>
  </Col>
);

export default Shift;
