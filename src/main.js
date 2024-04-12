// Either constant or varied changes based on radio button input.
mode = 'constant';

// Text fields so we don't have to grab them each time.
const repeatText = document.getElementById('repetitions');
const durationText = document.getElementById('duration');
// Pattern text.
const patternText = document.getElementById('pattern');
// Display pattern.
const paragraph = document.getElementById('test');
// Action buttons.
const startBtn = document.getElementById('start');
const stopBtn = document.getElementById('stop');
// Mode change buttons.
const repeatRadioBtn = document.getElementById('repeatRadioBtn');
const variedRadioBtn = document.getElementById('variedRadioBtn');
// Divisions to hide and unhide based on mode.
const repeatTextForm = document.getElementById('constant');
const variedTextForm = document.getElementById('varied');

// Process used input and call according function to execute pattern.
const setValues = () => {
  if (mode === 'constant') {
    repeat = repeatText.value;
    duration = durationText.value;
    executeConstantPattern(repeat, duration);
  } else if (mode === 'varied') {
    pattern = patternText.value.split(', ');
    executeVariedPattern(pattern);
  }
};

// RunClock is global to be able to stop the functions by the press of a button.
runClock = true;

// Returns a promise which stops the execution of functions until time is out.
const delay = (ms) => {
  if (!runClock) { return; }
  return new Promise(resolve => setTimeout(resolve, ms));
};

// Executes the constant repeated pattern.
const executeConstantPattern = async (repeat, duration) => {
  paragraph.innerHTML = '';
  for (let i = 0; i < repeat; i += 1) {
    if (!runClock) { return; }
    await delay(duration);
    navigator.vibrate(duration);
    paragraph.innerHTML += `${duration} `;
  }
  switchButtonsState();
};

// Executes a list of ms given by user.
const executeVariedPattern = async (pattern) => {
  paragraph.innerHTML = '';
  for (const duration of pattern) {
    if (!runClock) { return; }
    await delay(duration);
    navigator.vibrate(duration);
    paragraph.innerHTML += `${duration} `;
  }
  switchButtonsState();
};

const switchButtonsState = () => {
  startBtn.disabled = !startBtn.disabled;
  stopBtn.disabled = !stopBtn.disabled;
};

//---- Add on click behaviors to the buttons. ----
/**
 * Disables itself.
 * Enables stop button.
 * Enables timer/clock to run.
 * Grabs values from text forms.
 */
startBtn.addEventListener('click', () => {
  switchButtonsState();
  runClock = true;
  setValues();
});

/**
 * Disables itself.
 * Enables start button.
 * Stops timer/clock.
 */
stopBtn.addEventListener('click', () => {
  switchButtonsState();
  runClock = false;
});

/**
 * Change mode to constant.
 * Display the constant text form div.
 * Hide the varied text form div.
 */
repeatRadioBtn.addEventListener('click', () => {
  mode = 'constant';
  repeatTextForm.style.display = 'inline';
  variedTextForm.style.display = 'none';
});

/**
 * Change mode to varied.
 * Display the varied text form div.
 * Hide the constant text form div.
 */
variedRadioBtn.addEventListener('click', () => {
  mode = 'varied';
  repeatTextForm.style.display = 'none';
  variedTextForm.style.display = 'inline';
});
