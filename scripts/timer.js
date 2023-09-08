function ao5() {
  let best = timesList[timesList.length - 1]; let worst = timesList[timesList.length - 1];
  let bestIndex = 1;
  let worstIndex = 1;
  let currentTime;
  let sum = 0;
  if(timesList.length >= 5) {
    for(let i = 2; i <= 5; i++) {
      currentTime = timesList[timesList.length - i];
      if(currentTime < best) {
        best = currentTime;
        bestIndex = i;
      } else if(currentTime > worst) {
        worst = currentTime;
        worstIndex = i;
      }
    }

    for(let i = 1; i <= 5; i++) {
      currentTime = timesList[timesList.length - i];
      if(i === bestIndex || i === worstIndex) {
        continue;
      }
      sum += currentTime;
    }
    if(sum > 18000) {
      return `${(sum / 3) % 6000}:${(sum / 300).toFixed(2)}`;
    } else {
      return `${(sum / 300).toFixed(2)}`;
    }
  }
  return '';
}

function ao12() {
  let best = timesList[timesList.length - 1]; let worst = timesList[timesList.length - 1];
  let bestIndex = 1;
  let worstIndex = 1;
  let currentTime;
  let sum = 0;
  if(timesList.length >= 12) {
    for(let i = 2; i <= 12; i++) {
      currentTime = timesList[timesList.length - i];
      if(currentTime < best) {
        best = currentTime;
        bestIndex = i;
      } else if(currentTime > worst) {
        worst = currentTime;
        worstIndex = i;
      }
    }

    for(let i = 1; i <= 12; i++) {
      currentTime = timesList[timesList.length - i];
      if(i === bestIndex || i === worstIndex) {
        continue;
      }
      sum += currentTime;
    }
    if(sum > 10 * 6000) {
      return `${(sum / 10) % 6000}:${(sum / 1000).toFixed(2)}`;
    } else {
      return `${(sum / 1000).toFixed(2)}`;
    }
  }
  return '';
}

function ao25() {
  let best = timesList[timesList.length - 1]; let worst = timesList[timesList.length - 1];
  let bestIndex = 1;
  let worstIndex = 1;
  let currentTime;
  let sum = 0;
  if(timesList.length >= 25) {
    for(let i = 2; i <= 25; i++) {
      currentTime = timesList[timesList.length - i];
      if(currentTime < best) {
        best = currentTime;
        bestIndex = i;
      } else if(currentTime > worst) {
        worst = currentTime;
        worstIndex = i;
      }
    }

    for(let i = 1; i <= 25; i++) {
      currentTime = timesList[timesList.length - i];
      if(i === bestIndex || i === worstIndex) {
        continue;
      }
      sum += currentTime;
    }
    if(sum > 23 * 6000) {
      return `${(sum / 23) % 6000}:${(sum / 2300).toFixed(2)}`;
    } else {
      return `${(sum / 2300).toFixed(2)}`;
    }
  }
  return '';
}

function ao100() {
  let currentTime;
  let sum = 0;
  if(timesList.length >= 100) {
    let copy = [];
    for(let i = 0; i < 100; i++) {
      copy[i] = timesList[timesList.length - i - 1];
    }

    copy.sort((a, b) => a - b);

    for(let i = 5; i <= 95; i++) {
      sum += copy[i];
    }

    if(sum > 100 * 6000) {
      return `${(sum / 90) % 6000}:${(sum / 9000).toFixed(2)}`;
    } else {
      return `${(sum / 9000).toFixed(2)}`;
    }
  }
  return ' ';
}

function displayTimes() {
  let timesListHTML = '';
  for(let i = 1; i <= 5; i++) {
    if(timesList.length >= i) {
      let currentTime = timesList[timesList.length - i];
      if(currentTime < 6000) {
        timesListHTML += `
          <div class="time">
            <span class="time-span">
              ${`
              ${(currentTime / 100).toFixed(2)}
              `}
              <button class="delete-button js-delete-button" data-index="${i}">&#215;</button>
            </span>
          </div>
        `;
      } else {
        timesListHTML += `
            <div class="time">
            <span class="time-span">
              ${`
              ${Math.floor(currentTime / 6000)}:${((currentTime % 6000) / 100).toFixed(2)}
              `}</span>
              <button class="delete-button js-delete-button" data-index="${i}">&#215;</button>
            </div>
          `;
      } 
    }
  }
  document.querySelector('.js-times-list').innerHTML = timesListHTML;

  document.querySelector('.js-average-container').innerHTML = `
    <span>ao5: ${ao5()}</span>
    <span>ao12: ${ao12()}</span>
    <span>ao25: ${ao25()}</span>
    <span>ao100: ${ao100()}</span>
  `;

  document.querySelectorAll('.js-delete-button').forEach((button) => {
    button.addEventListener('click', () => {
      deleteTime(button.dataset.index);
    });
  });

}

function checkAndReady(e) {
    if(e.key === ' ') {
      readyTimer();
    }
}

function checkAndStart(e) {
  if(e.key === ' ') {
    startTimer();
  }
}

function checkAndStop(e) {
  if(e.key === ' ') {
    clearInterval(timerId);
    timesList.push(time);
    localStorage.setItem('timesList', JSON.stringify(timesList));

    displayTimes();

    document.querySelector('.js-times-list').classList.remove('hidden');
    document.querySelector('.js-average-container').classList.remove('hidden');
    document.querySelector('.js-timer').classList.remove('bigger-font');

    document.body.removeEventListener('keypress', checkAndStop);
    
    setTimeout(() => {
      document.body.addEventListener('keydown', checkAndReady);
      document.body.addEventListener('keyup', checkAndStart); 
    }, 1000); 
  }
}

function readyTimer() {
  document.querySelector('.js-timer').classList.add('border');
  time = 0;
}

function startTimer() {
  document.querySelector('.js-timer').classList.remove('border');
  document.querySelector('.js-times-list').classList.add('hidden');
  document.querySelector('.js-average-container').classList.add('hidden');

  let timer = document.querySelector('.js-timer');
  timer.classList.add('bigger-font');

  document.body.removeEventListener('keydown', checkAndReady);
  document.body.removeEventListener('keyup', checkAndStart);

  document.body.addEventListener('keypress', checkAndStop);

  timerId = setInterval(() => {
    time++;
    if(time < 6000) {
      timer.innerHTML = `${(time / 100).toFixed(2)}`;
    } else {
      timer.innerHTML = `${Math.floor(time / 6000)}:${((time % 6000) / 100).toFixed(2)}
      `;
    }
  }, 10);
}

function deleteTime(i) {
  timesList.splice(timesList.length - i, 1);
  displayTimes();
  localStorage.setItem('timesList', JSON.stringify(timesList));
}

displayTimes();

let time;
let timerId;

document.body.addEventListener('keydown', checkAndReady);
document.body.addEventListener('keyup', checkAndStart);

ao100();
