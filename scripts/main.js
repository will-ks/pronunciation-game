"use strict";

var speakBtn;
var continueBtn;
var revealPronunciationBtn;
var nextBtn;
var startButton;
var gameContainer;
var finalScoreString;

function main() {
  gameContainer = document.getElementById("game-container");
  // Start by building splash screen
  buildSplash();
  // The first time speechSynthesis.getVoices is called on Chrome for Android, it returns no results as voices are loaded asynchronously. Calling it here so it's ready when needed.
  speechSynthesis.getVoices();
}

window.addEventListener("load", main);

function buildSplash() {
  var HTML = `
  <div class="row m-3">
    <div class="col">
      <h1>Amazing Game</h1>
    </div>
  </div>
  
  <div class="row m-3">
    <div class="col">
      <label for="name-input">Your name</label>
      <input type="text" id="name-input" class="form-control" placeholder="Enter your name">
      <button class="btn btn-primary btn-lg mt-3" id="start-button">Start</button>
    </div>
  </div>`;

  gameContainer.innerHTML = HTML;

  startButton = document.getElementById("start-button");

  // Do we really want to add event listeners in this function?
  startButton.addEventListener("click", function() {
    var name = document.getElementById("name-input").value;
    handleStartButtonClicked(name);
  });
}

function buildGame() {
  var HTML = `<div class="row m-3">
  <div class="col col-6">
  <h1 id="player-name">Name</h1>
  </div>
  <div class="col col-6 text-right">
  <h1 id="player-score">0000</h1>
  </div>
  </div>
  
  <div class="row m-3">
  <div class="col">
  <div class="card" id="target-sentence">
  <!-- <img class="card-img-top" src="https://cdn.rawgit.com/hjnilsson/country-flags/master/svg/ad.svg" alt="Andorra flag "></img> -->
  <div class="card-body text-center">
  <p class="card-text">foo</p>
  </div>
  <div class="card-footer text-muted text-center" id="target-language">
  <p class="card-text">English</p>
  </div>
  </div>
  </div>
  </div>
  <div class="row m-3">
  <div class="col text-center">
  <button class="btn btn-primary btn-lg" id="speak-button">Speak</button>
  <p class="m-3" id="attempts-string">Attempt 1 of 3</p>
  </div>
  </div>
  <div class="row m-3">
  <div class="col">
  <div class="card" id="input-sentence">
  <div class="card-body text-center" id="input-card-body">
  <p class="card-text">foo</p>
  
  </div>
  <div class="card-footer text-muted text-center" id="similarity-score">
  <p class="card-text">0</p>
  </div>
  </div>
  </div>
  </div>
  <div class="row m-3">
  <div class="col text-center">
  <button class="btn btn-primary btn-lg" id="continue-button">Continue</button>
  <button class="btn btn-primary btn-lg d-none" id="reveal-pronunciation-button">What should it sound like?</button>
  <button class="btn btn-primary btn-lg d-none" id="next-button">Next</button>
  </div>
  </div>
  
  <div class="row m-3">
  <div class="col">
  <div class="progress">
  <div class="progress-bar" role="progressbar" style="width: 0%" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100" id="current-level-bar"></div>
  </div>
  </div>
  </div>`;

  gameContainer.innerHTML = HTML;

  speakBtn = document.getElementById("speak-button");
  continueBtn = document.getElementById("continue-button");
  revealPronunciationBtn = document.getElementById(
    "reveal-pronunciation-button"
  );
  nextBtn = document.getElementById("next-button");

  speakBtn.addEventListener("click", function() {
    game.player.handleSpeakButtonClick();
  });

  continueBtn.addEventListener("click", function() {
    game.handleContinueButton();
  });

  revealPronunciationBtn.addEventListener("click", function() {
    game.handleRevealPronunciationButton();
  });

  nextBtn.addEventListener("click", function() {
    game.handleNextButton();
  });
}

function buildGameOver(score) {
  var HTML = `<div class="row m-3">
  <div class="col text-center">
  <h1>Game Over</h1>
  <h2 id="final-score">You scored: 0000</h2>
  <button class="btn btn-lg btn-primary">Play again?</button>
  </div>
  </div>`;

  gameContainer.innerHTML = HTML;
  drawFinalScore(score);
}

function drawFinalScore(score) {
  finalScoreString = document.getElementById("final-score");
  finalScoreString.innerText = "You scored: " + score;
}

function handleStartButtonClicked(nameInputValue) {
  var game = new Game();
  game.createPlayer(nameInputValue);
  buildGame();
  game.startGame();
}

function toggleContinueButtons() {
  continueBtn.classList.toggle("d-none");
  nextBtn.classList.toggle("d-none");
  revealPronunciationBtn.classList.toggle("d-none");
  enableRevealPronunciationButton();
}

function fillInData(name, score, sentence, language, allowedAttempts) {
  document.getElementById("player-name").innerText = name;
  document.getElementById("player-score").innerText = score;
  document.querySelector("#target-sentence p").innerText = sentence;
  document.getElementById("input-card-body").innerHTML = "";
  document.getElementById("target-language").innerText = language;
  document.querySelector("#similarity-score p").innerText = "0";
  document.getElementById("attempts-string").innerText =
    "Attempt 1 of " + allowedAttempts;
}

function drawDiffedStrings(diff) {
  var displayDiv = document.getElementById("input-card-body");
  var fragment = document.createDocumentFragment();

  diff.forEach(function(part) {
    // Part added / removed / correct
    var colorClass = part.added
      ? "text-danger"
      : part.removed
        ? "text-dark"
        : "text-success";

    var span = document.createElement("span");
    span.classList.add(colorClass);
    if (!part.removed) {
      span.appendChild(document.createTextNode(part.value));
      fragment.appendChild(span);
    }
  });

  displayDiv.innerHTML = "";
  displayDiv.appendChild(fragment);
}

function drawCurrentScore(score) {
  document.querySelector("#similarity-score p").innerText = score;
}

function drawAttempts(attempts) {
  document.getElementById("attempts-string").innerText =
    "Attempt " + game.player.currentAttempt + " of " + game.allowedAttempts;
}

function disableSpeakButton() {
  speakBtn.setAttribute("disabled", true);
  speakBtn.classList.add("btn-secondary");
}

function disableRevealPronunciationButton() {
  revealPronunciationBtn.setAttribute("disabled", true);
  revealPronunciationBtn.classList.add("btn-secondary");
}

function enableSpeakButton() {
  speakBtn.removeAttribute("disabled");
  speakBtn.classList.remove("btn-secondary");
}

function enableRevealPronunciationButton() {
  revealPronunciationBtn.removeAttribute("disabled");
  revealPronunciationBtn.classList.remove("btn-secondary");
}

function drawListening() {
  document.getElementById("speak-button").classList.add("btn-success");
}

function drawListeningStopped() {
  document.getElementById("speak-button").classList.remove("btn-success");
}

function drawProgressBar(percent) {
  var progressBar = document.getElementById("current-level-bar");
  progressBar.setAttribute("style", "width: " + percent + "%");
  progressBar.setAttribute("aria-valuenow", percent);
}
