import React, { useEffect, useState } from "react";
import "./sortVisualizer.css";
import { getMergeSortAnimations } from "../SortAlgorithms/mergeSort.js";
import { getSelectionSortAnimations } from "../SortAlgorithms/selectionSort";
import { algoDetails} from "../utils/algoDetails";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay } from '@fortawesome/free-solid-svg-icons';
import { getInsertionSortAnimations } from "../SortAlgorithms/insertionSort.js";
import { getBubbleSortAnimations } from "../SortAlgorithms/bubbleSort.js";
import { getQuickSortAnimations } from "../SortAlgorithms/quickSort.js";
const SortVisualizer = () => {
  const [array, setArray] = useState([]);
  const [size, setSize] = useState(5);
  const [speed, setSpeed] = useState(1);
  const [generate, setGenerate] = useState(false);
  const [algoName,setAlgoName]=useState();
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
        const color = !isLast ? "#f77171" : "#08f8b4be";

        setTimeout(() => {
          barOneStyle.backgroundColor = color;
          barTwoStyle.backgroundColor = color;
        }, (i * 100) / speed);
      } else {
        setTimeout(() => {
          const barOneStyle = arrayBar[barOneIndx].style;
          barOneStyle.height = `${barTwoIndx}px`;
          barOneStyle.color="white";
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

  const SelectionSort = () => {
    const arr = [...array];
    const animations =getSelectionSortAnimations(arr);
    animate(animations);
  };

  const InsertionSort = () =>{
    const arr= [...array];
    const animations=getInsertionSortAnimations(arr);
    animate(animations);
  };

  const BubbleSort = () => {
    const arr=[...array];
    const animations=getBubbleSortAnimations(arr);
    animate(animations);
  }

  const QuickSort = () => {
    const arr = [...array];
    const animations=getQuickSortAnimations(arr);
    animate(animations);
  }

  const sort=(algo)=>{
       if(algo==="Merge sort")
       {
        MergeSort();
       }
       else if(algo==="Selection sort")
       {
        SelectionSort();
       }
       else if(algo==="Insertion sort")
       {
        InsertionSort();
       }
       else if(algo==="Bubble sort")
       {
        BubbleSort();
       }
       else if(algo==="Quick sort")
       {
        QuickSort();
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
            <option>Sorting Algorithms</option>
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
            <option selected="selected">5</option>
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
            <option >Speed</option>
            <option value="0.25">0.25x</option>
            <option value="0.5">0.5x</option>
            <option value="0.75">0.75x</option>
            <option value="1"selected="selected">1x</option>
            <option value="1.25">1.25x</option>
            <option value="1.50">1.50x</option>
            <option value="1.75">1.75x</option>
            <option value="2">2x</option>
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
              if(algoName)
              {
                sort(algoName);
              }
              else{
                alert("please select sorting algorithm")
              }
            }} className="play-btn" />
            
      </div>
      <div className="algo-info">
        <div className="desc">
          <h2>{selectedAlgo?selectedAlgo.name:"Select Algorithm"}</h2>
        <h3>{selectedAlgo?selectedAlgo.description:"Before diving into the visualization of an algorithm's execution on a set of numbers, please select your preferred algorithm. Let's get started on this visual journey together!"}</h3>
        </div>
        
        <div className="perf">
          <h2>Performance</h2>
          <br></br>
          <table className="perf-table">
            <tr>
              <td><h4>Best Case Time Complexity: </h4></td>
              <td><span>{selectedAlgo?selectedAlgo.BCTC:" "}</span></td>
            </tr>
            <tr>
              <td><h4>Average Case Time Complexity: </h4></td>
              <td> <span>{selectedAlgo?selectedAlgo.ACTC:" "}</span></td>
            </tr>
            <tr>
              <td><h4>Worst Case Time Complexity: </h4></td>
              <td> <span>{selectedAlgo?selectedAlgo.WCTC:" "}</span></td>
            </tr>
            <tr>
              <td><h4>Worst Case Space Complexity: </h4></td>
              <td> <span>{selectedAlgo?selectedAlgo.WCSC:" "}</span></td>
            </tr>
          </table>
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
