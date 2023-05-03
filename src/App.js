import { Button, FormControl, InputLabel, MenuItem, Select, Slider, Toolbar, Typography } from '@mui/material';
import React, { useState, useRef } from 'react';
import './App.css';
import SortingVisualizer from './SortingVisualizer/SortingVisualizer'

function App() {
  const [arraySize, setArraySize] = useState(100);
  const [speed, setSpeed] = useState(1000);
  const [reset, setReset] = useState(false);
  const [selection, setSelection] = useState(0);

  const changeSize = (event, value) => {
    setArraySize(value);
  };

  const changeSelection = (event, value) => {
    setSelection(event.target.value);
  };

  const changeSpeed = (event, value) => {
    setSpeed(value);
  };

  const handleSort = () => {
    switch (selection) {
      case 0:
        sortingVisualizerRef.current.bubbleSort();
        break;

      case 1:
        sortingVisualizerRef.current.selectionSort();
        break;

      case 2:
        sortingVisualizerRef.current.bozoSort();
        break;

      default:
        break;
    }

  };

  const handleReset = () => {
    setReset(!reset);
  };

  const sortingVisualizerRef = useRef(null);

  return (
    <div className="App">

      <Toolbar sx={{ backgroundColor: '#1d2025', display: 'flex', alignItems: 'center', justifyContent: 'center' }} disableGutters>
        <Button
          onClick={handleReset}
          sx={{ height: '2rem', }}
          variant="contained">Generate new array</Button>


        <div className='sliders'>
          <Typography variant='body2' color={'white'} align="justify" sx={{ margin: '0 0 -0.5rem 0' }}>
            Array size
          </Typography>
          <Slider
            value={arraySize}
            onChange={changeSize}
            step={10}
            min={4}
            max={140}
          />
        </div>

        <FormControl>
          <InputLabel sx={{ color: 'white' }}>Algorithm</InputLabel>
          <Select
            value={selection}
            label="Algorithm"
            onChange={changeSelection}
            sx={{
              height: '2rem',
              color: 'white',
            }}
          >
            <MenuItem value={0}>Bubble Sort</MenuItem>
            <MenuItem value={1}>Selection Sort</MenuItem>
            <MenuItem value={2}>Bozo Sort</MenuItem>
          </Select>
        </FormControl>

        <div className='sliders'>
          <Typography variant='body2' color={'white'} align="justify" sx={{ margin: '0 0 -0.5rem 0' }}>
            Sorting speed
          </Typography>
          <Slider
            value={speed}
            onChange={changeSpeed}
            min={0}
            max={1000}
          />
        </div>

        <Button
          onClick={handleSort}
          sx={{ height: '2rem', }}
          variant="contained">Sort</Button>
      </Toolbar>

      <SortingVisualizer
        size={arraySize}
        reset={reset}
        speed={speed}
        ref={sortingVisualizerRef} />
    </div>
  );
}

export default App;
