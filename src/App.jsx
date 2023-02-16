import { useState } from "react";
import Lottie from "lottie-react";
import "./App.css";
import { calendarConfigs, days, saveData, seasons } from "./assets/saveData";
import slime from "./assets/slime-test.json";
import ForecasterBox from "./components/ForeCasterBox";
import TimeSwitcher from "./components/TimeSwitcher";
import BottomButtons from "./components/BottomButtons";
import Wizard from "./components/Wizard";

import {
  timeForward,
  timeBackward,
  dayGenerator,
  dateFormatter,
} from "./helpers/timeManipulators";
import Simple from "./components/RiveTest";

function App() {
  const [currentDate, setCurrentDate] = useState(saveData);

  return (
    <>
      <div className="App">
        {/* <TimeSwitcher
        date={currentDate}
        currentDate={currentDate}
        setCurrentDate={setCurrentDate}
      />
      <ForecasterBox date={currentDate} />
      <div className="bottom-section">
        <Wizard />
        <BottomButtons />
      </div> */}
        <div>
          <Simple />
        </div>
      </div>
    </>
  );
}

export default App;
