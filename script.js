window.addEventListener('DOMContentLoaded', (event) => {
  populateDays(monthSelect.value);
  populateYears();
});

/*  FROM HERE TO LINE 78
ALL CREDITS GO TO THE MDN:
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
    const year = yearSelect.value;
    const isLeap = new Date(year, 1, 29).getMonth() === 1;
    dayNum = isLeap ? 29 : 28;
  }

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

submit.addEventListener("click", compareDates);

function compareDates(event) {
  const result = document.querySelector(".result");
  const resultBox = document.querySelector(".result-box");

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

  if (diffDays < 0) {
    diffMonths--;
    diffDays = days_in_months[last_month] + diffDays;
  };

  if (diffMonths < 0) {
    diffYears--;
    diffMonths = 12 + diffMonths;
  }
  
  result.style.color = "#ffffff";
  resultBox.style.border = "1px solid #767676";
  resultBox.style.background = "#2b2b2b";
  result.innerText = `Calculating...`
  
  setTimeout(()=> {
  
    switch(true) {
      case diffYears == -1:
        resultBox.style.border = "1px solid #ff0000";
        resultBox.style.background = "rgba(255, 0, 0, 0.2)";
        result.innerText = `Enter a date that lies in the past.`;
        break;
      case diffYears == 0:
        if (diffMonths == 0) {
          if (diffDays == 1) {
            result.innerText = `It's been ${diffDays} day.`;
          } else if (diffDays > 1) {
            result.innerText = `It's been ${diffDays} days.`;
          } else {
            result.innerText = `That's today! Please enter another date.`;
          };
        } else if (diffMonths > 1) {
          if (diffDays == 1) {
            result.innerText = `It's been ${diffMonths} months and ${diffDays} day.`;
          } else if (diffDays > 1) {
            result.innerText = `It's been ${diffMonths} months and ${diffDays} days.`;
          } else {
            result.innerText = `It's been ${diffMonths} months.`;
          }
        } else {
          if (diffDays == 1) {
            result.innerText = `It's been ${diffMonths} month and ${diffDays} day.`;
          } else if (diffDays > 1) {
            result.innerText = `It's been ${diffMonths} month and ${diffDays} days.`;
          } else {
            result.innerText = `It's been ${diffMonths} month.`;
          }
        }
        break;
      case diffYears == 1:
        if (diffMonths == 0) {
          if (diffDays == 1) {
            result.innerText = `It's been ${diffYears} year and ${diffDays} day.`;
          } else if (diffDays > 1) {
            result.innerText = `It's been ${diffYears} year and ${diffDays} days.`;
          } else {
            result.innerText = `It's been exactly ${diffYears} year.`;
          };
        } else if (diffMonths > 1) {
          if (diffDays == 1) {
            result.innerText = `It's been ${diffYears} year, ${diffMonths} months and ${diffDays} day.`;
          } else if (diffDays > 1) {
            result.innerText = `It's been ${diffYears} year, ${diffMonths} months and ${diffDays} days.`;
          } else {
            result.innerText = `It's been ${diffYears} year and ${diffMonths} months.`;
          }
        } else {
          if (diffDays == 1) {
            result.innerText = `It's been ${diffYears} year, ${diffMonths} month and ${diffDays} day.`;
          } else if (diffDays > 1) {
            result.innerText = `It's been ${diffYears} year, ${diffMonths} month and ${diffDays} days.`;
          } else {
            result.innerText = `It's been ${diffYears} year and ${diffMonths} month.`;
          }
        }
        break;
      case diffMonths == 0:
        if (diffDays == 1) {
          result.innerText = `It's been ${diffYears} years and ${diffDays} day.`;
        } else if (diffDays > 1) {
          result.innerText = `It's been ${diffYears} years and ${diffDays} days.`;
        } else {
          result.innerText = `It's been exactly ${diffYears} years.`;
        }
        break;
      case diffDays == 0:
        if (diffMonths == 1) {
          result.innerText = `It's been ${diffYears} years and ${diffMonths} month.`;
        } else {
          result.innerText = `It's been ${diffYears} years and ${diffMonths} months.`;
        }
        break;
      case diffDays == 1:
        result.innerText = `It's been ${diffYears} years, ${diffMonths} months and ${diffDays} day.`;
        break;
      default:
        result.innerText = `It's been ${diffYears} years, ${diffMonths} months and ${diffDays} days.`;  
    }
  }, 1000);

  // switch(diffYears) {
  //   case 0:
  //     result.innerText = `It's been ${diffMonths} months and ${diffDays} days.`;
  //     break;
  //   case 1:
  //     result.innerText = `It's been ${diffYears} year, ${diffMonths} months and ${diffDays} days.`;
  //     break;
  //   default:
  //     result.innerText = `It's been ${diffYears} years, ${diffMonths} months and ${diffDays} days.`;  
  // }

  // result.innerText = `It's been ${diffYears} years, ${diffMonths} months and ${diffDays} days.`;

  event.preventDefault();
};


