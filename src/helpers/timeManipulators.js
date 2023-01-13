import {
  saveData,
  daysInYear,
  days,
  calendarConfigs,
  seasons,
} from "../assets/saveData";

function rollDice(sides, wantNegativeRange) {
  // if wantNegativeRange range is true then -sides to sides (ex: -6 to 6) will be returned
  if (wantNegativeRange) {
    return (
      Math.ceil(Math.random() * sides) * (Math.round(Math.random()) ? 1 : -1)
    );
  } else {
    return Math.floor(Math.random() * sides);
  }
}

// generate the temperatures for the day
function tempGenerator() {
  let counter;
  let seasonAverage =
    seasons[calendarConfigs.months[saveData.currentMonthNum].season]
      .averageTemp;
  console.log("SEASON AVERAGE", seasonAverage);
  /**
   * if there aren't three days in the past just use the current
   * length. This is supposed to be for if there are no days yet
   * NOT for if they set the time to a future date.
   *
   * An idea for using this function for when they skip to a future
   * date is to take in a boolean, but it might be better to just
   * create a different function.
   */

  // revisit this code when you want weather trends (cold front warm front)
  // if (days.length < 3) {
  //   counter = days.length;
  // } else {
  //   // if I'm going to do trend modifiers, I'd do them here b/c data
  //   counter = 3;
  // }

  // while (counter > 0) {

  //   counter--;
  // }

  // Just return a generated day to start
  const dayAverage = seasonAverage + rollDice(4, true);
  console.log("DAY AVERAGE", dayAverage);
  // going to need unique values per season?
  const newMorningTemp = dayAverage + rollDice(2, true) - rollDice(4, false); // morning should be colder but not as cold as overnight
  const newAfternoonTemp = dayAverage + rollDice(1, true) + rollDice(2, false); // should be warmest
  const newEveningTemp = dayAverage + rollDice(1, true) - rollDice(2, false);
  const newOvernightTemp = dayAverage + rollDice(2, true) - rollDice(7, false); // coldest

  const newTemps = {
    morning: newMorningTemp,
    afternoon: newAfternoonTemp,
    evening: newEveningTemp,
    overnight: newOvernightTemp,
  };

  return newTemps;
}

// generate a new day if one doesn't exist
export function dayGenerator(newDayNum) {
  const generatedTemps = tempGenerator();
  console.log(generatedTemps);
  const newDay = {
    dayNum: newDayNum,
    morning: { precipitationScore: 100, temperature: generatedTemps.morning },
    afternoon: {
      precipitationScore: 20,
      temperature: generatedTemps.afternoon,
    },
    evening: { precipitationScore: 10, temperature: generatedTemps.evening },
    overnight: { precipitationScore: 4, temperature: generatedTemps.overnight },
  };
  return days.push(newDay);
}

/**
 * Moves the time of day foreward
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
 * Moves the time of day backwards
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
