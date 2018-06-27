"use strict";

function Game() {
  this.sentences = [];
  this.currentSentenceNum = 0;
  this.currentSentence;
  this.gameLength = 10;
  this.allowedAttempts = 3;
}

Game.prototype.createPlayer = function(name) {
  this.player = new Player();
  this.player.setName(name);
};

Game.prototype.getSentences = function(num, option, lang) {
  switch (option) {
    case "normal":
      this.sentences = getRandomSentences(num, lang);
      break;
  }
};

Game.prototype.getProgressPercent = function() {
  return Math.floor((this.currentSentenceNum / this.gameLength) * 100);
};

Game.prototype.startGame = function(option, lang) {
  this.getSentences(this.gameLength, option, lang);
  this.nextQuestion();
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
    drawProgressBar(this.getProgressPercent());
    enableSpeakButton();
    hideContinueButton();
  } else {
    buildGameOver(this.player.score);
  }
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

  var diff = JsDiff.diffWordsWithSpace(
    cleanString1,
    cleanString2,
    (ignoreCase = true)
  );
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
