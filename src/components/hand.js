// IMPORT DEPENDENCIES
import React, { Component } from 'react';

// IMPORT COMPONENTS
import Card from './card'


// CREATE COMPONENTS
// BELOW IS HAND IF IT IS WRITTEN AS A CLASS VS FUNCTIONAL COMPONENT
// class Hand extends Component{
//     constructor(props){
//         super(props)
//         this.state = {
//             hands: [],
//             aces: [],
//             totalCount: []
//         }
//     }
//     render(){
//         return(
//             <Card />
//         )
//     }
// }


// HAND AS A FUNCTIONAL COMPONENT
const Hand = (props) => {
    var name = props.whosHand;
    var i = 0;
    // console.log("I am the " + props.whosHand)
    // console.log("I am the " + name)
    // console.log(props.cards)
    const allCards = props.cards[name].map((cardValue) => {
            // console.log(arrayCards)
            // console.log(cardValue)
            i += 1
            return(
                <Card
                hand={cardValue}
                key = {i}
                />
            )
        })
    return (
        <div className="hand">
            {allCards}
        </div>
    )
}

 // <Card hand={props.cards[name][1]} />
// RENDER OR EXPORT COMPONENTS
export default Hand; 