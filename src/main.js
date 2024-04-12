//Either constant or varied changes based on radio button input.
mode = 'varied';

//text fields so we don't have to grab them each time
const repeatText = document.getElementById('repetitions')
const durationText = document.getElementById('duration')
const patternText = document.getElementById('pattern')
const paragraph = document.getElementById('test')
const startBtn = document.getElementById('start')
const stopBtn = document.getElementById('stop')

//process used input and call according function to execute pattern.
const setValues = () => {
  if (mode === 'constant') {
    repeat = repeatText.value;
    duration = durationText.value;
    executeConstantPattern(repeat, duration);
  } else if (mode === 'varied') {
    pattern = patternText.value.split(', ')
    executeVariedPattern(pattern)
  }
};
//runClock is global to be able to stop the functions by the press of a button.
runClock = true
//returns a promise which stops the execution of functions until time is out.
const delay = (ms) => {
  if (!runClock) { return }
  return new Promise(resolve => setTimeout(resolve, ms));
}
//Executes the constant repeated pattern.
const executeConstantPattern = async (repeat, duration) => {
  paragraph.innerHTML = '';
  for (let i = 0; i < repeat; i += 1) {
    if (!runClock) { return }
    paragraph.innerHTML += `${duration} `;
    await delay(duration);
  }
}
//Executes a list of ms given by user.
const executeVariedPattern = async (pattern) => {
  paragraph.innerHTML = ''
  for (const duration of pattern) {
    if (!runClock) { return }
    paragraph.innerHTML += `${duration} `
    await delay(duration);
  };
}
//add on click behaviors to the buttons.
startBtn.addEventListener('click', () => {
  startBtn.disabled = true
  stopBtn.disabled = false
  runClock = true
  setValues()
})
stopBtn.addEventListener('click', () => {
  startBtn.disabled = false
  stopBtn.disabled = true
  runClock = false
})
