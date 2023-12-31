import React, { useEffect, useState } from 'react';
import CardComponent from './CardComponent';
import './Grid.css';
import {
  isStraightFlush,
  isQuads,
  isFullHouse,
  isFlush,
  isStraight,
  isTrips,
  isTwoPair,
  isJacksOrBetter,
} from './PokerFunctions';

const Grid = () => {
  const [grid, setGrid] = useState(Array(5).fill(Array(5).fill(-1)));
  const [inputNumber, setInputNumber] = useState('');
  const [generatedNumbers, setGeneratedNumbers] = useState([]);
  const [currentScore, setCurrentScore] = useState(0);
  const [played, setPlayed] = useState(0);
  const [isGameOver, setGameOver] = useState(false);
  // const [seed, setSeed] = useState(13);
  const [inputValue, setInputValue] = useState('');
  const [deck, setDeck] = useState(Array.from({ length: 52 }, (_, index) => index + 1));

  //check for gameover
  useEffect(() => {
    if (isGameOver) {
      return; // emoji score later
    }
  });

  window.onload = function() {
    document.title = "Video Poker";
    shuffle();
  };

  // returns day since 1970 as an int (eastern timezone) 
  const todaysSeed = () => {
    const now = new Date(); // gets the current date and time
    const utcMilliseconds = now.getTime(); // gets the UTC time in milliseconds
    const utcSeconds = Math.floor(utcMilliseconds / 1000); // converts milliseconds to seconds
  
    // Adjust for Eastern Time Zone (UTC -5 hours)
    const easternOffsetSeconds = 5 * 60 * 60;
    const easternSeconds = utcSeconds - easternOffsetSeconds;
  
    // Calculate days since 1970 (in seconds) and convert to days
    const secondsInDay = 24 * 60 * 60;
    const daysSince1970 = Math.floor(easternSeconds / secondsInDay);
  
    return daysSince1970;
  };

  const seed = todaysSeed();

  

  // const generateRandomNumber = (seed) => {
  //   const rng = seedrandom(seed);
  //   let randomNum;
  //   const used = []; 
  //   do {
  //     randomNum = Math.floor(rng() * 51) + 1; 
  //   } while (used.includes(randomNum));
  
  //   const updatedNumbers = [...generatedNumbers, randomNum];
  //   setGeneratedNumbers(updatedNumbers.sort());
  //   setInputNumber(randomNum);
  //   setUsed((prevUsed) => [...prevUsed, randomNum]);
  // };

  const generateRandomNumber = () => {
    setInputNumber(deck.pop());
  }
  
  const shuffleDeck = (seesd) => {
    let s = seed;
    const shuffledDeck = [...deck];
    let currentIndex = shuffledDeck.length;
  
    // Use the provided seed for random number generation
    const generateRandomIndex = () => {
      const x = Math.sin(s++) * 10000;
      return Math.floor((x - Math.floor(x)) * currentIndex);
    };
  
    while (currentIndex !== 0) {
      const randomIndex = generateRandomIndex();
      currentIndex--;
  
      const temporaryValue = shuffledDeck[currentIndex];
      shuffledDeck[currentIndex] = shuffledDeck[randomIndex];
      shuffledDeck[randomIndex] = temporaryValue;
    }
    setDeck(shuffledDeck);
  };
  

  
  function shuffle() {
    shuffleDeck();
  }




  function checkResult(numbers) {
    const checkFunctions = [
      { func: isStraightFlush, message: 'Straight Flush', reward: 100 },
      { func: isQuads, message: 'Quads', reward: 50 },
      { func: isFullHouse, message: 'Full House', reward: 35 },
      { func: isFlush, message: 'Flush', reward: 30 },
      { func: isStraight, message: 'Straight', reward: 20 },
      { func: isTrips, message: 'Trips', reward: 15 },
      { func: isTwoPair, message: 'Two Pair', reward: 10 },
      { func: isJacksOrBetter, message: 'Jacks or Better', reward: 5 },
    ];
  
    let currentReward = 0;
  
    if (numbers.includes(-1)) {
      return 0;
    }
  
    for (const checkFunction of checkFunctions) {
      if (checkFunction.func(numbers)) {
        const result = { type: checkFunction.message, reward: checkFunction.reward };
        setCurrentScore(checkFunction.reward);
        return checkFunction.reward;
      }
    }
  
    return 0;
  }
  


const checkRowsColumns = () => {
  let result = 0;
  const rowArrays = grid.slice(); // Assuming grid is defined elsewhere
  const columnArrays = [];

  // Create column arrays
  for (let i = 0; i < grid.length; i++) {
    const columnArray = [];
    for (let j = 0; j < grid[i].length; j++) {
      columnArray.push(grid[j][i]); // Push elements from each column to columnArray
    }
    columnArrays.push(columnArray); // Push each columnArray to columnArrays
  }

  // Process rows
  for (let r = 0; r < rowArrays.length; r++) {
    rowArrays[r].sort((a, b) => a - b); // Sorting each row array
    result += checkResult(rowArrays[r]);
  }

  // Process columns
  for (let c = 0; c < columnArrays.length; c++) {
    columnArrays[c].sort((a, b) => a - b); // Sorting each column array
    result += checkResult(columnArrays[c]);
  }

  setCurrentScore(result);
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
  
    setPlayed(played => played + 1);

    // Update the grid with the input number
    const newGrid = grid.map((rowArray, rowIndex) =>
      rowArray.map((cell, colIndex) =>
        rowIndex === row && colIndex === col ? number : cell
      )
    );
    setGrid(newGrid);
    setInputNumber(''); // Clear the input after setting the number
  
    checkRowsColumns();
    // Reset generatedNumbers to enable the button
    if (played >= 24) {
      setGameOver(true);
      return;
    }
    generateRandomNumber(seed);

  };
  

const refreshPage = () => {
  window.location.reload();
};


const handleSeedInputChange = (event) => {
  setInputValue(event.target.value);
};



return (
  <div>
    <div className='drawn'>
      <CardComponent number={inputNumber} />
    </div>

    <button onClick={generateRandomNumber} disabled={generatedNumbers.length > 0}>
      Start Game
    </button>

    <button onClick={refreshPage}>Refresh Page</button>

  


    <div>
      Current Score: {currentScore}
    </div>

    <div>
        Game Over: {isGameOver ? 'Yes' : 'No'} 
    </div>

    {grid.map((rowArray, rowIndex) => (
      <div key={rowIndex}>
        {rowArray.map((cell, colIndex) => (
          <div
            key={colIndex}
            onClick={() => handleClick(rowIndex, colIndex)}
            className="cell" 
          >
            {cell !== undefined ? (
              <CardComponent number={cell} />
            ) : null}
          </div>
        ))}
      </div>
    ))}

  </div>



);

};


export default Grid;