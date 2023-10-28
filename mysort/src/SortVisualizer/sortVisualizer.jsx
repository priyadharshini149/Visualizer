import React, { useEffect, useState } from "react";
import "./sortVisualizer.css";
import { getMergeSortAnimations } from "../SortAlgorithms/mergeSort.js";
import { algoDetails} from "../utils/algoDetails";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay } from '@fortawesome/free-solid-svg-icons';
const SortVisualizer = () => {
  const [array, setArray] = useState([]);
  const [size, setSize] = useState(5);
  const [speed, setSpeed] = useState(1);
  const [generate, setGenerate] = useState(false);
  const [algoName,setAlgoName]=useState("");
  const algoDet=algoDetails;
  console.log(algoDet);
  const [selectedAlgo, setSelectedAlgo] = useState(null);

  useEffect(() => {
    // Find and set the details of the selected algorithm
    console.log(algoName);
    const selectedAlgorithm = algoDetails.find(algo => algo.name === algoName);
    setSelectedAlgo(selectedAlgorithm);
  }, [algoName]);

  useEffect(() => {
    const resetArray = () => {
      const array = [];
      console.log(size);
      for (let i = 0; i < size; i++) {
        array.push(randomIntFromInterval(5, 300));
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

  const sort=(algo)=>{
       if(algo==="Merge sort")
       {
        MergeSort();
       }
  }
  return (
    <div className="container">
      <nav className="navbar">
        <div className="navbar-container">
        <div className="logo">
          <h2>Sorting Visualizer</h2>
        </div>
      <div className="nav-elements">
        <ul>
          <li>
          <select onChange={(event)=>{
            setAlgoName(event.target.value);
          }}>
            <option>Algorithm</option>
            <option>Merge sort</option>
            <option>Selection sort</option>
            <option>Insertion sort</option>
            <option>Bubble sort</option>
            <option>Quick sort</option>
            <option>Heap sort</option>
          </select>
          </li>
          <li>
          <select onChange={(event) => {
              setSize(event.target.value);
            }}>
            <option>Size</option>
            <option>5</option>
            <option>10</option>
            <option>20</option>
            <option>50</option>
            <option>100</option>
          </select>
          </li>
          <li>
          <select onChange={(event) => {
              setSpeed(event.target.value);
            }}>
            <option>Speed</option>
            <option>0.25</option>
            <option>0.5</option>
            <option>0.75</option>
            <option>1</option>
            <option>1.25</option>
            <option>1.50</option>
            <option>1.75</option>
            <option>2</option>
          </select>
          </li>
          <li>
          <button
            className="generate-btn"
            onClick={() => {
              setGenerate(!generate);
            }}
          >
            Randomize
          </button>
          </li>
        </ul>
      </div>
        </div>
      </nav>


      <div className="bar-container">
        <div className="bar-con">
          {array.map((value, indx) => (
            <div
              className="bar"
              style={{
                height: `${value}px`,
                width: size <= 10 && size >= 100 ? "5rem" : "20rem",
              
              }}
              key={indx}
              data-tooltip={value}
            >
              <span>{size < 40 && value}</span>
              
            </div>
          ))}
        </div>
      </div>
      <div className="play">
            <FontAwesomeIcon icon={faPlay} onClick={()=>{
              sort(algoName);
            }} className="play-btn" />
            
      </div>
      <div className="algo-info">
        <div className="desc">
        <h3>{selectedAlgo?selectedAlgo.description:"select the algorithm to sort the randomize array select the algorithm to sort the randomize array select the algorithm to sort the randomize array select the algorithm to sort the randomize array"}</h3>
        </div>
        
        <div className="perf">
          <h2>Performance</h2>
          <br></br>
          <h4>Best Case Time Complexity: {selectedAlgo?selectedAlgo.BCTC:" "}</h4>
          <h4>Average Case Time Complexity: {selectedAlgo?selectedAlgo.ACTC:" "}</h4>
          <h4>Worst Case Time Complexity: {selectedAlgo?selectedAlgo.WCTC:" "}</h4>
          <h4>Worst Case Space Complexity: {selectedAlgo?selectedAlgo.WCSC:" "}</h4>
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
