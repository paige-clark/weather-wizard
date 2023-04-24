import { useState } from "react";
import { days, saveData } from "../assets/saveData";
import WeatherLotties from "./WeatherLotties";

// will need to take in to account stuff like time of day and season
function artPicker(score) {
  if (score >= 0 && score <= 24) {
    return "☀️";
  } else if (score >= 25 && score <= 49) {
    return "🌤️";
  } else if (score >= 50 && score <= 74) {
    return "☁️";
  } else if (score >= 75 && score <= 100) {
    if (saveData.currentSeason === "winter") {
      return "🌨️";
    } else {
      return "🌧️";
    }
  }
}

// displays the current temp and weather art
function ForecasterBox({ date }) {
  const currentWeather = days[date.currentDay][date.timeOfDay];

  console.log(`CURRENT WEATHER`, currentWeather);

  // function animateValue(obj, start, end, duration) {
  //   let startTimestamp = 0;
  //   const step = (timestamp) => {
  //     if (!startTimestamp) startTimestamp = timestamp;
  //     const progress = Math.min((timestamp - startTimestamp) / duration, 1);
  //     obj.innerHTML = Math.floor(progress * (end - start) + start);
  //     if (progress < 1) {
  //       window.requestAnimationFrame(step);
  //     }
  //   };
  //   window.requestAnimationFrame(step);
  // }

  // const obj = document.getElementById("value");

  return (
    <div className="ForecasterBox">
      <div className="forecast-left">
        <div>
          <style>
            {`
              @property --num {
                syntax: '<integer>';
                initial-value: ${currentWeather.temperature};
                inherits: false;
              }
            `}
          </style>
          <div className="forecast-left-num"></div>
        </div>
        <div>°</div>
        {/* <div className="forecast-left-num">{currentWeather.temperature}°</div> */}
      </div>

      <div className="forecast-right">
        {" "}
        <WeatherLotties />
        {artPicker(currentWeather.precipitationScore)}
      </div>
      {/* The date is {date.currentDayOfWeek} day {date.currentDay + 1}. The month
      is {date.currentMonth.monthName}. It is currently {date.timeOfDay}. */}
    </div>
  );
}

export default ForecasterBox;
