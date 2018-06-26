function Player(name) {
  this.name = name;
  this.score = 0;
  this.currentAttempt = 1;
}

var game = null;
Player.prototype.handleGameStart = function(g) {
  game = g;
};

Player.prototype.handleSpeakButtonClick = function() {
  if (annyang.isListening()) {
    this.stopListening();
  } else {
    this.startListening();
  }
};

Player.prototype.startListening = function() {
  var self = this;

  // Callback on result
  annyang.addCallback("result", function(phrases) {
    self.handleVoiceInput(phrases[0], phrases);
    self.stopListening();
  });
  // Set options
  annyang.setLanguage("en-US");

  // Callback on start - Fired as soon as the browser's Speech Recognition engine starts listening
  annyang.addCallback("start", function() {
    drawListening();
  });

  // Callback on end - Fired when the browser's Speech Recognition engine stops
  annyang.addCallback("end", function() {
    drawListeningStopped();
    annyang.removeCallback();
  });

  // Start listening.
  annyang.start({ autoRestart: false });
};

Player.prototype.stopListening = function() {
  annyang.abort();
};

Player.prototype.handleVoiceInput = function(phrase, phrases) {
  console.log("I think the user said: ", phrases[0]);
  console.log("But then again, it could be any of the following: ", phrases);

  var diff = game.diffStrings(game.currentSentence.sentence, phrases[0]);
  var score = game.calculateDiffScore(
    game.currentSentence.sentence,
    phrases[0]
  );
  drawDiffedStrings(diff);
  drawScore(score);
  this.currentAttempt++;
  if (this.currentAttempt <= game.allowedAttempts) {
    drawAttempts(this.currentAttempt);
  }
};
