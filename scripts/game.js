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
  document.querySelector("#input-sentence p").innerText = "";
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

Game.prototype.diffStrings = function(string1, string2) {
  (color = ""), (span = null);

  var diff = JsDiff.diffChars(string1, string2, (ignoreCase = true)),
    display = document.getElementById("input-card-body"),
    fragment = document.createDocumentFragment();

  diff.forEach(function(part) {
    // green for additions, red for deletions
    // grey for common parts
    color = part.added ? "#DD4B39" : part.removed ? "black" : "#33B5E5";
    span = document.createElement("span");
    span.style.color = color;
    if (!part.removed) {
      span.appendChild(document.createTextNode(part.value));
      fragment.appendChild(span);
    }
  });

  display.innerHTML = "";
  display.appendChild(fragment);
};
