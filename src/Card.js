import React from "react";

class Card extends React.Component {
  render() {
    return (
      <div>
       <img src={this.props.card} alt="another card"/>
      </div>
    )
  }
}


export default Card;