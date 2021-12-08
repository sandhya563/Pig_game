"use strict";
// Get item  by Id and querySlecletor
const player0Element = document.querySelector(".player--0");
const player1Element = document.querySelector(".player--1");
const scroe0Element = document.querySelector("#score--0");
const scroe1Element = document.getElementById("score--1");
const current0Element = document.getElementById("current--0");
const current1Element = document.getElementById("current--1");

const diceElement = document.querySelector(".dice");
const btnnew = document.querySelector(".btn--new");
const btnroll = document.querySelector(".btn--roll");
const btnhold = document.querySelector(".btn--hold");

// varivle declaration
let scores, currentScore, activeplayer, playing;

// starting conditions and functions

// for replay game new button 
const init = function () {
  diceElement.classList.add("hidden");
  scores = [0, 0];
  currentScore = 0;
  activeplayer = 0;
  playing = true;
  scroe0Element.textContent = 0;
  scroe1Element.textContent = 0;
  current0Element.textContent = 0;
  current1Element.textContent = 0;
  player0Element.classList.remove("player--winner");
  player1Element.classList.remove("player--winner");
  player0Element.classList.add("player--active");
  player1Element.classList.remove("player--active");
};
init();

// Function for switchplayer
const switchPlayer = function () {
  document.getElementById(`current--${activeplayer}`).textContent = 0;
  currentScore = 0;
  activeplayer = activeplayer == 0 ? 1 : 0;
  player0Element.classList.toggle("player--active");
  player1Element.classList.toggle("player--active");
};

// Rolling dice functionality
btnroll.addEventListener("click", function () {
  if (playing) {
    // Generating a randam dice roll
    const dice = Math.trunc(Math.random() * 6
    ) + 1;
    // Display dice
    diceElement.classList.remove("hidden");
    diceElement.src = `dice-${dice}.png`;
    // Check for rolled 1
    if (dice !== 1) {
      // add dice  to current score
      currentScore += dice;
      document.getElementById(`current--${activeplayer}`).textContent =
      currentScore;
    } else {
      // switch to next player
      switchPlayer();
    }
  }
});

// Function for Hold buttton
btnhold.addEventListener("click", function () {
  if (playing) {
    // add current score to activeplayer score
    scores[activeplayer] += currentScore;
    document.getElementById(`score--${activeplayer}`).textContent =
      scores[activeplayer];
    if (scores[activeplayer] >= 100) {
      playing = false;
      diceElement.classList.add("hidden");
      document
        .querySelector(`.player--${activeplayer}`)
        .classList.add("player--winner");
      document
        .querySelector(`.player--${activeplayer}`)
        .classList.remove("player--active");
    } else {
      // switch to the next player
      switchPlayer();
    }
  }
});
// for replay game new button 
btnnew.addEventListener("click", init);
