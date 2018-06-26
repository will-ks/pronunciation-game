"use strict";

function main() {
  // Start by building splash screen
  buildSplash();
}

window.addEventListener("load", main);

function getGameContainer() {
  return document.getElementById("game-container");
}

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

  var gameContainer = getGameContainer();

  gameContainer.innerHTML = HTML;

  var startButton = document.getElementById("start-button");

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
  </div>
  </div>
  
  <div class="row m-3">
  <div class="col">
  <div class="progress">
  <div class="progress-bar" role="progressbar" style="width: 0%" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100" id="current-level-bar"></div>
  </div>
  </div>
  </div>`;

  var gameContainer = getGameContainer();

  gameContainer.innerHTML = HTML;

  var speakBtn = document.getElementById("speak-button");
  speakBtn.addEventListener("click", function() {
    window.game.player.handleSpeakButtonClick();
  });

  var continueBtn = document.getElementById("continue-button");
  continueBtn.addEventListener("click", function() {
    window.game.nextQuestion();
  });
}

function buildGameOver() {
  var HTML = `<div class="row m-3">
  <div class="col text-center">
  <h1>Game Over</h1>
  <h2>You scored: 0000</h2>
  <button class="btn btn-lg btn-primary">Play again?</button>
  </div>
  </div>`;

  var gameContainer = getGameContainer();

  gameContainer.innerHTML = HTML;
}

function handleStartButtonClicked(nameInputValue) {
  window.game = new Game();
  var game = window.game;
  game.createPlayer(nameInputValue);
  buildGame();
  game.startGame();
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
  var color = "";
  var span = null;

  var displayDiv = document.getElementById("input-card-body");
  var fragment = document.createDocumentFragment();

  diff.forEach(function(part) {
    // Part added / removed / correct
    color = part.added ? "#DD4B39" : part.removed ? "black" : "#33B5E5";
    span = document.createElement("span");
    span.style.color = color;
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
  var speakBtn = document.getElementById("speak-button");
  speakBtn.setAttribute("disabled", true);
  speakBtn.classList.add("btn-secondary");
}

function enableSpeakButton() {
  var speakBtn = document.getElementById("speak-button");
  speakBtn.removeAttribute("disabled");
  speakBtn.classList.remove("btn-secondary");
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
