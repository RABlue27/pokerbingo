function mapNumberToCard(number) {
    if (number <= 0) {
      return " ";
    }
    const suits = ['Hearts', 'Diamonds', 'Clubs', 'Spades'];
    const ranks = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'Jack', 'Queen', 'King', 'Ace'];
      
    const suitIndex = Math.floor(number / 13);
    const rankIndex = number % 13;
      
    const card = ranks[rankIndex] + ' of ' + suits[suitIndex];
    return ranks[rankIndex] !== undefined ? card : ''; // Return an empty string if card is undefined
  }

function isStraightFlush(numbers) {
    const sortedNumbers = numbers.sort((a, b) => a - b);
  
    const isSequential = sortedNumbers.every((num, index) => {
      if (index === 0) {
        return true;
      }
      return num === sortedNumbers[index - 1] + 1;
    });
  
    const isSameSuit = sortedNumbers.every(num => num < 13);
  
    return isSequential && isSameSuit;
  }
  
  function isQuads(numbers) {
    const rankCount = {};
  
    numbers.forEach(num => {
      const card = mapNumberToCard(num);
      const rank = card.split(' ')[0];
      if (rankCount[rank]) {
        rankCount[rank]++;
      } else {
        rankCount[rank] = 1;
      }
    });
  
    const values = Object.values(rankCount);
    return values.includes(4);
  }
  
  function isFullHouse(numbers) {
    const rankCount = {};
  
    numbers.forEach(num => {
      const card = mapNumberToCard(num);
      const rank = card.split(' ')[0];
      if (rankCount[rank]) {
        rankCount[rank]++;
      } else {
        rankCount[rank] = 1;
      }
    });
  
    const values = Object.values(rankCount);
    return values.includes(3) && values.includes(2);
  }
  
  function isFlush(numbers) {
    const sortedNumbers = numbers.sort((a, b) => a - b);
  
    const isSequential = sortedNumbers.every((num, index) => {
      if (index === 0) {
        return true;
      }
      return num === sortedNumbers[index - 1] + 1;
    });
  
    const isSameSuit = sortedNumbers.every(num => num < 13);
  
    return isSameSuit;
  }
  
  function isStraight(numbers) {
    const sortedNumbers = numbers.sort((a, b) => a - b);
  
    const modNumbers = sortedNumbers.map(num => num % 13).sort();
  
    let isSequential = true;
    for (let i = 0; i < modNumbers.length - 1; i++) {
      if (modNumbers[i + 1] !== modNumbers[i] + 1) {
        isSequential = false;
        break;
      }
    }
  
    return isSequential;
  }
  
  function isTrips(numbers) {
    const rankCount = {};
  
    numbers.forEach(num => {
      const card = mapNumberToCard(num);
      const rank = card.split(' ')[0];
      if (rankCount[rank]) {
        rankCount[rank]++;
      } else {
        rankCount[rank] = 1;
      }
    });
  
    const values = Object.values(rankCount);
    return values.includes(3);
  }
  
  function isTwoPair(numbers) {
    const rankCount = {};
  
    numbers.forEach(num => {
      const card = mapNumberToCard(num);
      const rank = card.split(' ')[0];
      if (rankCount[rank]) {
        rankCount[rank]++;
      } else {
        rankCount[rank] = 1;
      }
    });
  
    const values = Object.values(rankCount);
    const countOfPairs = values.filter(value => value === 2).length;
    return countOfPairs === 2;
  }
  
  function isJacksOrBetter(numbers) {
    const sortedNumbers = numbers.sort((a, b) => a - b);
  
    const modNumbers = sortedNumbers.map(num => num % 13).sort();
  
    for (let i = 0; i < modNumbers.length - 1; i++) {
      if (modNumbers[i] === modNumbers[i + 1] && modNumbers[i] >= 10) {
        return true; // Returns true if two of the same number above 10 are found
      }
    }
    return false; // Returns false if no two of the same number above 10 are found
  }
  
  function checkResult(numbers) {
    if (numbers.includes(-1)) {
      return 0;
    }
    if (isStraightFlush(numbers)) {
      console.log('Type: Straight Flush');
      return 4000;
    }
    if (isQuads(numbers)) {
      console.log('Type: Quads');
      return 125;
    }
    if (isFullHouse(numbers)) {
      console.log('Type: Full House');
      return 35;
    }
    if (isFlush(numbers)) {
      console.log('Type: Flush');
      return 30;
    }
    if (isStraight(numbers)) {
      console.log('Type: Straight');
      return 20;
    }
    if (isTrips(numbers)) {
      console.log('Type: Trips');
      return 15;
    }
    if (isTwoPair(numbers)) {
      console.log('Type: Two Pair');
      return 10;
    }
    if (isJacksOrBetter(numbers)) {
      console.log('Type: Jacks or Better');
      return 5;
    }
    console.log('Type: None matched');
    return 0;
  }
  
  module.exports = {
    isStraightFlush,
    isQuads,
    isFullHouse,
    isFlush,
    isStraight,
    isTrips,
    isTwoPair,
    isJacksOrBetter,
    checkResult,
  };
  