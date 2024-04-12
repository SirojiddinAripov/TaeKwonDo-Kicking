//Either constant or varied changes based on radio button input.
mode = 'varied';

//text fields so we don't have to grab them each time
const repeatText = document.getElementById('repetitions')
const durationText = document.getElementById('duration')
const patternText = document.getElementById('pattern')
const paragraph = document.getElementById('test')

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
runClock = true
const delay = (ms) => {
  if (!runClock) { return }
  return new Promise(resolve => setTimeout(resolve, ms));
}
const clearTimer = (timer) => { clearInterval(timer) }

const executeConstantPattern = async (repeat, duration) => {
  paragraph.innerHTML = '';
  for (let i = 0; i < repeat; i += 1) {
    paragraph.innerHTML += `${duration} `;
    await delay(duration);
  }
}

const executeVariedPattern = async (pattern) => {
  paragraph.innerHTML = ''
  for (const duration of pattern) {
    paragraph.innerHTML += `${duration} `
    await delay(duration);
  };
}


document.getElementById('start').addEventListener('click', () => {
  runClock = true
  setValues()
})
document.getElementById('stop').addEventListener('click', () => { runClock = false })
