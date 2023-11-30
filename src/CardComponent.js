import React from 'react';

function CardComponent({ number }) {
  function mapNumberToCard(number) {
    if (number <= 0) {
      return 'back.png';
    }

    const suits = ['hearts', 'diamonts', 'clubs', 'spades'];
    const ranks = ['2', '3', '4', '5', '6', '7', '8', '9', 'T', 'J', 'Q', 'K', 'A'];

    const suitIndex = Math.floor((number - 1) / 13);
    const rankIndex = (number - 1) % 13;

    const cardName = suits[suitIndex] + ranks[rankIndex] + '.png';
    return cardName;
  }

  const cardName = mapNumberToCard(number);

  return (
    <div>
      {cardName !== '' && (
        <img
          src={process.env.PUBLIC_URL + '/Cards/' + cardName}
          alt={`Card ${number}`}
          style={{ width: '83px', height: '116px' }} // Adjust width and height as needed
        />
      )}
    </div>
  );
}

export default CardComponent;
