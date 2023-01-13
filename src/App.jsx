import { useState } from "react";
import Lottie from "lottie-react";
import "./App.css";
import { calendarConfigs, days, saveData, seasons } from "./assets/saveData";
import slime from "./assets/slime-test.json";
import ForecasterBox from "./components/ForeCasterBox";
import {
  timeForward,
  timeBackward,
  dayGenerator,
} from "./helpers/timeManipulators";

function App() {
  const [currentDate, setCurrentDate] = useState(saveData);
  console.log(days);

  return (
    <div className="App">
      <h1>Weather Wizard</h1>
      <div className="card">
        <div>
          <Lottie className="logo" animationData={slime} loop={true} />
        </div>
        {/* box that displays temp and weather graphic */}
        <ForecasterBox date={currentDate} />
        {/* increment the time of day */}
        <button
          onClick={() =>
            setCurrentDate((currentDate) =>
              timeBackward(currentDate.timeOfDay, currentDate.currentDay)
            )
          }
        >
          prev
        </button>
        currently {currentDate.timeOfDay}
        {/* decrement the time of day */}
        <button
          onClick={() => {
            if (currentDate.timeOfDay === "overnight") {
              dayGenerator(currentDate.currentDay + 1);
              setCurrentDate((currentDate) =>
                timeForward(currentDate.timeOfDay, currentDate.currentDay)
              );
            } else {
              setCurrentDate((currentDate) =>
                timeForward(currentDate.timeOfDay, currentDate.currentDay)
              );
            }
          }}
        >
          next
        </button>
      </div>
    </div>
  );
}

export default App;
