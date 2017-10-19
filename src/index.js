// IMPORT DEPENDENCIES
import React from 'react';
import ReactDOM from 'react-dom';
import Board from './components/board'
// IMPORT COMPONENTS


// CREATE COMPONENTS
const App = () => {
  return (
    <Board />
  )
}

// RENDER OR EXPORT COMPONENTS

ReactDOM.render(
  <App />, document.querySelector('.container')
);
