let repeat;
let duration;

const setValues = () => {
  repeat = document.getElementById('repetitions').value;
  duration = document.getElementById('duration').value;
};

document.getElementById('submit').addEventListener(onclick, () => {
  setValues();
});
