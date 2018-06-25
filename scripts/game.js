function Game(playerName) {
  this.sentences = [];
  this.currentSentence = 0;
  this.player = new Player(playerName);
}

Game.prototype.fillInData = function() {
  document.getElementById("player-name").innerText = this.player.name;
};

Game.prototype.startGame = function() {
  var self = this;
  this.fillInData();
};
