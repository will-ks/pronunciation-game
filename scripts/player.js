function Player(name) {
  this.name = name;
  this.score = 0;
}

Player.prototype.startListening = function() {
  var self = this;
  if (annyang) {
    annyang.addCallback("result", function(phrases) {
      self.handleVoiceInput(phrases[0], phrases);
    });
    annyang.setLanguage("en-US");

    // Start listening.
    annyang.start();
  }
};

Player.prototype.handleVoiceInput = function(phrase, phrases) {
  console.log("I think the user said: ", phrases[0]);
  console.log("But then again, it could be any of the following: ", phrases);

  var diff = window.game.diffStrings(
    window.game.currentSentence.sentence,
    phrases[0]
  );
  var score = window.game.calculateDiffScore(
    window.game.currentSentence.sentence,
    phrases[0]
  );
  drawDiffedStrings(diff);
  drawScore(score);
};
