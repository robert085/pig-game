'use strict';

// SELECTING ELEMENTS
const player = document.querySelector('.player');
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');
const playerActive = document.querySelector('.player--active');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');
const diceEl = document.querySelector('.dice');
const score0El = document.getElementById('score--0');
const score1El = document.getElementById('score--1');
const current0El = document.getElementById('current--0');
const current1El = document.getElementById('current--1');

// when variables are scoped inside the function, they have to be defined outside so we can then reasign them in the function
let scores, currentScore, activePlayer, playing;

// STARTING CONDITIONS
const init = function () {
  scores = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  playing = true;

  current0El.textContent = 0;
  current1El.textContent = 0;
  score0El.textContent = 0;
  score1El.textContent = 0;

  diceEl.classList.add('hidden');
  player0El.classList.remove('player--winner');
  player1El.classList.remove('player--winner');
  player0El.classList.add('player--active');
  player1El.classList.remove('player--active');
};
init();

// function SWITCH PLAYER
const switchPlayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  currentScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0; //switch player
  player0El.classList.toggle('player--active');
  player1El.classList.toggle('player--active');
};

btnRoll.addEventListener('click', function () {
  if (playing) {
    // 1. GENERATE RANDOM ROLL
    const dice = Math.trunc(Math.random() * 6) + 1;

    // 2. DISPLAY DICE
    diceEl.classList.remove('hidden');
    diceEl.src = `dice-${dice}.png`;

    // 3. CHECK FOR ROLLED 1: if TRUE, switch to next player
    if (dice !== 1) {
      //   Add dice to the current score
      currentScore += dice; // currentScore = currentScore + dice;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      switchPlayer();
      //   Switch to the next player
      /* document.getElementById(`current--${activePlayer}`).textContent = 0;
      currentScore = 0;
      activePlayer = activePlayer === 0 ? 1 : 0; //switch player
      player0El.classList.toggle('player--active');
      player1El.classList.toggle('player--active'); */
    }
  }
});

btnHold.addEventListener('click', function () {
  if (playing) {
    // 1. ADD CURRENT SCORE TO ACTIVE PLAYER's SCORE
    scores[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];

    // 2. CHECK IF PLAYERS SCORE IS AT LEAST >= 100
    if (scores[activePlayer] >= 10) {
      playing = false;
      //  finish the game
      diceEl.classList.add('hidden');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
      //  switch to next player
    } else {
      switchPlayer();
    }
  }
});

btnNew.addEventListener('click', init);
