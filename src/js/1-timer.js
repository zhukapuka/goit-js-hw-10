import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    const selectedDate = selectedDates[0];
    const startButton = document.querySelector('[data-start]');
    if (selectedDate < new Date()) {
      iziToast.error({
        title: 'Error',
        message: 'Please choose a date in the future',
        position: 'topRight',
      });
      startButton.disabled = true;
    } else {
      startButton.disabled = false;
    }
    userSelectedDate = selectedDate;
  },
};
let userSelectedDate;
const datetimePicker = document.querySelector('#datetime-picker');
const startButton = document.querySelector('[data-start]');
const daysElement = document.querySelector('[data-days]');
const hoursElement = document.querySelector('[data-hours]');
const minutesElement = document.querySelector('[data-minutes]');
const secondsElement = document.querySelector('[data-seconds]');
startButton.disabled = true;
flatpickr(datetimePicker, options);
function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;
  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);
  return { days, hours, minutes, seconds };
}
function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}
function updateTimer(endTime) {
  const now = new Date();
  const timeLeft = endTime - now;
  if (timeLeft <= 0) {
    clearInterval(timerInterval);
    datetimePicker.disabled = false;
    startButton.disabled = true;
    updateInterface({ days: 0, hours: 0, minutes: 0, seconds: 0 });
    return;
  }
  const time = convertMs(timeLeft);
  updateInterface(time);
}
function updateInterface({ days, hours, minutes, seconds }) {
  daysElement.textContent = addLeadingZero(days);
  hoursElement.textContent = addLeadingZero(hours);
  minutesElement.textContent = addLeadingZero(minutes);
  secondsElement.textContent = addLeadingZero(seconds);
}
let timerInterval;
startButton.addEventListener('click', () => {
  if (!userSelectedDate) return;
  datetimePicker.disabled = true;
  startButton.disabled = true;
  updateTimer(userSelectedDate);
  timerInterval = setInterval(() => updateTimer(userSelectedDate), 1000);
});
