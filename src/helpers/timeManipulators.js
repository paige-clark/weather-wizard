import {
  saveData,
  daysInYear,
  days,
  calendarConfigs,
} from "../assets/saveData";

export function dayGenerator(newDayNum) {
  const newDay = {
    dayNum: newDayNum,
    morning: { precipitationScore: 100, temperature: -11 },
    afternoon: { precipitationScore: 20, temperature: -6 },
    evening: { precipitationScore: 10, temperature: -15 },
    overnight: { precipitationScore: 4, temperature: -20 },
  };
  return days.push(newDay);
}

/**
 * Yes we are mutating the save data this in inentional!
 */
export function timeForward(timeToChange, incrementDate) {
  if (timeToChange === "morning") {
    saveData.timeOfDay = "afternoon";
    return { ...saveData };
  } else if (timeToChange === "afternoon") {
    saveData.timeOfDay = "evening";
    return { ...saveData };
  } else if (timeToChange === "evening") {
    saveData.timeOfDay = "overnight";
    return { ...saveData };
  } else if (timeToChange === "overnight") {
    // Checks to see if the date can be incremented and mutates save if so
    if (saveData.currentDay < daysInYear) {
      saveData.currentDay = incrementDate + 1;
      saveData.currentDayOfWeek = calendarConfigs.daysOfWeek[incrementDate + 1];
      // dayGenerator(incrementDate + 1);
      saveData.timeOfDay = "morning";
      return {
        ...saveData,
      };
    }
  }
}

/**
 * Yes we are mutating the save data this in inentional!
 */
export function timeBackward(timeToChange, incrementDate) {
  // there may be cases where the user is at the end of the year, goes forward
  // then wants to go back. I need to decide how to handle that. Maybe they can't
  // go back if the current year is year 1?
  if (timeToChange === "morning") {
    if (saveData.currentDay > 0) {
      saveData.currentDay = incrementDate - 1;
      saveData.timeOfDay = "overnight";
      saveData.currentDayOfWeek = calendarConfigs.daysOfWeek[incrementDate - 1];
      return {
        ...saveData,
      };
    } else {
      // if years are added to save data the check should be run here to see if
      // the current year isn't the first one. This way we don't have to worry about
      // retroactive generation.
      return { ...saveData };
    }
  } else if (timeToChange === "afternoon") {
    saveData.timeOfDay = "morning";
    return { ...saveData };
  } else if (timeToChange === "evening") {
    saveData.timeOfDay = "afternoon";
    return { ...saveData };
  } else {
    saveData.timeOfDay = "evening";
    return { ...saveData };
  }
}
