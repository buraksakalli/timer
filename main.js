let started = false;
let hour, minute, second, timer, interval;
let finished = false;
let button = document.querySelector('.button');
let elementHour = document.querySelector('#hour');
let elementMinute = document.querySelector('#minute');
let elementSecond = document.querySelector('#second');

var hours, minutes, seconds;
button.addEventListener('click', e => {
  getValues();
  console.log(second);
  if (!started) { // Started
    started = true;
    button.innerText = "Stop";
    if (!finished) startInterval();
    else { console.log('bitti'); }
  }
  else { // Stopped
    started = false;
    button.innerText = 'Start';
    clearInterval(interval);
  }
  
  disableElements();
});

disableElements = () => {
  if(started){
    elementHour.disabled = true;
    elementMinute.disabled = true;
    elementSecond.disabled = true;
  } else {
    elementHour.disabled = false;
    elementMinute.disabled = false;
    elementSecond.disabled = false;
  }
  
}

getValues = () => {
  hour = elementHour.value;
  minute = elementMinute.value;
  second = elementSecond.value;
}

parseValues = () => {
  seconds = parseInt((timer / 1000) % 60).toFixed(0);
  minutes = parseInt(((timer / (1000 * 60)) % 60)).toFixed(0);
  if (minutes < 1) minutes = 0;
  hours = parseInt(((timer / (1000 * 60 * 60)) % 24)).toFixed(0);
  if (hours < 1) hours = 0;
  if ((hours < 0 && minutes < 0 && seconds < 0) || (hours == 0 && minutes == 0 && seconds == 0)) {
    console.log('bitti!');
    finished = true;
    clearInterval(interval);
  }
  addZero();
  elementHour.value = hours;
  elementMinute.value = minutes;
  elementSecond.value = seconds;
  console.log(seconds + "saniye " + minutes + " dakika" + hours + " saat");
}

startInterval = () => {
  timer = (second * 1000 + minute * 60000 + hour * 3600000);
  interval = setInterval(() => {
    timer -= 1000;
    parseValues();
  }, 1000);
}

addZero = () => {
  if (hours < 10) hours = "0" + hours;
  if (minutes < 10) minutes = "0" + minutes;
  if (seconds < 10) seconds = "0" + seconds;
}