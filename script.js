'use strict';
window.addEventListener('DOMContentLoaded', () => {

  const start = document.querySelector('.btn'),
    promotion = document.querySelector('.promotion');

  start.addEventListener('click', (event) => {

    start.remove();
    const stop = document.createElement('div');
    stop.classList.add('btn');
    stop.innerHTML = 'Stop!';
    promotion.append(stop);

    const setDays = document.querySelector('#days'),
      setHours = document.querySelector('#hours'),
      setMinutes = document.querySelector('#minutes'),
      setSeconds = document.querySelector('#seconds'),
      endTimer = Date.parse(new Date()) + setDays.value * 24 * 60 * 60 * 1000 + setHours.value * 60 * 60 * 1000 + setMinutes.value * 60 * 1000 + setSeconds.value * 1000;

    function changeInputOnDiv(input, id, info) {
      input.parentElement.innerHTML = `<div class="input" id="${id}">${input.value}</div>${info}`;
    }
    function changeDivOnInput(div, id, ph, info) {
      div.parentElement.innerHTML = `<input class="input" id="${id}" type="number" min="0" max="${ph}" step="1">${info}`;
    }

    changeInputOnDiv(setDays, 'days', 'дней');
    changeInputOnDiv(setHours, 'hours', 'часов');
    changeInputOnDiv(setMinutes, 'minutes', 'минут');
    changeInputOnDiv(setSeconds, 'seconds', 'секунд');

    function getTimeRemaining(endtime) {
      const t = endtime - Date.parse(new Date()),
        days = Math.floor(t / (24 * 60 * 60 * 1000)),
        hours = Math.floor((t / (60 * 60 * 1000)) % 24),
        minutes = Math.floor((t / (60 * 1000)) % 60),
        seconds = Math.floor((t / 1000) % 60);

      return {
        'total': t,
        'days': days,
        'hours': hours,
        'minutes': minutes,
        'seconds': seconds
      };
    }

    function getZero(num) {
      if (num >= 0 && num < 10) {
        return `0${num}`;
      } else {
        return num;
      }
    }

    function setClock(selector, endtime) {
      const timer = document.querySelector(selector),
        days = timer.querySelector('#days'),
        hours = timer.querySelector('#hours'),
        minutes = timer.querySelector('#minutes'),
        seconds = timer.querySelector('#seconds'),
        timeInterval = setInterval(updateClock, 1000);

      function stopTimer() {
        clearInterval(timeInterval);

        changeDivOnInput(days, 'days', 365, 'дней');
        changeDivOnInput(hours, 'hours', 24, 'часов');
        changeDivOnInput(minutes, 'minutes', 60, 'минут');
        changeDivOnInput(seconds, 'seconds', 60, 'секунд');
        stop.remove();
        promotion.append(start);
      }

      stop.addEventListener('click', (event) => {
        stopTimer();
      });

      updateClock();
      function updateClock() {
        const t = getTimeRemaining(endtime);

        days.innerHTML = getZero(t.days);
        hours.innerHTML = getZero(t.hours);
        minutes.innerHTML = getZero(t.minutes);
        seconds.innerHTML = getZero(t.seconds);

        if (t.total <= 0) {
          stopTimer();
        }
      }
    }

    setClock('.timer', endTimer);
  });
});
