import React, { useState } from 'react';
import './Grid.css';

const Grid = () => {
  const [grid, setGrid] = useState(Array(5).fill(Array(5).fill(null)));
  const [inputNumber, setInputNumber] = useState('');
  const [rowSums, setRowSums] = useState(Array(5).fill(0));
  const [colSums, setColSums] = useState(Array(5).fill(0));

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
        type="number"
        placeholder="Enter a number"
        value={inputNumber}
        onChange={(e) => setInputNumber(e.target.value)}
      />
      {grid.map((rowArray, rowIndex) => (
        <div key={rowIndex}>
          {rowArray.map((cell, colIndex) => (
            <div
              key={colIndex}
              onClick={() => handleClick(rowIndex, colIndex)}
              style={{
                border: '1px solid black',
                width: '30px',
                height: '30px',
                display: 'inline-block',
                textAlign: 'center',
                cursor: 'pointer',
                marginRight: '45px'
              }}
            >
              {cell}
            </div>
          ))}
          <span style={{ marginLeft: '10px' }}>Row Sum: {rowSums[rowIndex]}</span>
        </div>
      ))}
      <div>
        {colSums.map((sum, colIndex) => (
          <span key={colIndex} style={{ marginRight: '10px' }}>
            C Sum: {sum}
          </span>
        ))}
      </div>
    </div>
  );
};

export default Grid;
