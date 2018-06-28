"use strict";

function Game() {
  this.sentences = [];
  this.currentSentenceNum = 0;
  this.currentSentence;
  this.gameLength = 10;
  this.allowedAttempts = 3;
  this.timed = false;
  this.timer = 30;
  this.timerMax = 30;
  this.timerID;
  this.zombieIntervalID;
  this.zombieSpawnIntervalID;
  this.zombieMode = false;
}

Game.prototype.createPlayer = function(name) {
  this.player = new Player();
  this.player.setName(name);
};

Game.prototype.getSentences = function(num, lang) {
  this.sentences = getRandomSentences(num, lang);
};

Game.prototype.getProgressPercent = function(current, total) {
  return Math.floor((current / total) * 100);
};

Game.prototype.startGame = function(option, lang) {
  var self = this;
  this.getSentences(this.gameLength, lang);
  // If timed mode is on, start timer interval and show timer
  if (option === "timed") {
    this.timed = true;
    showTimer();
    drawProgressBar(self.getProgressPercent(self.timer, self.timerMax));
    this.timerID = window.setInterval(function() {
      drawTimer();
      drawProgressBar(self.getProgressPercent(self.timer, self.timerMax));
      self.timerDecrement();
    }, 1000);
  }
  this.nextQuestion();
  // Zombie Mode easter egg
  var robotHead = document.getElementById("robot-head");
  robotHead.addEventListener("dblclick", function() {
    self.startZombieMode();
    drawAttemptString("Welcome to THE PRONUNCIO OF THE DEAD!");
  });
};

Game.prototype.timerDecrement = function() {
  this.timer--;
  if (this.timer < 0) {
    this.gameEnded();
    window.clearInterval(this.timerID);
    return;
  }
};

Game.prototype.handleContinueButton = function() {
  hideContinueButton();
  showNextButtons();
  disableSpeakButton();
  if (!this.checkIfVoiceAvailable(this.currentSentence.bcp47)) {
    disableRevealPronunciationButton();
  }
  if (this.zombieMode) {
    this.killZombie();
  }
};

Game.prototype.handlePlayAgainButton = function() {
  buildSplash();
};

Game.prototype.handleRevealPronunciationButton = function() {
  this.speakSentence(this.currentSentence.sentence, this.currentSentence.bcp47);
};

Game.prototype.handleNextButton = function() {
  this.currentSentenceNum++;
  this.nextQuestion();
  hideNextButtons();
};

Game.prototype.nextQuestion = function() {
  this.player.collectScore();
  this.currentSentence = this.sentences[this.currentSentenceNum];
  if (this.currentSentenceNum < this.gameLength) {
    fillInData(
      this.player.name,
      this.player.score,
      this.currentSentence.sentence,
      this.currentSentence.language,
      this.allowedAttempts
    );
    drawFlag(this.currentSentence.bcp47);
    if (!this.timed) {
      drawProgressBar(
        this.getProgressPercent(this.currentSentenceNum, this.gameLength)
      );
    }
    enableSpeakButton();
    hideContinueButton();
    hideSpeechBubble();
  } else {
    this.gameEnded();
  }
};

Game.prototype.gameEnded = function() {
  this.addScoreToHighScores();
  buildGameOver(this.player.score, this.getHighScores(10));
};

Game.prototype.addScoreToHighScores = function() {
  var scoreObject = { playerName: this.player.name, score: this.player.score };
  highScores.push(scoreObject);
};

Game.prototype.cleanString = function(string) {
  // Strip out punctuation with Regex and trim whitespace.
  var regex = new RegExp(/[\.,-\/#!$%\^&\*;:{}=\-_`~()@\+\?><\[\]\+"'\\]/g);
  return string
    .replace(regex, "")
    .trim()
    .toLowerCase();
};

Game.prototype.diffStrings = function(string1, string2) {
  if (!(string1 && string2)) {
    return null;
  }
  var cleanString1 = this.cleanString(string1);
  var cleanString2 = this.cleanString(string2);

  var diff = JsDiff.diffWordsWithSpace(cleanString1, cleanString2);
  return diff;
};

Game.prototype.calculateDiffScore = function(string1, string2) {
  if (!(string1 && string2)) {
    return null;
  }

  var cleanString1 = this.cleanString(string1);
  var cleanString2 = this.cleanString(string2);
  var similarity = dice.coefficient(cleanString1, cleanString2);
  return Math.floor(similarity * 100);
};

Game.prototype.speakSentence = function(sentence, languageBcp47String) {
  var utterance = new SpeechSynthesisUtterance(sentence);
  utterance.lang = languageBcp47String;
  window.speechSynthesis.speak(utterance);
};

Game.prototype.getAvailableSpeechSynthesisLanguages = function() {
  var supported = [];
  var voices = speechSynthesis.getVoices();
  voices.forEach(function(voice) {
    supported.push(voice.lang.slice(0, 2));
  });
  return supported;
};

Game.prototype.checkIfVoiceAvailable = function(languageBcp47String) {
  var supported = this.getAvailableSpeechSynthesisLanguages();
  if (supported.indexOf(languageBcp47String) > -1) {
    return true;
  } else {
    return false;
  }
};

Game.prototype.translateString = function(string, lang) {
  // Note: This is a temporary method using a disposable free API key. Will eventually be replaced when the app has a backend.
  var stringURI = encodeURI(string);
  fetch(
    "https://translate.yandex.net/api/v1.5/tr.json/translate?key=trnsl.1.1.20180627T143038Z.1e878579d0dfe5ce.cace0e83481e4da16a038b62e31825c4764bb8c5&text=" +
      stringURI +
      "&lang=" +
      lang +
      "-en",
    {
      method: "get"
    }
  )
    .then(response => response.json())
    .then(jsonData => drawTranslation(jsonData.text[0]))
    .catch(err => {
      //error block
    });
};

Game.prototype.getHighScores = function(num) {
  var scores = highScores.slice(0);

  scores.sort(function(a, b) {
    return b.score - a.score;
  });

  return scores.slice(0, num);
};

Game.prototype.startZombieMode = function() {
  var self = this;
  this.zombieMode = true;
  this.zombieSpawnIntervalID = window.setInterval(function() {
    self.spawnZombie();
  }, 4000);
  game.startZombieChecking();
};

Game.prototype.stopZombieMode = function(zombieSpawnIntervalID) {
  window.clearInterval(zombieSpawnIntervalID);
};

Game.prototype.spawnZombie = function() {
  var zombieSpawner = document.getElementById("zombie-spawner");
  var zombie = document.createElement("div");
  zombie.classList.add("zombie");
  zombie.setAttribute(
    "style",
    "left: " + Math.random() * (window.innerWidth - 100) + "px"
  );
  zombieSpawner.appendChild(zombie);
};

Game.prototype.checkIfZombieWalkFinished = function() {
  var self = this;
  var zombies = document.querySelectorAll(".zombie");
  var viewportHeight = Math.max(
    document.documentElement.clientHeight,
    window.innerHeight
  );
  console.log("checking");
  zombies.forEach(function(zombie) {
    console.log(zombie.offsetTop);
    if (zombie.offsetTop > viewportHeight - 80) {
      console.log("zombie off screen");
      self.stopZombieChecking(self.zombieIntervalID);
      self.stopZombieMode(self.zombieSpawnIntervalID);
      self.gameEnded();
    }
  });
};

Game.prototype.startZombieChecking = function() {
  game.zombieIntervalID = window.setInterval(function() {
    game.checkIfZombieWalkFinished();
  }, 50);
};

Game.prototype.stopZombieChecking = function(intervalID) {
  window.clearInterval(intervalID);
};

Game.prototype.killZombie = function() {
  var zombieSpawner = document.getElementById("zombie-spawner");
  var zombie = document.querySelector(".zombie");
  zombieSpawner.removeChild(zombie);
};
