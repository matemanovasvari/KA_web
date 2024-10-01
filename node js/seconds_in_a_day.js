import input from './input.js';

const currentHours = parseInt(await input("What's the hour rn?"));
const currentMinutes = parseInt(await input("What's the minute rn?"));
const currentSeconds = parseInt(await input("What's the second rn?"));

const hoursInSecs = currentHours * 3600;
const minutesInSecs = currentMinutes * 60;

const remainingSecs = 86400 - (hoursInSecs + minutesInSecs + currentSeconds);

console.log(`${remainingSecs} are left of the day.`);