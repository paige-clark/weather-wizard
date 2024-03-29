// don't edit this file yourself the app might explode

export const calendarConfigs = {
  daysOfWeek: [
    "Firstday",
    "Secondday",
    "Thirdday",
    "Fourthday",
    "Fifthday",
    "Sixthday",
    "Seventhday",
    "Eightday",
    "Ninthday",
    "TenthDay",
  ],
  months: [
    { monthName: "Hammer", monthDays: 2, season: "winter" },
    { monthName: "Alturiak", monthDays: 2, season: "winter" },
    { monthName: "Ches", monthDays: 1, season: "winter" },
    { monthName: "Tarsakh", monthDays: 30, season: "winter" },
    { monthName: "Mirtul", monthDays: 30, season: "spring" },
    { monthName: "Kythorn", monthDays: 30, season: "spring" },
    { monthName: "Flamerule", monthDays: 30, season: "summer" },
    { monthName: "Eleasias", monthDays: 30, season: "summer" },
    { monthName: "Eleint", monthDays: 30, season: "summer" },
    { monthName: "Marpenoth", monthDays: 30, season: "fall" },
    { monthName: "Uktar", monthDays: 30, season: "fall" },
    { monthName: "Nightal", monthDays: 30, season: "winter" },
  ],
};

// spits out the total number of days in the year, will come in handy
// when the user can add months
export const daysInYear = calendarConfigs.months.reduce((acc, obj) => {
  return acc + obj.monthDays;
}, 0);

/**
 * Each season will have to have a min temp and max temp, general
 * weather pattern info? Like the kinds of things that can happen
 * in that season (snow, ice pellets, rain, sunshine)
 *
 * While there are so many patterns that can happen each month,
 * I'm just going to start with clear, clear with clouds, overcast,
 * and precipitating for now.
 *
 * Other weather patterns include stuff like icy rain, heavy rain,
 * thunderstorms, high wind events, foggy, there are so many but
 * they would all require additional scoring systems so better to
 * get something working for now.
 * 
 */
export const seasons = {
  winter: {
    maxDayTemp: 0, // currently not using this
    minDayTemp: -30, // currently not using this
    maxNightTemp: -5, // currently not using this
    minNightTemp: -45, // currently not using this
    averageTemp: -10,
    precipitationLikelihood: "average",
    precipitationType: "snow"
  },
  spring: {
    maxDayTemp: 18,
    minDayTemp: 10,
    maxNightTemp: 10,
    minNightTemp: 0,
    precipitationLikelihood: "high",
  },
  summer: {
    maxDayTemp: 30,
    minDayTemp: 20,
    maxNightTemp: 20,
    minNightTemp: 17,
    precipitationLikelihood: "low",
  },
  fall: {
    maxDayTemp: 10,
    minDayTemp: 3,
    maxNightTemp: 8,
    minNightTemp: -2,
    precipitationLikelihood: "high",
  },
};

/**
 * There are decisions I'm going to have to make about how weather
 * develops. This should probably be done with some kind of scoring
 * system that looks at the past x days and "rolls" with advantage
 * or disadvantage depending on something... Precipitation score?
 * Temperature? Hm...
 *
 * Is that how I should do it? Have a precipitation score? ex:
 * Range is 0 - 100, if the score is over 75, it's rainy, over
 * 50 it's overcast, under 50 but over 25 it's sunny with clouds,
 * under 25 it's sunny.
 *
 * Then the procedural day generator looks at the past however many
 * days, maybe 5, calculates their average score, then rolls with
 * advantage or disadvantage to change the weather depending on if
 * the resulting average is higher or lower than some number.
 *
 * I guess temperature could work the same, but it would need to use
 * the min and max temps for that season somehow.
 */
export const days = [
  {
    dayNum: 0, //need this for the weird react key stuff
    morning: { precipitationScore: 0, temperature: -11 }, //clear
    afternoon: { precipitationScore: 0, temperature: -6 }, //clear with clouds
    evening: { precipitationScore: 0, temperature: -15 }, //overcast
    overnight: { precipitationScore: 0, temperature: -20 }, //precipitation
  },
];

export const saveData = {
  currentDay: days[0].dayNum,
  dayInMonth: 1,
  currentDayOfWeek: calendarConfigs.daysOfWeek[0],
  currentMonth: calendarConfigs.months[0],
  currentMonthNum: 0,
  currentYear: 1,
  currentSeason: calendarConfigs.months[0].season,
  timeOfDay: "morning",
  precipitationScore: 50, // 0 - 100 should be random eventually
};
