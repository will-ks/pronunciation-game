function Game(playerName) {
  this.sentences = [];
  this.currentSentenceNum = 0;
  this.currentSentence;
  this.gameLength = 10;
  this.player = new Player(playerName);
}

Game.prototype.getSentences = function(num) {
  this.sentences = getRandomSentences(num);
};

Game.prototype.fillInData = function() {
  document.getElementById("player-name").innerText = this.player.name;
  document.getElementById("player-score").innerText = this.player.score;
  document.querySelector(
    "#target-sentence p"
  ).innerText = this.currentSentence.sentence;
};

Game.prototype.startGame = function() {
  var self = this;
  this.getSentences(this.gameLength);
  this.nextQuestion();
  this.fillInData();
};

Game.prototype.nextQuestion = function() {
  if (this.currentSentenceNum < this.gameLength - 1) {
    this.currentSentenceNum++;
    this.currentSentence = this.sentences[this.currentSentenceNum];
    this.fillInData();
  }
};
