//Either constant or varied changes based on radio button input.
mode = 'constant';

//text fields so we don't have to grab them each time
const repeatText = document.getElementById('repetitions')
const durationText = document.getElementById('duration')
//pattern text
const patternText = document.getElementById('pattern')
//display pattern
const paragraph = document.getElementById('test')
//action buttons
const startBtn = document.getElementById('start')
const stopBtn = document.getElementById('stop')
//mode change buttons
const repeatRadioBtn = document.getElementById('repeatRadioBtn')
const variedRadioBtn = document.getElementById('variedRadioBtn')
//divisions to hide and unhide based on mode
const repeatTextForm = document.getElementById('constant')
const variedTextForm = document.getElementById('varied')

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
  switchButtonsState()
}
//Executes a list of ms given by user.
const executeVariedPattern = async (pattern) => {
  paragraph.innerHTML = ''
  for (const duration of pattern) {
    if (!runClock) { return }
    await delay(duration);
    paragraph.innerHTML += `${duration} `
  };
  switchButtonsState()
}
const switchButtonsState = () => {
  startBtn.disabled = !startBtn.disabled
  stopBtn.disabled = !stopBtn.disabled
}
//----add on click behaviors to the buttons.----
/**
 * Disables itself
 * Enables stop button
 * enables timer/clock to run
 * grabs values from text forms
 */
startBtn.addEventListener('click', () => {
  switchButtonsState()
  runClock = true
  setValues()
})
/**
 * Disables itself
 * Enables start button
 * Stops timer/clock
 */
stopBtn.addEventListener('click', () => {
  switchButtonsState()
  runClock = false
})
/**
 * Change mode to constant
 * Display the constant text form div
 * Hide the varied text form div
 */
repeatRadioBtn.addEventListener('click', () => {
  mode = 'constant'
  repeatTextForm.style.display = 'inline'
  variedTextForm.style.display = 'none'
})
/**
 * Change mode to varied
 * Display the varied text form div
 * Hide the varied text form div
 */
variedRadioBtn.addEventListener('click', () => {
  mode = 'varied'
  repeatTextForm.style.display = 'none'
  variedTextForm.style.display = 'inline'
})