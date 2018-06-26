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

Game.prototype.getSentences = function(num) {
  this.sentences = getRandomSentences(num);
};

Game.prototype.getProgressPercent = function() {
  return Math.floor((this.currentSentenceNum / this.gameLength) * 100);
};

Game.prototype.startGame = function() {
  var self = this;
  this.getSentences(this.gameLength);
  this.nextQuestion();
  fillInData(
    this.player.name,
    this.player.score,
    this.currentSentence.sentence,
    this.currentSentence.language,
    this.allowedAttempts
  );
  drawProgressBar(this.getProgressPercent());
  this.player.handleGameStart(this);
};

Game.prototype.handleContinueButton = function() {
  toggleContinueButtons();
  if (!this.checkIfVoiceAvailable(this.currentSentence.bcp47)) {
    disableRevealPronunciationButton();
  }
};

Game.prototype.handleRevealPronunciationButton = function() {
  this.speakSentence(this.currentSentence.sentence, this.currentSentence.bcp47);
};

Game.prototype.handleNextButton = function() {
  this.nextQuestion();
  toggleContinueButtons();
};

Game.prototype.nextQuestion = function() {
  this.player.finishSentence();
  this.currentSentenceNum++;
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
  } else {
    buildGameOver();
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
    var code = voice.lang.split("-");
    supported.push(code[0]);
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
