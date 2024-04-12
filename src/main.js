let repeat;
let duration;

const setValues = () => {
  repeat = document.getElementById('repetitions').value;
  duration = document.getElementById('duration').value;
};

document.getElementById('submit').addEventListener(onclick, () => {
  setValues();
});

document.getElementById('start').addEventListener(onclick, () => {
  for (let i = 0; i < repeat; i += 1) {
    window.vibrate(duration);
  }
});
