import { useState } from "react";
import Lottie from "lottie-react";
import "./App.css";
import { calendarConfigs, days, saveData, seasons } from "./assets/saveData";
import slime from "./assets/slime-test.json";
import ForecasterBox from "./components/ForeCasterBox";
import TimeSwitcher from "./components/TimeSwitcher";
import BottomButtons from "./components/BottomButtons";
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
        {/* <div>
          <Lottie className="logo" animationData={slime} loop={true} />
        </div> */}
      <TimeSwitcher
        date={currentDate}
        currentDate={currentDate}
        setCurrentDate={setCurrentDate}
      />
      {/* box that displays temp and weather graphic */}
      <ForecasterBox date={currentDate} />
      <BottomButtons />
    </div>
  );
}

export default App;
