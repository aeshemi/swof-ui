/* eslint-disable react/jsx-filename-extension */

import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import App from './components/App';
import Calendar from './components/Calendar';
import Generator from './components/Generator';
import List from './components/List';
import NotFound from './components/NotFound';
import 'bootstrap/dist/css/bootstrap.css';
import './index.css';

ReactDOM.render(
  <Router basename={process.env.PUBLIC_URL || ''}>
    <App>
      <Switch>
        <Route exact path="/" component={Calendar} />
        <Route path="/list" component={List} />
        <Route path="/generator" component={Generator} />
        <Route component={NotFound} />
      </Switch>
    </App>
  </Router>,
  document.getElementById('root')
);
