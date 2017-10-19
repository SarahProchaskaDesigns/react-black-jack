// IMPORT DEPENDENCIES
import React, { Component } from 'react';

// IMPORT COMPONENTS
import Hand from './hand';


// CREATE COMPONENTS
class Board extends Component {
    constructor(props) {
        super(props)
        this.state = {
            deck: null,
            turn: "Player",
            hands: {
                player: [],
                dealer: []
            },
            totalCount: {
                player: 0,
                dealer: 0
            },
            aces: {
                player: 0,
                dealer: 0
            },
            busted: false
        }
        // this.startingShuffle()
        //    this.startingShuffle()
    }
    componentWillMount() {
        console.log(" Component did mount ran - this worked!")
        this.startingShuffle()
    }


    deckShuffle(deckToShuffle) {
        var deck = deckToShuffle || [2, 2, 2, 2, 3, 3, 3, 3, 4, 4, 4, 4, 5, 5, 5, 5, 6, 6, 6, 6, 7, 7, 7, 7, 8, 8, 8, 8, 9, 9, 9, 9, 10, 10, 10, 10, "J", "J", "J", "J", "Q", "Q", "Q", "Q", "K", "K", "K", "K", "A", "A", "A", "A"];
        deck = deck.slice();
        // var deck = deckToShuffle.slice();
        var shuffledDeck = [];
        for (var i = 0; i < 52; i++) {
            var randomNumber = Math.random() * 10;
            if (randomNumber <= 2.4) {
                shuffledDeck.push(deck.pop())
                continue
            }
            if (randomNumber <= 5) {
                shuffledDeck.push(deck.shift())
                continue
            }
            if (randomNumber <= 7.4) {
                shuffledDeck.unshift(deck.pop())
                continue
            } else {
                shuffledDeck.unshift(deck.shift())
            }
        }
        return shuffledDeck
    }
    startingShuffle() {
        // var startingDeck = this.deckShuffle()
        // console.log(startingDeck)
        var startingDeck = this.deckShuffle(this.deckShuffle(this.deckShuffle(this.deckShuffle(this.deckShuffle(this.deckShuffle())))))
        this.setState({
            deck: startingDeck,
        })
    }
    gameOver(number) {
        if (number > 21) {
            this.setState({
                busted: true
            })
        }
    }

    render() {
        console.log(this.state.deck)
        console.log(this.state.turn)
        return (
            <div>
                <Hand className="dealers-hand"
                    shuffledDeck={this.state.deck}
                    turn={this.state.turn}
                    gameOver={(number) => { this.gameOver(number) }}
                />
                <Hand className="players-hand"
                    shuffledDeck={this.state.deck}
                    turn={this.state.turn}
                    gameOver={(number) => { this.gameOver(number) }}
                />
            </div>
        )
    }
}


// RENDER OR EXPORT COMPONENTS
export default Board; 