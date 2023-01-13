import { days, saveData } from "../assets/saveData";

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

  return (
    <div>
      <h1>
        {currentWeather.temperature}°{" "}
        {artPicker(currentWeather.precipitationScore)}
      </h1>
      The date is {date.currentDayOfWeek} day {date.currentDay + 1}. The month
      is {date.currentMonth.monthName}. It is currently {date.timeOfDay}.
    </div>
  );
}

export default ForecasterBox;
