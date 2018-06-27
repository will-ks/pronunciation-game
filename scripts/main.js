"use strict";

var game;
var speakBtn;
var continueBtn;
var revealPronunciationBtn;
var nextBtn;
var startButton;
var playAgainButton;
var gameContainer;
var finalScoreString;
var learningModeButton;
var languagesList;

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
  <div class="row m-3 text-center" id="title-screen-title">
    <div class="col">
      <h1>Pronuncio</h1>
      <img src="/images/robot-face.svg" alt="Robot face">
    </div>
  </div>
  
  <div class="row m-3 text-center">
    <div class="col">
      <label for="name-input">Your name</label>
      <input type="text" id="name-input" class="form-control" placeholder="Enter your name">
      <button class="btn btn-primary btn-lg mt-3" id="start-button">Regular Mode</button>
      <button class="btn btn-primary btn-lg mt-3" id="start-learning-mode-button">Learning Mode</button>
      
      <div class="form-group pt-3">
        <span class="switch switch">
          <input type="checkbox" class="switch" id="timed-mode-switch">
          <label for="timed-mode-switch">Pressure Mode</label>
        </span>
      </div>

    </div>
  </div>`;

  gameContainer.innerHTML = HTML;

  startButton = document.getElementById("start-button");
  learningModeButton = document.getElementById("start-learning-mode-button");

  // Do we really want to add event listeners in this function?
  startButton.addEventListener("click", function() {
    var name = document.getElementById("name-input").value;
    var timedMode = document.getElementById("timed-mode-switch").checked;
    handleStartButtonClicked(name, timedMode ? "timed" : "normal");
  });

  learningModeButton.addEventListener("click", function() {
    var name = document.getElementById("name-input").value;
    buildLanguagesList(name, "normal", getLanguagesList());
  });
}

function buildLanguagesList(playerName, option, list) {
  var HTML = `<div class="list-group m-3" id="languages-list"></div>`;

  gameContainer.innerHTML = HTML;

  languagesList = document.getElementById("languages-list");

  list.forEach(function(language) {
    var listItem = document.createElement("button");
    listItem.setAttribute("type", "button");
    listItem.classList.add("list-group-item");
    listItem.classList.add("list-group-item-action");
    listItem.innerText = language;
    languagesList.appendChild(listItem);
    // Add click handlers for each language. IIFE for maintaining language name in scope
    (function(lang) {
      listItem.addEventListener("click", function() {
        handleStartButtonClicked(playerName, option, lang);
        console.log(lang);
      });
    })(language);
  });
}

function buildGame() {
  var HTML = `<div class="row m-3">
  <div class="col col-4">
  <h1 id="player-name">Name</h1>
  </div>
  <div class="col col-4 text-center">
  <h1 id="timer-display" class="d-none"></h1>
  </div>
  <div class="col col-4 text-right">
  <h1 id="player-score">0000</h1>
  </div>
  </div>
  
  <div class="row m-3">
  <div class="col">
  <div class="card" id="target-sentence">
  <div class="card-body text-center">
  <p class="card-text">foo</p>
  </div>
  <div class="card-footer text-muted text-center">
  <img src="/images/flags/af.png" id="country-flag">
  <span class="card-text mb-0" id="target-language">English</span>
  
  </div>
  </div>
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
  <button class="btn btn-primary btn-lg" id="speak-button">Speak</button>
  </div>
  </div>

  <div class="row m-3">
  <div class="col text-center col-3"><img src="/images/robot-face.svg" alt="Robot face"></div>
  <div class="col text-center col-9"><div class="speech-bubble"><p class="m-3 text-light" id="attempts-string"></p></div></div>
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
  <div class="progress" id="progress-bar">
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
  <button class="btn btn-lg btn-primary" id="play-again-btn">Play again?</button>
  </div>
  </div>`;

  gameContainer.innerHTML = HTML;
  drawFinalScore(score);
  playAgainButton = document.getElementById("play-again-btn");

  playAgainButton.addEventListener("click", function() {
    game.handlePlayAgainButton();
  });
}

function drawFinalScore(score) {
  finalScoreString = document.getElementById("final-score");
  finalScoreString.innerText = "You scored: " + score;
}

function drawFlag(bcp47) {
  document
    .getElementById("country-flag")
    .setAttribute("src", "/images/flags/" + bcp47 + ".png");
}

function handleStartButtonClicked(nameInputValue, option, lang) {
  game = new Game();
  game.createPlayer(nameInputValue);
  buildGame();
  game.startGame(option, lang);
}

function hideNextButtons() {
  nextBtn.classList.add("d-none");
  revealPronunciationBtn.classList.add("d-none");
}

function showNextButtons() {
  nextBtn.classList.remove("d-none");
  revealPronunciationBtn.classList.remove("d-none");
  enableRevealPronunciationButton();
}

function fillInData(name, score, sentence, language, allowedAttempts) {
  document.getElementById("player-name").innerText = name;
  document.getElementById("player-score").innerText = score;
  document.querySelector("#target-sentence p").innerText = sentence;
  document.getElementById("input-card-body").innerHTML = "";
  document.getElementById("target-language").innerText = language;
  document.querySelector("#similarity-score p").innerText = "0";
  document.getElementById("attempts-string").innerText = "";
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

function drawAttemptString(string) {
  document.getElementById("attempts-string").innerText = string;
}

function showTimer() {
  document.getElementById("timer-display").classList.remove("d-none");
}

function hideProgressBar() {
  document.getElementById("progress-bar").classList.add("d-none");
}

function drawTimer() {
  document.getElementById("timer-display").innerText = game.timer;
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

function hideContinueButton() {
  continueBtn.classList.add("d-none");
}

function showContinueButton() {
  continueBtn.classList.remove("d-none");
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
