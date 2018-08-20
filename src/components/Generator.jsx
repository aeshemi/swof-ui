import React, { Component } from 'react';
import { Button, Table } from 'react-bootstrap';
import ApiClient from '../ApiClient';

class Generator extends Component {
  constructor() {
    super();
    this.state = { result: [] };
    this.generateSchedule = this.generateSchedule.bind(this);
  }

  generateSchedule() {
    ApiClient.generateSchedule().then(data => {
      this.setState({ result: data });
    });
  }

  render() {
    const { result } = this.state;

    return (
      <div>
        <Button bsStyle="primary" bsSize="large" onClick={this.generateSchedule}>
          Generate Schedule
        </Button>
        <hr />
        {result.length > 0 && (
          <Table striped>
            <thead>
              <tr>
                <th>Date</th>
                <th>Shift</th>
                <th>Engineer Id</th>
              </tr>
            </thead>
            <tbody>
              {this.state.result.map(s => {
                const dateString = s.date.substring(0, 10);

                return (
                  <tr key={`${dateString}-${s.shift}`}>
                    <td>{dateString}</td>
                    <td>{s.shift}</td>
                    <td>{s.engineerId}</td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
        )}
      </div>
    );
  }
}

export default Generator;
