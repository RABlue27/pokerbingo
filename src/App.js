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
      randomNum = Math.floor(Math.random() * 52);
    } while (used.includes(randomNum));
  
    const updatedNumbers = [...generatedNumbers, randomNum];
    setGeneratedNumbers(updatedNumbers.sort());
    setInputNumber(randomNum);
    setUsed(prevUsed => [...prevUsed, randomNum]); // Append randomNum to the used array
  
    console.log(updatedNumbers);
    checkRowsColumns();
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

  const checkRowsColumns = () => {
    // Check every row
    grid.forEach((row, rowIndex) => {
      const isRowFull = row.every(cell => cell !== -1);
      if (isRowFull) {
        console.log(`Row ${rowIndex + 1} is full`);
      }
    });
  
    // Check every column
    for (let colIndex = 0; colIndex < grid[0].length; colIndex++) {
      let isColFull = true;
      for (let rowIndex = 0; rowIndex < grid.length; rowIndex++) {
        if (grid[rowIndex][colIndex] === -1) {
          isColFull = false;
          break;
        }
      }
      if (isColFull) {
        console.log(`Column ${colIndex + 1} is full`);
      }
    }
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

  };
  
  const clearGrid = () => {
    setGrid(Array(5).fill(Array(5).fill(-1))); // Reset the grid to its initial state
    setInputNumber(''); // Clear the input field
    setRowSums(Array(5).fill(0)); // Reset row sums
    setColSums(Array(5).fill(0)); // Reset column sums
    setGeneratedNumbers([]); // Clear generated numbers array
  };

  return (
    <div>
      <input
        placeholder="Enter a number"
        value={mapNumberToCard(inputNumber)}
        onChange={(e) => setInputNumber(e.target.value)}
      />
<button onClick={generateRandomNumber} disabled={generatedNumbers.length > 0}>
  Generate Unique Random Number
</button>

      <button onClick={clearGrid}>
        Clear Grid
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
