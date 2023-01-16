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
  dateFormatter,
} from "./helpers/timeManipulators";

function App() {
  const [currentDate, setCurrentDate] = useState(saveData);
  console.log(saveData);
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
        {/* decrement the time of day */}
        <button
          onClick={() => {
            // dateFormatter(false, true);
            setCurrentDate((currentDate) =>
              timeBackward(currentDate.timeOfDay, currentDate.currentDay)
            );
          }}
        >
          prev
        </button>
        currently {currentDate.timeOfDay}
        {/* increment the time of day */}
        <button
          onClick={() => {
            if (currentDate.timeOfDay === "overnight") {
              // issue: dayGenerator should only be called if the next day doesn't exist

              // if days at the index of this day + 1 does not exist call the generator
              if (!days[saveData.currentDay + 1]) {
                dayGenerator(currentDate.currentDay + 1);
              }

              dateFormatter(true, false);

              // then set the day forward
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
