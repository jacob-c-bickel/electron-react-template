import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';

const App = () => (
  <div className="test">
    <p>
      Hello from react!
    </p>
  </div>
);

ReactDOM.render(<App />, document.getElementById('root'));
