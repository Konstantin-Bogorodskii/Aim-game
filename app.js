const btnStart = document.querySelector('#start');
const screens = document.querySelectorAll('.screen');
const timeList = document.querySelector('#time-list');
const gameTime = document.querySelector('#time');
const board = document.querySelector('#board');
const gameResetBtn = document.querySelector('.game__reset');
const colors = ['#ffe925', '#63ff25', '#25ffa4', '#2583ff', '#7125ff', '#f12020'];
let score = 0;

btnStart.addEventListener('click', e => {
  e.preventDefault();
  screens[0].classList.add('screen-up');
});

timeList.addEventListener('click', event => {
  if (event.target.classList.contains('time-btn')) {
    clearGame();

    time = parseInt(event.target.getAttribute('data-time'));
    screens[1].classList.add('screen-up');
    gameResetBtn.style.display = 'none';

    startGame();
  }
});

board.addEventListener('click', event => {
  if (event.target.classList.contains('circle')) {
    score++;
    event.target.remove();
    createRandomCircle();
  }
});

gameResetBtn.addEventListener('click', event => {
  if (event.target.classList.contains('game__reset')) {
    screens[1].classList.remove('screen-up');
  }
});

function clearGame() {
  board.innerHTML = '';
  gameTime.parentNode.classList.remove('hide');
  score = 0;
}

function startGame() {
  setTime(time);
  createRandomCircle();
  let interval = setInterval(function decreaseTime() {
    if (time === 0) {
      finishGame();
      clearInterval(interval);
    } else {
      let current = --time;
      if (current < 10) {
        current = `0${current}`;
      }
      setTime(current);
    }
  }, 1000);
}

function setTime(value) {
  gameTime.innerHTML = `00:${value}`;
}

function finishGame() {
  gameTime.parentNode.classList.add('hide');
  board.innerHTML = `<h1>Cчет: <span class="primary">${score}</span></h1>`;
  gameResetBtn.style.display = 'inline-block';
}

function createRandomCircle() {
  const circle = document.createElement('div');
  const size = getRandomNumber(10, 60);
  const { width, height } = board.getBoundingClientRect();
  const x = getRandomNumber(0, width - size);
  const y = getRandomNumber(0, height - size);
  const color = getRandomColor();

  circle.classList.add('circle');
  circle.style.width = `${size}px`;
  circle.style.height = `${size}px`;
  circle.style.top = `${y}px`;
  circle.style.left = `${x}px`;
  circle.style.background = `${color}`;
  board.append(circle);
}

function getRandomNumber(min, max) {
  return Math.round(Math.random() * (max - min) + min);
}

function getRandomColor() {
  return colors[Math.floor(Math.random() * colors.length)];
}
