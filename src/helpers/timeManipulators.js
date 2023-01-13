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

// generate precipitation for the day
function precipitationGenerator() {
  /**
   * It's going to be very important for weather to grow on itself when it comes
   * to precipitation, looking at the history will be important.
   *
   * To start I could generate an intial score (ideally day one will be random
   * in the end), then roll 1d10 or something, I feel like this should change up to
   * have more variance...
   * But then esstially split that number in to 4 then gradiate the weather according
   * to those 4 numbers.
   *
   * Down the road maybe wind could make this change faster?
   *
   * Testing this out with just the random numbers, it seems cool, but I think
   * for interest I need to analyze patterns and push it more in one direction
   * if the past 3 days have been too similar
   */

  // store the save data
  const oldPrecip = saveData.precipitationScore;

  // adjust this number to make weather changing more erratic
  let precipitationScoreModifier = rollDice(75, true);
  let difference = precipitationScoreModifier;

  if (oldPrecip + precipitationScoreModifier < 0) {
    // adjust so that the difference doesn't go under
    difference += oldPrecip + precipitationScoreModifier;

    // change the result and store it in the save
    precipitationScoreModifier = 0;
    saveData.precipitationScore = precipitationScoreModifier;
  } else if (oldPrecip + precipitationScoreModifier > 100) {
    // adjust so that the difference doesn't go over
    difference -= oldPrecip + precipitationScoreModifier - 100;

    // change the result and store it in the save
    precipitationScoreModifier = 100;
    saveData.precipitationScore = precipitationScoreModifier;
  } else {
    // everything is fine, store the new score in the save
    saveData.precipitationScore = oldPrecip + precipitationScoreModifier;
  }
  // the amount to change the weather per section in the day
  let incrementNumber = Math.floor(difference / 4);

  const newPrecip = {
    morning: Math.max(oldPrecip + incrementNumber, 0),
    afternoon: Math.max(oldPrecip + incrementNumber * 2, 0),
    evening: Math.max(oldPrecip + incrementNumber * 3, 0),
    overnight: Math.max(oldPrecip + incrementNumber * 4, 0),
  };

  return newPrecip;
}

// generate a new day if one doesn't exist
export function dayGenerator(newDayNum) {
  const generatedTemps = tempGenerator();
  const generatedPrecip = precipitationGenerator();

  const newDay = {
    dayNum: newDayNum,
    morning: {
      precipitationScore: generatedPrecip.morning,
      temperature: generatedTemps.morning,
    },
    afternoon: {
      precipitationScore: generatedPrecip.afternoon,
      temperature: generatedTemps.afternoon,
    },
    evening: {
      precipitationScore: generatedPrecip.evening,
      temperature: generatedTemps.evening,
    },
    overnight: {
      precipitationScore: generatedPrecip.overnight,
      temperature: generatedTemps.overnight,
    },
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
      saveData.currentDayOfWeek =
        calendarConfigs.daysOfWeek[
          (incrementDate + 1) % calendarConfigs.daysOfWeek.length
        ];
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
