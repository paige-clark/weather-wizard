import { useState } from "react";
import Lottie from "lottie-react";
import "./App.css";
import { calendarConfigs, days, saveData, seasons } from "./assets/saveData";
import slime from "./assets/slime-test.json";
import ForecasterBox from "./components/ForeCasterBox";
import TimeSwitcher from "./components/TimeSwitcher";
import {
  timeForward,
  timeBackward,
  dayGenerator,
  dateFormatter,
} from "./helpers/timeManipulators";

function App() {
  const [currentDate, setCurrentDate] = useState(saveData);
  // console.log(saveData);
  // console.log(days);

  return (
    <div className="App">
      <div className="card">
        {/* <div>
          <Lottie className="logo" animationData={slime} loop={true} />
        </div> */}
        <TimeSwitcher date={currentDate} currentDate={currentDate} setCurrentDate={setCurrentDate} />
      </div>
      {/* box that displays temp and weather graphic */}
      <ForecasterBox date={currentDate} />
    </div>
  );
}

export default App;
