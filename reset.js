window.addEventListener('DOMContentLoaded', (event) => {
    populateDays(monthSelect.value);
    populateYears();
  });
  
  /*  FROM HERE TO LINE 80:
  ALL CREDITS GO TO THE MDN
  https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/date */
  
  const yearSelect = document.querySelector('#year');
  const monthSelect = document.querySelector('#month');
  const daySelect = document.querySelector('#day');
  
  function populateDays(month) {
    while (daySelect.firstChild) {
      daySelect.removeChild(daySelect.firstChild);
    }
  
    let dayNum;
  
    // 31 or 30 days?
    if (['January', 'March', 'May', 'July', 'August', 'October', 'December'].includes(month)) {
      dayNum = 31;
    } else if (['April', 'June', 'September', 'November'].includes(month)) {
      dayNum = 30;
    } else {
      // If month is February, calculate whether it is a leap year or not
      const year = yearSelect.value;
      const isLeap = new Date(year, 1, 29).getMonth() === 1;
      dayNum = isLeap ? 29 : 28;
    }
  
    // inject the right number of new <option> elements into the day <select>
    for (let i = 1; i <= dayNum; i++) {
      const option = document.createElement('option');
      option.textContent = i;
      daySelect.appendChild(option);
    }
  
    if (previousDay) {
      daySelect.value = previousDay;
  
    if (daySelect.value === "") {
        daySelect.value = previousDay - 1;
      }
  
    if (daySelect.value === "") {
        daySelect.value = previousDay - 2;
      }
  
    if (daySelect.value === "") {
        daySelect.value = previousDay - 3;
      }
    }
  }
  
  function populateYears() {
    const date = new Date();
    const year = date.getFullYear();
  
    for (let i = 0; i <= 100; i++) {
      const option = document.createElement('option');
      option.textContent = year - i;
      yearSelect.appendChild(option);
    }
  }
  
  yearSelect.onchange = () => {
    populateDays(monthSelect.value);
  }
  
  monthSelect.onchange = () => {
    populateDays(monthSelect.value);
  }
  
  let previousDay;
  
  daySelect.onchange = () => {
    previousDay = daySelect.value;
  }
  /* =============================================*/
  
  const submit = document.querySelector("button[type=submit]");
  const result = document.querySelector(".result");
  
  submit.addEventListener("click", compareDates);
  
  function compareDates(event) {
    const year = yearSelect.value;
    const month_name = monthSelect.value;
    const day = daySelect.value;
  
    const months_array = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  
    let month;
  
    for (i = 0; i < months_array.length; i++) {
      month = months_array.indexOf(month_name);
    } 
    
    const today = new Date();
    // const today = new Date(2022, 10, 17);
    let this_year = today.getFullYear();
    let this_month = today.getMonth();
    let this_date = today.getDate();
  
    let last_month = this_month - 1;
    if (last_month < 0) {
      last_month = 11;
    }
  
    let diffYears = this_year - year;
    let diffMonths = this_month - month;
    let diffDays = this_date - day;
  
    let days_in_months = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  
    if ((this_year % 4 === 0) && (this_year % 100 !== 0) || (this_year % 400 === 0)) {
        days_in_months[1] = 29;
    }
  
    let days_left = days_in_months[last_month] + diffDays;
  
  if (diffMonths > 0) {
      if (diffDays > 0) {
        if (diffDays > 1) {
          if (diffMonths > 1) {
              if (diffYears == 1) {
                  result.innerText = `It's been ${diffYears} year, ${diffMonths} months and ${diffDays} days.`;
              } else { 
                  result.innerText = `It's been ${diffYears} years, ${diffMonths} months and ${diffDays} days.`;
              }
          } else { /* diffyears == 1 */
              result.innerText = `It's been ${diffYears} years, one month and ${diffDays} days.`;
              console.log(`The difference is ${diffYears} years, ${diffMonths} month and ${diffDays} days.`)
          }
        } else {
          if (diffMonths > 1) {
              result.innerText = `It's been ${diffYears} years, ${diffMonths} months and one day.`;
              console.log(`The difference is ${diffYears} years, ${diffMonths} months and ${diffDays} day.`)
          } else {
              result.innerText = `It's been ${diffYears} years, one month en one day.`;
              console.log(`The difference is ${diffYears} years, ${diffMonths} month and ${diffDays} day.`)
          }
        }  
      } else if (diffDays == 0) {
        if (diffMonths > 1) {
          result.innerText = `It's been ${diffYears} years and ${diffMonths} months.`;
          console.log(`The difference is ${diffYears} years and exactly ${diffMonths} months.`)
        } else {
          result.innerText = `It's been ${diffYears} years and one month.`;
          console.log(`The difference is ${diffYears} years and exactly ${diffMonths} month.`)
        }
      } else {
        let diffMonths_new = diffMonths - 1;
        if (diffMonths_new == 0) {
          result.innerText = `It's been ${diffYears} years and ${days_left} days.`;
          console.log(`The difference is ${diffYears} years and ${days_left} days.`)
        } else if (diffMonths_new == 1) {
          result.innerText = `It's been ${diffYears} years, one month and ${days_left} days.`;
          console.log(`The difference is ${diffYears} years, ${diffMonths_new} month and ${days_left} days.`)
        } else {
          result.innerText = `TEST 5 It's been ${diffYears} years, ${diffMonths_new} months and ${days_left} days.`;
          console.log(`The difference is ${diffYears} years, ${diffMonths_new} months and ${days_left} days.`)
        }
      } 
    } else if (diffMonths < 0) {
        diffYears--;
        let diffMonths_new = 12 + diffMonths;
        if (diffDays == 0) {
          result.innerText = `It's been ${diffYears} years and ${diffMonths_new} months.`;
          console.log(`The difference is ${diffYears} years and exactly ${diffMonths_new} months.`)
        } else if (diffDays < 0) {
          diffMonths_new--;
          result.innerText = `TEST2 It's been ${diffYears} years, ${diffMonths_new} months and ${days_left} days.`;
          console.log(`The difference is ${diffYears} years, ${diffMonths_new} months and ${days_left} days.`)
        } else {
          if (diffDays > 1) {
              result.innerText = `TEST3 It's been ${diffYears} years, ${diffMonths_new} months and ${diffDays} days.`;
              console.log(`The difference is ${diffYears} years, ${diffMonths_new} months and ${diffDays} days.`);
        } else {
              result.innerText = `It's been ${diffYears} years, ${diffMonths_new} months and one day.`;
              console.log(`The difference is ${diffYears} years, ${diffMonths_new} months and ${diffDays} day.`)
        }
      }
    } else if (diffMonths == 0) {
        if (diffDays > 0) {
          if (diffDays > 1) {
              result.innerText = `It's been ${diffYears} years and ${diffDays} days.`;
            console.log(`The difference is ${diffYears} years and ${diffDays} days.`) 
          } else {
              result.innerText = `It's been ${diffYears} years and one day.`;
            console.log(`The difference is ${diffYears} years and ${diffDays} day.`)
          }
        } else if (diffDays < 0) {
          diffYears--;
          let diffMonths_new = 11;
          result.innerText = `TEST4 It's been ${diffYears} years, ${diffMonths_new} months and ${days_left} days.`;
          console.log(`The difference is ${diffYears} years, ${diffMonths_new} months and ${days_left} days.`)
        } else {
          result.innerText = `It's been exactly ${diffYears} years!`;
      }
    };
  
    event.preventDefault();
  };
  
  
  