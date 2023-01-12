import { saveData } from "../assets/saveData";

export function timeForward(timeToChange) {
  if (timeToChange === "morning") {
    return { ...saveData, timeOfDay: "afternoon" };
  } else if (timeToChange === "afternoon") {
    return { ...saveData, timeOfDay: "evening" };
  } else if (timeToChange === "evening") {
    return { ...saveData, timeOfDay: "overnight" };
  } else {
    // will also need to increment the date here
    return { ...saveData, timeOfDay: "morning" };
  }
}
export function timeBackward(timeToChange) {
  if (timeToChange === "morning") {
    // will also need to decrement the date here
    return { ...saveData, timeOfDay: "overnight" };
  } else if (timeToChange === "afternoon") {
    return { ...saveData, timeOfDay: "morning" };
  } else if (timeToChange === "evening") {
    return { ...saveData, timeOfDay: "afternoon" };
  } else {
    return { ...saveData, timeOfDay: "evening" };
  }
}
