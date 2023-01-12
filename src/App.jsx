import { useState } from "react";
import Lottie from "lottie-react";
import "./App.css";
import { calendarConfigs, days, saveData, seasons } from "./assets/saveData";
import slime from "./assets/slime-test.json";
import ForecasterBox from "./components/ForeCasterBox";

function App() {
  const [count, setCount] = useState(0);
  const [currentDate, setCurrentDate] = useState(saveData);

  function timeForward(timeToChange) {
    if (timeToChange === "morning") {
      return {...currentDate, timeOfDay: "afternoon"};
    } else if (timeToChange === "afternoon") {
      return {...currentDate, timeOfDay: "evening"};
    } else if (timeToChange === "evening") {
      return {...currentDate, timeOfDay: "overnight"};
    } else {
      // will also need to increment the date here
      return {...currentDate, timeOfDay: "morning"};
    }
  }
  function timeBackward(timeToChange) {
    if (timeToChange === "morning") {
       // will also need to decrement the date here
      return {...currentDate, timeOfDay: "overnight"};
    } else if (timeToChange === "afternoon") {
      return {...currentDate, timeOfDay: "morning"};
    } else if (timeToChange === "evening") {
      return {...currentDate, timeOfDay: "afternoon"};
    } else {
      return {...currentDate, timeOfDay: "evening"};
    }
  }

  return (
    <div className="App">
      <h1>Weather Wizard</h1>
      <div className="card">
        <div>
          <Lottie className="logo" animationData={slime} loop={true} />
        </div>
        <ForecasterBox date={currentDate} />
        <button onClick={() => setCurrentDate(timeBackward(currentDate.timeOfDay))}>
          prev
        </button>
        currently {currentDate.timeOfDay}
        <button onClick={() => setCurrentDate(timeForward(currentDate.timeOfDay))}>
          next
        </button>
        {/* <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button> */}
      </div>
    </div>
  );
}

export default App;
