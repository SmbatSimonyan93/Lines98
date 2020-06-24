import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Board from './board.js';

class MyGame extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return <Board boardSize={9} />
  }
}

ReactDOM.render(
  <MyGame/>,
  document.getElementById('root')
);