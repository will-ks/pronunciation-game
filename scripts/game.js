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
  } else {
    this.gameEnded();
  }
};

Game.prototype.gameEnded = function() {
  buildGameOver(this.player.score);
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
