// IMPORT DEPENDENCIES
import React, { Component } from 'react';

// IMPORT COMPONENTS
import Board from './board.js'

// CREATE COMPONENTS
class App extends Component {
  constructor(props){
    super(props)
    this.state = {
      turn: 'X',
      boardStatus: ['', '', '', '', '', '', '', '', ''],
    }
  }
  makeMove(square){
    var currentBoard = this.state.boardStatus.slice();
    // console.log(currentBoard);
    if(!this.state.boardStatus[square]){
      if(this.state.turn === 'X'){
        currentBoard[square] = "X"
        this.setState({
          turn: 'O'
        })
      }else{
        currentBoard[square] = "O"
        this.setState({
          turn: 'X'
        })
      }
      this.setState({
        boardStatus: currentBoard
      })
    }
    // console.log(`you clicked me ${square}`)
    // console.log(this.state.turn)
    // console.log(this.state.boardStatus)
  }

  render() {
    return (
      <div>
        <Board 
          boardStatus = {this.state.boardStatus}
          squareKeys = {this.state.squareKeys}
          makeMove = {(square) => this.makeMove(square)}
          currentTurn = {this.state.turn}
        />
      </div>
    );
  }
}

// EXPORT COMPONENTS
export default App;