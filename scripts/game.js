function Game(playerName) {
  this.sentences = [];
  this.currentSentenceNum = 0;
  this.currentSentence;
  this.gameLength = 10;
  this.player = new Player(playerName);
  this.allowedAttempts = 3;
}

Game.prototype.getSentences = function(num) {
  this.sentences = getRandomSentences(num);
};

Game.prototype.startGame = function() {
  var self = this;
  this.getSentences(this.gameLength);
  this.nextQuestion();
  fillInData();
  this.player.handleGameStart(this);
};

Game.prototype.nextQuestion = function() {
  if (this.currentSentenceNum < this.gameLength - 1) {
    this.currentSentenceNum++;
    this.currentSentence = this.sentences[this.currentSentenceNum];
    fillInData();
  }
};

Game.prototype.cleanString = function(string) {
  // Strip out punctuation with Regex and trim whitespace.
  var regex = new RegExp(/[\.,-\/#!$%\^&\*;:{}=\-_`~()@\+\?><\[\]\+"'\\]/g);
  return string.replace(regex, "").trim();
};

Game.prototype.diffStrings = function(string1, string2) {
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
  if (string1 && string2) {
    var similarity = dice.coefficient(string1, string2);
    return Math.floor(similarity * 100);
  } else {
    return null;
  }
};
