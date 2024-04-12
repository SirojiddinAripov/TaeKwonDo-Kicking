let repeat;
let duration;

const setValues = () => {
  repeat = document.getElementById('repetitions').value;
  duration = document.getElementById('duration').value;
  alert(`${repeat} and ${duration}`);
};

document.getElementById('submit').addEventListener("click", () => {
  setValues();
});

document.getElementById('start').addEventListener("click", () => {
  for (let i = 0; i < repeat; i += 1) {
    window.vibrate(duration);
  }
});
