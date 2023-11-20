import React, { useState } from 'react';
import './Grid.css';

const Grid = () => {
  const [grid, setGrid] = useState(Array(5).fill(Array(5).fill(-1)));
  const [inputNumber, setInputNumber] = useState('');
  const [rowSums, setRowSums] = useState(Array(5).fill(0));
  const [colSums, setColSums] = useState(Array(5).fill(0));
  const [generatedNumbers, setGeneratedNumbers] = useState([]); // State for storing generated numbers

  const generateRandomNumber = () => {
    let randomNum;
    do {
      randomNum = Math.floor(Math.random() * 52);
    } while (generatedNumbers.includes(randomNum)); // Generate until a unique number is found
  
    const updatedNumbers = [...generatedNumbers, randomNum]; // Add the unique number to the array
    setGeneratedNumbers(updatedNumbers.sort()); // Update the array of generated numbers
    setInputNumber(randomNum); // Set the unique number as inputNumber
  
    console.log(updatedNumbers); // Print the updated array in the console
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
  

  const handleClick = (row, col) => {
    // Check if the input is a valid number
    const number = parseInt(inputNumber, 10);
    if (isNaN(number)) {
      alert('Please enter a valid number.');
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
  };

  return (
    <div>
      <input
        placeholder="Enter a number"
        value={mapNumberToCard(inputNumber)}
        onChange={(e) => setInputNumber(e.target.value)}
      />
      <button onClick={generateRandomNumber}>
        Generate Unique Random Number
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
