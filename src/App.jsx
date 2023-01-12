import { useState } from "react";
import Lottie from "lottie-react";
import "./App.css";
import { calendarConfigs, days, saveData, seasons } from "./assets/saveData";
import slime from "./assets/slime-test.json";
import ForecasterBox from "./components/ForeCasterBox";
import { timeForward, timeBackward } from "./helpers/timeManipulators";

function App() {
  const [currentDate, setCurrentDate] = useState(saveData);

  return (
    <div className="App">
      <h1>Weather Wizard</h1>
      <div className="card">
        <div>
          <Lottie className="logo" animationData={slime} loop={true} />
        </div>
        <ForecasterBox date={currentDate} />
        <button
          onClick={() =>
            setCurrentDate((currentDate) => timeBackward(currentDate.timeOfDay, currentDate.currentDay))
          }
        >
          prev
        </button>
        currently {currentDate.timeOfDay}
        <button
          onClick={() =>
            setCurrentDate((currentDate) => timeForward(currentDate.timeOfDay, currentDate.currentDay))
          }
        >
          next
        </button>
      </div>
    </div>
  );
}

export default App;
