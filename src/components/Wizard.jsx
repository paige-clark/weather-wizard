import Lottie from "lottie-react";
import slime from "../assets/slime-test.json";

function Wizard({}) {
  // const currentWeather = days[date.currentDay][date.timeOfDay];

  return (
    <div className="Wizard">
      <Lottie className="slime" animationData={slime} loop={true} />
      <div className="wizard-bubble">Placeholder text.</div>
    </div>
  );
}

export default Wizard;
