// IMPORT DEPENDENCIES
import React from 'react';


// CREATE COMPONENTS 
const Square = (props) => {
    // console.log(status)
    // console.log(props.makeMove)
    if(props.status === "X"){
        return(
            <div className="square pink" onClick = {() => {props.makeMove(props.boardNumber)}}>{props.status}</div>
        )
    }else{
        return(
            <div className="square blue" onClick = {() => {props.makeMove(props.boardNumber)}}>{props.status}</div>
        )
    }
    
} 

// EXPORT COMPONENT
export default Square;