import React, { useState } from 'react';
import './Grid.css';

const Grid = () => {
  const [grid, setGrid] = useState(Array(5).fill(Array(5).fill(-1)));
  const [inputNumber, setInputNumber] = useState('');
  const [rowSums, setRowSums] = useState(Array(5).fill(0));
  const [colSums, setColSums] = useState(Array(5).fill(0));
  const [generatedNumbers, setGeneratedNumbers] = useState([]);
  const [used, setUsed] = useState([]);

  const generateRandomNumber = () => {
    let randomNum;
    do {
      randomNum = Math.floor(Math.random() * 51) + 1; // Generates random number between 1 and 52
    } while (used.includes(randomNum));
  
    const updatedNumbers = [...generatedNumbers, randomNum];
    setGeneratedNumbers(updatedNumbers.sort());
    setInputNumber(randomNum);
    setUsed(prevUsed => [...prevUsed, randomNum]); // Append randomNum to the used array
    console.log(randomNum)
    // console.log(updatedNumbers);
  };
  

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


const checkRowsColumns = () => {
  let result = 0;
  const rowArrays = grid.slice(); // Assuming grid is defined elsewhere
  const columnArrays = [];

  for (let i = 0; i < grid.length; i++) {
    const columnArray = [];
    for (let j = 0; j < grid[i].length; j++) {
      columnArray.push(grid[j][i]); // Push elements from each column to columnArray
    }
    columnArrays.push(columnArray); // Push each columnArray to columnArrays
  }

  for (let r = 0; r < rowArrays.length; r++) {
    result += checkResult(rowArrays[r]);
  }

  for (let c = 0; c < columnArrays.length; c++) {
    result += checkResult(columnArrays[c]);
  }

  alert("You scored: " + result);

  console.log("Score: ", result);

};


  const handleClick = (row, col) => {
    // Check if the input is a valid number
    const number = parseInt(inputNumber, 10);
    if (isNaN(number)) {
      alert('Please enter a valid number.');
      return;
    }
  
    // Check if the cell already has a value (different from -1)
    if (grid[row][col] !== -1) {
      alert('This cell already contains a value.');
      return;
    }
  
    // Update the grid with the input number
    const newGrid = grid.map((rowArray, rowIndex) =>
      rowArray.map((cell, colIndex) =>
        rowIndex === row && colIndex === col ? number : cell
      )
    );
    setGrid(newGrid);
    setInputNumber(''); // Clear the input after setting the number
  
    // Update row and column sums
    const newRowSums = newGrid.map((rowArray) =>
      rowArray.reduce((sum, cell) => sum + (cell || 0), 0)
    );
    setRowSums(newRowSums);
  
    const newColSums = newGrid[0].map((_, colIndex) =>
      newGrid.reduce((sum, rowArray) => sum + (rowArray[colIndex] || 0), 0)
    );
    setColSums(newColSums);
  
    // Reset generatedNumbers to enable the button
    setGeneratedNumbers([]);
    generateRandomNumber();

  };
  
  const clearGrid = () => {
    setGrid(Array(5).fill(Array(5).fill(-1))); // Reset the grid to its initial state
    setInputNumber(''); // Clear the input field
    setRowSums(Array(5).fill(0)); // Reset row sums
    setColSums(Array(5).fill(0)); // Reset column sums
    setGeneratedNumbers([]); // Clear generated numbers array
  };



// test functions 

// Test function for checking a royal flush
function testStraightFlush() {
  const royalFlush = [8, 9, 10, 11, 12]; // Assuming these card numbers represent a royal flush
  const notRoyalFlush = [10, 1, 2, 3, 4]; // Not a royal flush

  console.log('Royal Flush Cards:', royalFlush.map(cardNum => mapNumberToCard(cardNum)).join(', '));
  console.log('Is it a Royal Flush?', isStraightFlush(royalFlush)); // Expected output: true
  
  console.log('Not Royal Flush Cards:', notRoyalFlush.map(cardNum => mapNumberToCard(cardNum)).join(', '));
  console.log('Is it a Royal Flush?', isStraightFlush(notRoyalFlush)); // Expected output: false
}

// Test function for checking quads
function testQuads() {
  const quads = [1, 14, 27, 39, 40]; // Assuming these card numbers represent four of a kind
  const notQuads = [5, 1, 2, 3, 4]; // Not four of a kind

  console.log('Quads Cards:', quads.map(cardNum => mapNumberToCard(cardNum)).join(', '));
  console.log('Is it Quads?', isQuads(quads)); // Expected output: true
  
  console.log('Not Quads Cards:', notQuads.map(cardNum => mapNumberToCard(cardNum)).join(', '));
  console.log('Is it Quads?', isQuads(notQuads)); // Expected output: false
}

// Test function for checking a full house
function testFullHouse() {
  const fullHouse = [1, 14, 27, 2, 15]; // Assuming these card numbers represent a full house
  const notFullHouse = [5, 1, 2, 3, 4]; // Not a full house

  console.log('Full House Cards:', fullHouse.map(cardNum => mapNumberToCard(cardNum)).join(', '));
  console.log('Is it a Full House?', isFullHouse(fullHouse)); // Expected output: true
  
  console.log('Not Full House Cards:', notFullHouse.map(cardNum => mapNumberToCard(cardNum)).join(', '));
  console.log('Is it a Full House?', isFullHouse(notFullHouse)); // Expected output: false
}

function testFlush() {
  const flush = [8, 9, 10, 11, 3]; // Assuming these card numbers represent a royal flush
  const notflush = [21, 1, 2, 3, 4]; // Not a royal flush

  console.log('Flush Cards:', flush.map(cardNum => mapNumberToCard(cardNum)).join(', '));
  console.log('Is it a  Flush?', isFlush(flush)); // Expected output: true
  
  console.log('Not Flush Cards:', notflush.map(cardNum => mapNumberToCard(cardNum)).join(', '));
  console.log('Is it a  Flush?', isFlush(notflush)); // Expected output: false
}

function testStraight() {
  const straight = [3, 4, 5, 6, 28].sort(); // Assuming these card numbers represent a royal flush
  const notStraight = [10, 1, 2, 3, 4]; // Not a royal flush

  console.log('Straight Cards:', straight.map(cardNum => mapNumberToCard(cardNum)).join(', '));
  console.log('Is it  Straight?', isStraight(straight)); // Expected output: true
  
  console.log('Not Straight Cards:', notStraight.map(cardNum => mapNumberToCard(cardNum)).join(', '));
  console.log('Is it a Not Straight?', isStraight(notStraight)); // Expected output: false
}

function testTrips() {
  const notTrips = [2, 14, 27, 39, 40]; // Assuming these card numbers represent four of a kind
  const notQuads = [5, 1, 2, 3, 4]; // Not four of a kind

  console.log('Trips Cards:', notTrips.map(cardNum => mapNumberToCard(cardNum)).join(', '));
  console.log('Is it Trips?', isTrips(notTrips)); // Expected output: true
  
  console.log('Not Truips Cards:', notQuads.map(cardNum => mapNumberToCard(cardNum)).join(', '));
  console.log('Is it Trips?', isTrips(notQuads)); // Expected output: false
}


function testTwoPair() {
  const twoPair = [1, 14, 3, 16, 5]; // Assuming these card numbers represent four of a kind
  const notTwoPair = [5, 1, 2, 3, 4]; // Not four of a kind

  console.log('Two pair Cards:', twoPair.map(cardNum => mapNumberToCard(cardNum)).join(', '));
  console.log('Is it two pair?', isTwoPair(twoPair)); // Expected output: true
  
  console.log('Not two pair Cards:', notTwoPair.map(cardNum => mapNumberToCard(cardNum)).join(', '));
  console.log('Is it two pair?', isTwoPair(notTwoPair)); // Expected output: false
}

function testJacks() {
  const jacks = [1, 2, 3, 11, 24]; // Assuming these card numbers represent four of a kind
  const notJacks = [5, 18, 2, 3, 4]; // Not four of a kind

  console.log('Jacks Cards:', jacks.map(cardNum => mapNumberToCard(cardNum)).join(', '));
  console.log('Is it Jacks?', isJacksOrBetter(jacks)); // Expected output: true
  
  console.log('Not Jacks Cards:', notJacks.map(cardNum => mapNumberToCard(cardNum)).join(', '));
  console.log('Is it Jacks?', isJacksOrBetter(notJacks)); // Expected output: false
}

const refreshPage = () => {
  window.location.reload();
};

//test ends
// testStraightFlush();
// testQuads();
// testFullHouse();
// testFlush();
// testStraight();
// testTrips();
// testTwoPair();
// testJacks();

  return (
    <div>
      <input
        placeholder="Enter a number"
        value={mapNumberToCard(inputNumber)}
        onChange={(e) => setInputNumber(e.target.value)}
      />
<button onClick={generateRandomNumber} disabled={generatedNumbers.length > 0}>
  Start Game
</button>

<button onClick={refreshPage}>Refresh Page</button>

      <button onClick={checkRowsColumns}>
          Start a new game
      </button>

      {grid.map((rowArray, rowIndex) => (
        <div key={rowIndex}>
          {rowArray.map((cell, colIndex) => (
            <div
              key={colIndex}
              onClick={() => handleClick(rowIndex, colIndex)}
              className="cell" // Add the cell class for hover effect
            >
              {mapNumberToCard(cell) !== undefined ? mapNumberToCard(cell) : null}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};


export default Grid;