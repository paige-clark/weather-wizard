import { useState } from "react";
import Lottie from "lottie-react";
import "./App.css";
import { calendarConfigs, days, saveData, seasons } from "./assets/saveData";
import slime from "./assets/slime-test.json";
import ForecasterBox from "./components/ForeCasterBox";
import TimeSwitcher from "./components/TimeSwitcher";
import BottomButtons from "./components/BottomButtons";
import Wizard from "./components/Wizard";
import WizardTxt from "./components/WizardTxt";

import {
  timeForward,
  timeBackward,
  dayGenerator,
  dateFormatter,
} from "./helpers/timeManipulators";
import WizardII from "./components/RiveTest";

function App() {
  const [currentDate, setCurrentDate] = useState(saveData);

  return (
    <div className="App">
      <div className="wizard">
        <WizardII />
      </div>
      <div className="speech-section">
        <WizardTxt />
        <BottomButtons />
      </div>
      <div className="weather-section">
        <TimeSwitcher
          date={currentDate}
          currentDate={currentDate}
          setCurrentDate={setCurrentDate}
        />
        <ForecasterBox date={currentDate} />
      </div>
    </div>
  );
}

export default App;
