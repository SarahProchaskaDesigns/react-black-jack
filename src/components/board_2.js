// IMPORT DEPENDENCIES
import React, { Component } from 'react';
import _ from 'underscore'

// IMPORT COMPONENTS
import Hand from './hand';


// CREATE COMPONENTS
class Board extends Component {
    constructor(props) {
        super(props)
        this.state = {
            players: ['player', 'dealer'],
            stateOfGame: 'Player turn - Hit or Stay',
            deck: null,
            turn: true,
            hands: {
                player: [],
                dealer: [""]
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
    }

    componentWillMount() {
        console.log(" Component WILL mount ran - this worked!")
        this.startingShuffle();
    }

    componentDidMount(){
        console.log(" Component DID mount ran - this worked!")
        this.startingDeal()
    }
    componentDidUpdate(){
        console.log(" Component  WILL UPDATE ran - this worked!")
        console.log(this.state.hands.dealer.length)
        console.log(this.state.turn)
        if(this.state.turn === false && this.state.hands.dealer.length < 5){
            this.deal('dealer')
            console.log('I am running')
        }
        console.log(this.state.hands.dealer)
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

    startingDeal(){
        var playersCards = this.state.hands.player.slice();
        var dealersCards = this.state.hands.dealer.slice();
        var deck = this.state.deck.slice();
        playersCards.push(deck.pop());
        playersCards.push(deck.pop());
        dealersCards.push(deck.pop())
        // this.getCount('player');
        // this.getCount('dealer')
        this.setState({
            deck: deck,
            hands: {
                player: playersCards,
                dealer: dealersCards
            }
        })
    }
  
    deal(currentPlayer){
        // this.getCount(currentPlayer)
        var deck = this.state.deck.slice();
       
        var currentHands = _.extend({}, this.state.hands);
        var currentHand = currentHands[currentPlayer].slice();
        var totalAces = _.extend({}, this.state.aces);
        var currentAces = totalAces[currentPlayer];
        var currentCard = deck.pop();
        if(currentCard === "A"){
            currentAces += 1
            totalAces[currentPlayer] = currentAces;
            this.setState({
                deck: deck,
                aces: totalAces
            })
        }
            currentHand.push(currentCard);
            currentHands[currentPlayer] = currentHand
            this.setState({
                deck: deck,
                hands: currentHands
            })
            console.log(this.state.aces)
        
    }

    dealerDeal(){
        this.deal('dealer')
    }

    playerDeal(){
        if(this.state.turn){
            this.deal('player')
        }
    }

    stayButton(){
        // this.deal()
        // this.dealerDeal();
        this.setState({
            turn: false,
        })
    }
    getCount(currentPlayer){
        var totalCount = _.extend({}, this.state.totalCount);
        var currentPlayerHand = this.state.hands[currentPlayer].map((digit) => {
            if(digit === 'J' || digit === 'Q' || digit === 'K'){
                return 10
            }
            if(digit === NaN){
                return 0
            }
            else return digit
        })
        var currentNumberAces = this.state.aces[currentPlayer]
        var currentTotal = currentPlayerHand.reduce((a, b) => {return a + b})
        while(currentNumberAces > 0){
            if(currentTotal <= 10 && this.state.aces[currentPlayer] === 1){
                currentTotal += 11
            }
            currentTotal += 1;
            currentNumberAces -= 1;
        }
        totalCount[currentPlayer] = currentTotal
        this.setState({
            totalCount: totalCount
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
        // console.log(this.state.deck)
        // console.log(this.state.turn)
        return (
            <div>
                {/* <Hand className="dealers-hand"
                    shuffledDeck={this.state.deck}
                    turn={this.state.turn}
                    dealerCards = {this.state.hands.dealer}
                    dealerCount = {this.state.totalCount.dealer}
                    dealerAces = {this.state.aces.dealer}
                    busted = {this.state.busted}
                    //PASSED FUNCTIONS 
                    gameOver={(number) => { this.gameOver(number) }}
                /> */}
                <div className="single-hand">
                <h2>Dealer</h2>
                <Hand className="dealer-hand"
                    whosHand = {this.state.players[1]}
                    shuffledDeck={this.state.deck}
                    turn={this.state.turn}
                    cards = {this.state.hands}
                    count = {this.state.totalCount}
                    aces = {this.state.aces.player}
                    busted = {this.state.busted}
                    //PASSED FUNCTIONS 
                    gameOver={(number) => { this.gameOver(number) }}
                />
                </div>
                <h3>{this.state.stateOfGame}</h3>
                <h5> Dealer Total: {this.state.totalCount.dealer}</h5>
                <h5> Player Total: {this.state.totalCount.player}</h5>
                <div className="single-hand">
                
                <Hand className="players-hand"
                    whosHand = {this.state.players[0]}
                    shuffledDeck={this.state.deck}
                    turn={this.state.turn}
                    cards = {this.state.hands}
                    count = {this.state.totalCount}
                    aces = {this.state.aces.player}
                    busted = {this.state.busted}
                    //PASSED FUNCTIONS 
                    gameOver={(number) => { this.gameOver(number) }}
                />
                <button onClick={()=>{this.playerDeal()}}>Hit</button>
                <button onClick={()=>{this.stayButton()}}>Stay</button>
                <h2>Player</h2>
                </div>
            </div>
        )
    }
}


// RENDER OR EXPORT COMPONENTS
export default Board; 