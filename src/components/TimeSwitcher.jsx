import { days, saveData } from "../assets/saveData";
import {
  timeForward,
  timeBackward,
  dayGenerator,
  dateFormatter,
} from "../helpers/timeManipulators";
import leftHand from "../assets/svgs/handLeft.svg";
import rightHand from "../assets/svgs/handRight.svg";

function TimeSwitcher({ date, currentDate, setCurrentDate }) {
  function monthNameFormatter(month) {
    // takes in a month, spits it out as three character if longer than
    // four characters, otherwise just give them month name.
    if (month.length > 4) {
      return `${month.slice(0, 3)}`;
    } else {
      return month;
    }
  }

  return (
    <div className="TimeSwitcher">
      {/* decrement the time of day */}
      {/* <div className="switcher-mini-calendar">
        <div className="switcher-mini-calendar-month">
          {monthNameFormatter(saveData.currentMonth.monthName)}
        </div>
        <div className="switcher-mini-calendar-date">{saveData.dayInMonth}</div>
      </div> */}
      {/* <div className="switcher-right-side"> */}
      {/* <div className="switcher-weekday">{date.currentDayOfWeek}</div> */}

      <img
        src={leftHand}
        alt="left pointer SVG"
        className="hand-button"
        onClick={() => {
          if (currentDate.timeOfDay === "morning") {
            dateFormatter(false, true);
          }
          setCurrentDate((currentDate) =>
            timeBackward(currentDate.timeOfDay, currentDate.currentDay)
          );
        }}
      />

      <div className="time-of-day">{currentDate.timeOfDay}</div>
      {/* increment the time of day */}
      <img
        src={rightHand}
        alt="left pointer SVG"
        className="hand-button"
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
      />

      {/* </div> */}
      {/* The date is {date.currentDayOfWeek} day {date.currentDay + 1}. The month
      is {date.currentMonth.monthName}. It is currently {date.timeOfDay}. */}
    </div>
  );
}

export default TimeSwitcher;
