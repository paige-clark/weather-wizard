import Lottie from "lottie-react";
import cloud from "../assets/lotties/cloud.json";

function WeatherLotties({}) {
  // const currentWeather = days[date.currentDay][date.timeOfDay];

  return (
    <>
      <Lottie className="cloud" animationData={cloud} loop={true} />
    </>
  );
}

export default WeatherLotties;
