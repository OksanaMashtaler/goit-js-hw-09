import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const refs = {
  btnStart: document.querySelector('button'),
  inputCalendar: document.querySelector('input'),
  days: document.querySelector('span[data-days]'),
  hours: document.querySelector('span[data-hours]'),
  minutes: document.querySelector('span[data-minutes]'),
  seconds: document.querySelector('span[data-seconds]'),
};

// Об'єкт для властивостей бібліотеки flatpickr
const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (selectedDates[0] > options.defaultDate) {
      refs.btnStart.disabled = '';
      start = selectedDates[0].getTime();
      // Слухач для кнопки
      refs.btnStart.addEventListener('click', onBtnStartClick);
    } else {
      Notify.warning('Please choose a date in the future');
      console.log('старт відхилено не вірно вказана дата');
    }
  },
};

// ініціалізація flatpickr в проекті
flatpickr('#datetime-picker', options);

// При кліку по кнопці запускаю таймер
function onBtnStartClick() {
  timer.start(start);
  // роблю не активним старт після запуску таймера
  refs.btnStart.disabled = 'disabled';
}
// Створила клас таймер для підрахунку часу
class Timer {
  constructor({ onTick }) {
    this.intervalID = null;
    this.isActive = false;
    this.onTick = onTick;
  }
  // функція старт таймера
  start(startTime) {
    if (this.isActive) {
      return;
    }
    this.isActive = true;

    this.intervalID = setInterval(() => {
      const currentTime = Date.now();
      const deltaTime = startTime - currentTime;
      const timerTime = this.convertMs(deltaTime);
      console.log(timerTime);
      if (deltaTime < 1000) {
        clearInterval(this.intervalID);
        this.isActive = false;
      }
      this.onTick(timerTime);
    }, 1000);
  }
  // функція, яка форматує дату до формату хх:хх:хх
  addLeadingZero(value) {
    return String(value).padStart(2, '0');
  }

  convertMs(ms) {
    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;

    const days = this.addLeadingZero(Math.floor(ms / day));
    const hours = this.addLeadingZero(Math.floor((ms % day) / hour));
    const minutes = this.addLeadingZero(
      Math.floor(((ms % day) % hour) / minute)
    );
    const seconds = this.addLeadingZero(
      Math.floor((((ms % day) % hour) % minute) / second)
    );

    return { days, hours, minutes, seconds };
  }
}
// Створила екземпляр таймера
const timer = new Timer({
  onTick: updateClockFace,
});

// функція для роботи з візуалом
function updateClockFace({ days, hours, minutes, seconds }) {
  refs.days.textContent = `${days}`;
  refs.hours.textContent = `${hours}`;
  refs.minutes.textContent = `${minutes}`;
  refs.seconds.textContent = `${seconds}`;
}
