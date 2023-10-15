import React, { useEffect, useState } from "react";
import Slider from "@mui/material/Slider";
import "./sortVisualizer.css";
import { getMergeSortAnimations } from "../SortAlgorithms/mergeSort.js";
const SortVisualizer = () => {
  const [array, setArray] = useState([]);
  const [size, setSize] = useState(5);
  const [speed, setSpeed] = useState(1);
  const [generate, setGenerate] = useState(false);
  useEffect(() => {
    const resetArray = () => {
      const array = [];
      console.log(size);
      for (let i = 0; i < size; i++) {
        array.push(randomIntFromInterval(5, 310));
      }
      setArray(array);
    };
    resetArray();
  }, [size, generate]);

  const animate = (animation) => {
    for (let i = 0; i < animation.length; i++) {
      const arrayBar = document.getElementsByClassName("bar");

      const [barOneIndx, barTwoIndx, isColor, isLast] = animation[i];
      if (isColor) {
        const barOneStyle = arrayBar[barOneIndx].style;
        const barTwoStyle = arrayBar[barTwoIndx].style;
        const color = !isLast ? "red" : "#4ebd9c";

        setTimeout(() => {
          barOneStyle.backgroundColor = color;
          barTwoStyle.backgroundColor = color;
        }, (i * 100) / speed);
      } else {
        setTimeout(() => {
          const barOneStyle = arrayBar[barOneIndx].style;
          barOneStyle.height = `${barTwoIndx}px`;
          arrayBar[barOneIndx].setAttribute("data-tooltip", barTwoIndx);
          console.log(size);
          if (size <= 40) {
            arrayBar[barOneIndx].innerHTML = barTwoIndx;
          }
        }, (i * 100) / speed);
      }
    }
  };

  const MergeSort = () => {
    const arr = [...array];
    const animations = getMergeSortAnimations(arr);
    animate(animations);
  };

  return (
    <div className="container">
      <div className="logo">
        <h2>Sorting Visualizer</h2>
      </div>

      <div className="head">
        <div className="head-btn">
          <button
            className="generate-btn"
            onClick={() => {
              setGenerate(!generate);
            }}
          >
            new array
          </button>

          <span>Algorithms:</span>
          <button onClick={() => MergeSort()}>Merge sort</button>
          <button onClick={() => MergeSort()}>Selection sort</button>
          <button onClick={() => MergeSort()}>Insertion sort</button>
          <button onClick={() => MergeSort()}>Bubble sort</button>
          <button onClick={() => MergeSort()}>Quick sort</button>
          <button onClick={() => MergeSort()}>Heap sort</button>
        </div>

        <div className="head-ctrl">
          <span className="ctrl-span">Size:</span>
          <Slider
            value={size}
            min={5}
            max={100}
            step={5}
            markgetariavaluetext={size}
            valueLabelDisplay="auto"
            onChange={(event) => {
              setSize(event.target.value);
            }}
            style={{
              color: "#fff",
              width: "150px",
              margin: "0.5rem",
            }}
          />

          <span className="ctrl-span">speed:</span>
          <Slider
            value={speed}
            min={0.25}
            max={2}
            step={0.25}
            markgetariavaluetext={size}
            valueLabelDisplay="auto"
            onChange={(event) => {
              setSpeed(event.target.value);
            }}
            style={{
              color: "#fff",
              width: "150px",
              margin: "0.5rem",
            }}
          />
        </div>
      </div>

      <div className="bar-container">
        <div className="bar-con">
          {array.map((value, indx) => (
            <div
              className="bar"
              style={{
                height: `${value}px`,
                width: size <= 10 && size >= 100 ? "5rem" : "20rem",
                backgroundColor: "#4ebd9c",
              }}
              key={indx}
              data-tooltip={value}
            >
              {size < 40 && value}
            </div>
          ))}
        </div>
      </div>

      <div className="algo-info">
        <div className="desc">
        <h3>
          Merge sort is defined as a sorting algorithm that works by dividing an
          array into smaller subarrays, sorting each subarray, and then merging
          the sorted subarrays back together to form the final sorted array.
        </h3>
        </div>
        <div className="perf">
          <h2>Performance</h2>
          <h4>Best Case Time Complexity: O(nlogn)</h4>
          <h4>Average Case Time Complexity: O(nlogn)</h4>
          <h4>Worst Case Time Complexity: O(n^2)</h4>
          <h4>Worst Case Space Complexity: O(nlogn)</h4>
        </div>
       
      </div>
    </div>
  );
};

function randomIntFromInterval(min, max) {
  // min and max included
  return Math.floor(Math.random() * (max - min + 1) + min);
}

export default SortVisualizer;
