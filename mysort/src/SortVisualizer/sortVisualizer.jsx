import React, { useCallback, useEffect, useState } from "react";
import "./sortVisualizer.css";
import { getMergeSortAnimations } from "../SortAlgorithms/mergeSort.js";
import { getSelectionSortAnimations } from "../SortAlgorithms/selectionSort";
import { algoDetails} from "../utils/algoDetails";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay,faPause } from '@fortawesome/free-solid-svg-icons';
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
  const[inProgress,setInProgress]=useState(false);

  const [isPaused, setIsPaused] = useState(true);
  const [animationIndex, setAnimationIndex] = useState(0);
  const [currentAnimation, setCurrentAnimation] = useState([]);

  useEffect(() => {
    // Find and set the details of the selected algorithm
    const selectedAlgorithm = algoDetails.find(algo => algo.name === algoName);
    setSelectedAlgo(selectedAlgorithm);
  }, [algoName]);


  const resetArray = useCallback(() => {
    //reset array
    const array = [];
    for (let i = 0; i < size; i++) {
      array.push(randomIntFromInterval(5, 300));
    }
    setArray(array);
  },[size]);


  useEffect(() => {
    // generate new array
    resetArray();
  }, [size, generate,resetArray]);


  //callback function for animation
  const animateStep = useCallback(() => {
    const arrayBars = document.getElementsByClassName("bar");

    const [barOneIndex, barTwoIndex, isColor, isLast] = currentAnimation[animationIndex];

    if (isColor) {
      const barOneStyle = arrayBars[barOneIndex].style;
      const barTwoStyle = arrayBars[barTwoIndex].style;
      const color = !isLast ? "#f77171" : "#08f8b4be";

      barOneStyle.backgroundColor = color;
      barTwoStyle.backgroundColor = color;
    } 
    
    else 
    {
      const barOneStyle = arrayBars[barOneIndex].style;
      barOneStyle.height = `${barTwoIndex}px`;
      barOneStyle.color = "white";
      arrayBars[barOneIndex].setAttribute("data-tooltip", barTwoIndex);
      if (size <= 40) 
      {
        const newArray=[...array];
        newArray[barOneIndex]=barTwoIndex;
        setArray(newArray);
      }
    }

    setAnimationIndex(animationIndex + 1);
  },[size, animationIndex, currentAnimation,array]);


  useEffect(() => {
    // to animation the array
    if (!isPaused && animationIndex < currentAnimation.length) {
      const timer = setTimeout(() => {
        animateStep();
      }, 500 / speed);

      return () => clearTimeout(timer);
    }
    if (!isPaused && animationIndex=== currentAnimation.length && currentAnimation.length > 0) {
      setIsPaused((prevState)=>!prevState);
      setInProgress(false);
      setAnimationIndex(0);
      alert("Sorting completed!"); 
    }
  }, [speed,isPaused, animationIndex, currentAnimation,animateStep,inProgress]);
 

  // function trigger animation
  const animate = (animations) => {
    setCurrentAnimation(animations);
    setIsPaused(false);
  };

  // to toggle play and pause
  const togglePlayPause = () => {
    let alertShown = false;
    setIsPaused((prevState) => {
      if (prevState) {
        if(selectedAlgo)
        {
          sort(algoName);
        }
        else
        {
          if(!alertShown)
          {
            alertShown=true
            alert("please select the sorting algorithm that you need to explore!!!")
          }
          return true
        }
      }
      return !prevState;
    });
  };


 //merge sort function
  const MergeSort = () => {
    const arr = [...array];
    const animations = getMergeSortAnimations(arr);
    animate(animations);
  };

  // selection sort function
  const SelectionSort = () => {
    const arr = [...array];
    const animations =getSelectionSortAnimations(arr);
    animate(animations);
  };

  //insertion sort function
  const InsertionSort = () =>{
    const arr= [...array];
    const animations=getInsertionSortAnimations(arr);
    animate(animations);
  };

  //bubble sort function
  const BubbleSort = () => {
    const arr=[...array];
    const animations=getBubbleSortAnimations(arr);
    animate(animations);
  }

  //quick sort function
  const QuickSort = () => {
    const arr = [...array];
    const animations=getQuickSortAnimations(arr);
    animate(animations);
  }

  // triggering sorting function as per algo selected
  const sort=(algo)=>{
     setInProgress(true);
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
          <select 
          className= {inProgress?'disable-select':' '}
          disabled={inProgress}
          onChange={(event)=>{
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
          <select 
          className={inProgress?'disable-select':' '}
          disabled={inProgress}
          onChange={(event) => {
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
          <select
          onChange={(event) => {
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
           
            className={`btn ${inProgress?'disable-btn':'generate-btn'}`}
            onClick={() => {
              !inProgress&&setGenerate((prevState)=>!prevState);
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
            <FontAwesomeIcon icon={!isPaused?faPause:faPlay} onClick={togglePlayPause} className="play-btn" />
            
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
