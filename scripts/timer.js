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
    }, 300); 
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
