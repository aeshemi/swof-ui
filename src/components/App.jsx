import React from 'react';
import Header from './Header';

const App = props => (
  <div>
    <Header />
    <div className="container">
      <div className="app">{props.children}</div>
    </div>
  </div>
);

export default App;
