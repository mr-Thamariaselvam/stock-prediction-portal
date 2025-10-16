/**
 * Formats a given date-time into a structured object containing date and time components.
 *
 * @param {Date|string} dateTime - The input date-time value (as a Date object or string).
 * @param {boolean} [includeMeridium=true] - Whether to include AM/PM indicator (default is true).
 * @param {boolean} [includeMilliseconds=false] - Whether to include milliseconds (default is false).
 * @returns {object} - An object containing formatted date and time components.
 */
function getDateTime(
  dateTime,
  includeMeridium = true,
  includeMilliseconds = false
) {
  const dateTimeObj = new Date(dateTime);
  const date = `${padString(dateTimeObj.getDate())}.${padString(
    dateTimeObj.getMonth() + 1
  )}.${dateTimeObj.getFullYear()}`;
  const hour = dateTimeObj.getHours();
  const displayHour = includeMeridium ? (hour > 12 ? hour % 12 : hour) : hour;
  let time = `${padString(displayHour)}:${padString(
    dateTimeObj.getMinutes()
  )}:${padString(dateTimeObj.getSeconds())}`;

  if (includeMilliseconds) {
    const milliSeconds = padString(dateTimeObj.getMilliseconds(), 3);
    time = `${time}.${milliSeconds}`;
  }

  if (includeMeridium) {
    const meridium = hour >= 12 ? "PM" : "AM";
    time = `${time} ${meridium}`;
  }

  return { date, time };
}

/**
 * Retrieves the current date and time.
 *
 * @returns {string} - A formatted date-time string.
 */
function getCurrentDateTime() {
  let now = new Date();

  let dateTimeString = getDateTime(now, false, true);
  return dateTimeString;
}

/**
 * Pads a string or number with leading zeros to reach a specified length.
 *
 * @param {string|number} value - The input value to be padded.
 * @param {number} [maxLength=2] - The desired length of the output string, defaults to 2.
 * @returns {string} - The padded string.
 */
function padString(value, maxLength = 2) {
  return `${value}`.padStart(maxLength, "0");
}

export { getDateTime, getCurrentDateTime, padString };
