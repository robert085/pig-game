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
current0El.textContent = 0;
current1El.textContent = 0;

// must be outside of the function otherwise iteration would pass over
let currentScore = 0;
// scores will be stored into array, so the active player has a value of 0.
const scores = [0, 0]; // array in which we will store player's scores
let activePlayer = 0;

// STARTING CONDITIONS
score0El.textContent = 0;
score1El.textContent = 0;
diceEl.classList.add('hidden');

// function SWITCH PLAYER
const switchPlayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  currentScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0; //switch player
  player0El.classList.toggle('player--active');
  player1El.classList.toggle('player--active');
};

// STARTING CONDITIONS
btnRoll.addEventListener('click', function () {
  // 1. GENERATE RANDOM ROLL
  const dice = Math.trunc(Math.random() * 6) + 1;
  console.log(dice);

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
});

btnHold.addEventListener('click', function () {
  // 1. ADD CURRENT SCORE TO ACTIVE PLAYER's SCORE
  scores[activePlayer] += currentScore;
  document.getElementById(`score--${activePlayer}`).textContent =
    scores[activePlayer];

  // 2. CHECK IF PLAYERS SCORE IS AT LEAST >= 100
  let scoreActivePlayer = (document.getElementById(
    `score--${activePlayer}`
  ).textContent = scores[activePlayer]);

  //  finish the game

  //  switch to next player

  switchPlayer();
});
