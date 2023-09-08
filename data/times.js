let timesList = JSON.parse(localStorage.getItem('timesList')) || [];

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
