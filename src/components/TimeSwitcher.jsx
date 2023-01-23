import { days, saveData } from "../assets/saveData";


function TimeSwitcher({ date }) {
  const currentWeather = days[date.currentDay][date.timeOfDay];

  return (
    <div>
    TIME SWITCHER
      {/* <h1>
        {currentWeather.temperature}°{" "}
        {artPicker(currentWeather.precipitationScore)}
      </h1>
      The date is {date.currentDayOfWeek} day {date.currentDay + 1}. The month
      is {date.currentMonth.monthName}. It is currently {date.timeOfDay}. */}
    </div>
  );
}

export default TimeSwitcher;