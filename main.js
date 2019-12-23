let started = false;
let hour, minute, second, timer, interval;
let finished = false;

// Define elements
let button = document.querySelector('.button');
let elementHour = document.querySelector('#hour');
let elementMinute = document.querySelector('#minute');
let elementSecond = document.querySelector('#second');

// output of timer values
var hours, minutes, seconds;

button.addEventListener('click', e => {
  getValues(); // Getting values

  if (!started) { // Started
    started = true;
    button.innerText = "Stop";
    if (!finished) startInterval(); // Starting interval
    else { // Finished
      console.log('Finished.');
      clearInterval(interval);
    }
  }

  else { // Stopped
    started = false;
    button.innerText = 'Start';
    clearInterval(interval); // Stopping interval
  }

  disableElements(); // When timer's started and stopped, it's changing enable status.
});

disableElements = () => {
  if (started) {
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

// Algorithm for miliseconds to second, minute, hour.
parseValues = () => {
  seconds = parseInt((timer / 1000) % 60).toFixed(0);
  minutes = parseInt(((timer / (1000 * 60)) % 60)).toFixed(0);
  hours = parseInt(((timer / (1000 * 60 * 60)) % 24)).toFixed(0);

  if (hours < 1) hours = 0;
  if (minutes < 1) minutes = 0;
  if ((hours < 0 && minutes < 0 && seconds < 0) || (hours == 0 && minutes == 0 && seconds == 0)) {
    finished = true;
    clearInterval(interval);
    console.log('Finished!');
  }

  addZero(); // Adding zero for 1 decimal values
  setInputs(); // Setting inputs
  console.log(seconds + "saniye " + minutes + " dakika" + hours + " saat");
}

setInputs = () => {
  elementHour.value = hours;
  elementMinute.value = minutes;
  elementSecond.value = seconds;
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