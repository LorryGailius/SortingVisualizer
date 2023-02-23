import React from 'react';
import './SortingVisualizer.css';

export default class SortingVisualizer extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      array: [],
      size: props.size,
    };
  }

  componentDidMount() {
    this.resetArray();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.reset !== this.props.reset) {
      this.resetArray();
    }

    if (prevProps.size !== this.props.size) {
      this.resetArray();
    }
  }

  resetArray() {
    const array = [];
    for (let index = 0; index < this.props.size; index++) {
      array.push(randomIntFromInterval(20, 600));

    }

    const bars = document.getElementsByClassName("array-bar");
    for (let i = 0; i < bars.length; i++) {
      bars[i].classList.remove("higher-val", "lower-val", "compare-val");
    }

    this.setState({ array });
  }

  render() {
    const { array } = this.state;

    return (
      <div className="array-container">
        {array.map((value, idx) => (
          <div className="array-bar"
            key={idx}
            style={{
              height: `${value}px`,
              width: `calc(100% / ${array.length} - 2px)`,
            }}>
            {array.length <= 50 && (<span>{value}</span>)}
          </div>
        ))}
      </div>
    );
  }

  async bubbleSort() {
    const { array } = this.state;
    const n = array.length;

    for (let i = 0; i < n - 1; i++) {
      for (let j = 0; j < n - i - 1; j++) {
        const bars = document.getElementsByClassName("array-bar");
        bars[j].classList.add("compare-val");

        if (array[j] > array[j + 1]) {
          bars[j].classList.remove("compare-val", "higher-val", "lower-val");
          bars[j].classList.add("lower-val");
          bars[j + 1].classList.add("compare-val");
          const temp = array[j];
          array[j] = array[j + 1];
          array[j + 1] = temp;
          this.setState({ array: array });

        }
        else {
          bars[j].classList.remove("compare-val", "higher-val", "lower-val");
          bars[j].classList.add("higher-val");
          bars[j + 1].classList.add("compare-val");
        }
        await sleep(calcSpeedMs(this.props.speed));
        bars[j].classList.remove("compare-val", "higher-val", "lower-val");
        bars[j + 1].classList.remove("compare-val", "higher-val", "lower-val");
      }
    }
    this.checkSort();
  }

  async selectionSort() {

    const { array } = this.state;
    const n = array.length;
    let min_idx = -1;
    for (let i = 0; i < n; i++) {
      const bars = document.getElementsByClassName("array-bar");
      bars[i].classList.add("compare-val");
      let lowest = i;
      for (let j = i + 1; j < n; j++) {
        if (array[j] < array[lowest]) {
          if (min_idx !== -1) {
            bars[min_idx].classList.remove("lower-val");
          }
          lowest = j;
          bars[j].classList.add("lower-val");
          min_idx = j;
        }
        else {
          bars[j].classList.add("higher-val");
        }
        await sleep(calcSpeedMs(this.props.speed));

        bars[j].classList.remove("higher-val");
      }
      if (lowest !== i) {
        ;[array[i], array[lowest]] = [array[lowest], array[i]]
      }
      this.setState({ array: array });

      bars[i].classList.remove("compare-val", "higher-val", "lower-val");
      bars[min_idx].classList.remove("higher-val", "lower-val");
    }
    this.checkSort();
  }


  async checkSort() {
    const bars = document.getElementsByClassName("array-bar");
    const { array } = this.state;
    for (let i = 0; i < array.length - 1; i++) {
      const currBar = bars[i];
      const nextBar = bars[i + 1];
      if (array[i] > array[i + 1]) {
        currBar.classList.add("higher-val");
        nextBar.classList.add("higher-val");
      }
      await sleep(0);
    }
    for (let i = 0; i < array.length; i++) {
      bars[i].classList.add("lower-val");
      await sleep(0);
    }
  }


}

function randomIntFromInterval(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

async function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function calcSpeedMs(x) {
  return 1000 - x;
}