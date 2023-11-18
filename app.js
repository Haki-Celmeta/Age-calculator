const calculateButton = document.getElementById('calculate-button');
const inputs = document.querySelectorAll('input');

/**
 * Check if a given year is leap year or not. True if is leap year, false otherwise.
 * 
 * @param {number} yearInput 
 */
function isLeapYear(yearInput) {
  return (yearInput % 4 === 0 && yearInput % 100 !== 0) || (yearInput % 400 === 0);
}

/**
 * Check if february is Leap year is 29 or less. True is it is, false if not.
 */
function isFebruaryCorrect(dayInput, yearInput) {
  if (isLeapYear(yearInput)) {
    if (dayInput <= 29) return true;
  }

  if (dayInput <= 28) return true;
  return false;
}

/**
 * Check if a month has 31 or 30 days;
 * 
 * @param {number} monthInput 
 */
function monthWith31(monthInput) {
  const months = monthInput === 1 || monthInput === 3 || monthInput === 5 || monthInput === 7
    || monthInput === 8 || monthInput === 10 || monthInput === 12;
  return months;
}

/**
 * Check if day input is greater than 0 and smaller than 32, or if a month is with 30 or 31. 
 * True if day is correct, false otherwise.
 * 
 * @returns {boolean}
 */
function isDayCorrect(dayInput, monthInput, yearInput) {
  if (monthWith31(monthInput)) {
    if (dayInput <= 31 && dayInput > 0) return true;
    return false;
  } else if (monthInput === 2) {
    return isFebruaryCorrect(dayInput, yearInput);
  }

  return dayInput < 31 && dayInput > 0;
}

/**
 * Check if month input is greater than 10 and smaller than 13. True if month is correct, false otherwise.
 * 
 * @returns {boolean}
 */
function isMonthCorrect(monthInput) {
  return monthInput < 13 && monthInput > 0;
}

/**
 * Check if given year is in the future or not. True is year is correct, false if not.
 * 
 * @returns {boolean}
 */
function isYearCorrect(yearInput) {
  const currectYear = new Date().getFullYear();
  return yearInput < currectYear;
}

/**
 * Displays the error for a given display of each errors.
 */
function errorDisplay(dayError, dayDisplay, monthError, monthDisplay, yearError, yearDisplay) {
  dayError.style.display = dayDisplay;
  monthError.style.display = monthDisplay;
  yearError.style.display = yearDisplay;
}

/**
 * Given a birthday it calculates the age of a user. Return an object containg years, months and days.
 * 
 * @param {number} dayInput 
 * @param {number} monthInput 
 * @param {number} yearInput 
 */
function calculateAge(dayInput, monthInput, yearInput) {
  const birthday = new Date(`${yearInput}-${monthInput}-${dayInput}`);
  const currentDate = new Date();

  const timeDiff = currentDate - birthday;

  // Calculate the number of milliseconds in a year, month, and day
  const millisecondsPerYear = 365.25 * 24 * 60 * 60 * 1000;
  const millisecondsPerMonth = (365.25 / 12) * 24 * 60 * 60 * 1000;
  const millisecondsPerDay = 24 * 60 * 60 * 1000;

  const years = Math.floor(timeDiff / millisecondsPerYear);
  const months = Math.floor((timeDiff % millisecondsPerYear) / millisecondsPerMonth);
  const days = Math.floor((timeDiff % millisecondsPerMonth) / millisecondsPerDay);

  return {
    years: years,
    months: months,
    days: days
  };
}

calculateButton.addEventListener('click', () => {
  const dayInput = Number(document.getElementById('day-input').value);
  const monthInput = Number(document.getElementById('month-input').value);
  const yearInput = Number(document.getElementById('year-input').value);

  const daySpan = document.getElementById('days');
  const monthSpan = document.getElementById('months');
  const yearSpan = document.getElementById('years');

  const dayError = document.querySelector('.day-error');
  const monthError = document.querySelector('.month-error');
  const yearError = document.querySelector('.year-error');

  if (isMonthCorrect(monthInput) && isYearCorrect(yearInput) && isDayCorrect(dayInput, monthInput, yearInput)) {
    const age = calculateAge(dayInput, monthInput, yearInput);

    localStorage.setItem('dayInput', dayInput);
    localStorage.setItem('monthInput', monthInput);
    localStorage.setItem('yearInput', yearInput);
    localStorage.setItem('age', JSON.stringify(age));

    daySpan.innerText = age.days;
    monthSpan.innerText = age.months;
    yearSpan.innerText = age.years;

    errorDisplay(dayError, 'none', monthError, 'none', yearError, 'none');
  } else {
    if (!isDayCorrect(dayInput, monthInput, yearInput)) {
      dayError.innerText = 'Must be a valid date';
      errorDisplay(dayError, 'block', monthError, 'none', yearError, 'none');
    } else if (!isMonthCorrect(monthInput)) {
      monthError.innerText = 'Place a valid month';
      errorDisplay(dayError, 'none', monthError, 'block', yearError, 'none');
    } else if (!isYearCorrect(yearInput)) {
      yearError.innerText = 'Place a valid year';
      errorDisplay(dayError, 'none', monthError, 'none', yearError, 'block');
    }
  }
})

inputs.forEach((input, index) => {
  input.addEventListener('keydown', (event) => {
    if (event.keyCode === 39) {
      event.preventDefault();

      const nextIndex = index + 1;
      if (nextIndex < inputs.length) {
        inputs[nextIndex].focus();
      }
    }
  })
})

/**
 * Displays data store in localStorage.
 */
function storeAfterReload() {
  const dayInput = document.getElementById('day-input');
  const monthInput = document.getElementById('month-input');
  const yearInput = document.getElementById('year-input');

  const daySpan = document.getElementById('days');
  const monthSpan = document.getElementById('months');
  const yearSpan = document.getElementById('years');

  const age = JSON.parse(localStorage.getItem('age'));

  dayInput.value = localStorage.getItem('dayInput');
  monthInput.value = localStorage.getItem('monthInput');
  yearInput.value = localStorage.getItem('yearInput');

  daySpan.innerText = age.days;
  monthSpan.innerText = age.months;
  yearSpan.innerText = age.years;
}

storeAfterReload();