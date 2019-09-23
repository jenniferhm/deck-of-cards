import React from "react";
import Card from "./Card";
import axios from "axios";

const BASE_URL = "https://deckofcardsapi.com/api/deck"
const cardCount = 1;

class Board extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      deck: {},
      cards: []
    }
    this.addCard = this.addCard.bind(this);
  }

  async componentDidMount() {
    let response = await axios.get(`${BASE_URL}/new/shuffle/?deck_count=1`);

    let newDeck = response.data;
    this.setState({
      deck: newDeck
    });
  }

  async addCard(evt) {
    let deckId = this.state.deck.deck_id;
    let newCard = await axios.get(`${BASE_URL}/${deckId}/draw/?count=${cardCount}`)
    this.setState(st => ({
      deck: { ...st.deck, remaining: st.deck.remaining - 1 },
      cards: [...st.cards, {...newCard.data.cards[0]}]
    }))
  }

  render() {
    return (
      <div>
        <button onClick={this.addCard}>GIMME A CARD!</button>
        {this.state.cards.map(c =>
          <Card key={c.code} card={c.image} />
        )}
      </div>
    )
  }
}


export default Board;