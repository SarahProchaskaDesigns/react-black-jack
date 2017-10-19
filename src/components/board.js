// IMPORT DEPENDENCIES
import React from 'react';

// IMPORT COMPONENTS
import Square from './square.js'

// CREATE COMPONENTS 
const Board = (props) => {
    var boardNumber = -1;
    var row1 = [];
    var row2 = [];
    var row3 = [];
        let gameSquares = props.boardStatus.map((square) => {
                boardNumber += 1;
                // console.log(square)
                return (
                    <Square 
                        status = {square}
                        key = {boardNumber}
                        boardNumber = {boardNumber}
                        makeMove = {props.makeMove}
                        currentTurn = {props.currentTurn}
                    />
                )
                
        });
        for(var i = 9 ; i > 0; i--){
            if(gameSquares.length >= 7){
                row3.push(gameSquares.pop())
                continue;
            }
            if(gameSquares.length >= 4){
                row2.push(gameSquares.pop())
                continue;
            }
            if(gameSquares.length >= 1){
                row1.push(gameSquares.pop())
            }
        }
        
    return(
        <div className="whole-board">
            <div className="board-row">
               {row1} 
            </div> 
            <div className="board-row">
               {row2} 
            </div> 
            <div className="board-row">
               {row3} 
            </div> 
        </div>

    )
} 

// EXPORT COMPONENT
export default Board;