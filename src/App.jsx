import { useState } from "react";
import Lottie from "lottie-react";
import "./App.css";
import { calendarConfigs, days, saveData, seasons } from "./assets/saveData";
import slime from "./assets/slime-test.json";
import ForecasterBox from "./components/ForeCasterBox";

function App() {
  const [count, setCount] = useState(0);
  const [currentDate, setCurrentDate] = useState(saveData);

  function progressTime(timeToChange) {
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

  return (
    <div className="App">
      <h1>Weather Wizard</h1>
      <div className="card">
        <div>
          <Lottie className="logo" animationData={slime} loop={true} />
        </div>
        <ForecasterBox date={currentDate} />
        <button onClick={() => setCurrentDate(progressTime(currentDate.timeOfDay))}>
          progress time, currently {currentDate.timeOfDay}
        </button>
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
      </div>
    </div>
  );
}

export default App;
