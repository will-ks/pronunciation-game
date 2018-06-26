function Player() {
  this.name = "";
  this.score = 0;
  this.currentAttempt = 1;
  this.currentScore = 0;
}

var game = null;
Player.prototype.handleGameStart = function(g) {
  game = g;
};

Player.prototype.setName = function(name) {
  this.name = name;
};

Player.prototype.handleSpeakButtonClick = function() {
  if (annyang.isListening()) {
    this.stopListening();
  } else {
    this.startListening(game.currentSentence.bcp47);
  }
};

Player.prototype.startListening = function(languageBcp47String) {
  var self = this;

  // Callback on result
  annyang.addCallback("result", function(phrases) {
    self.handleVoiceInput(phrases[0], phrases);
    self.stopListening();
  });
  // Set options
  annyang.setLanguage(languageBcp47String);

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
  console.log("I think the user said: ", phrase);
  console.log("But then again, it could be any of the following: ", phrases);

  var diff = game.diffStrings(game.currentSentence.sentence, phrase);
  var score = game.calculateDiffScore(game.currentSentence.sentence, phrase);
  drawDiffedStrings(diff);
  drawCurrentScore(score);
  this.currentScore = score;
  this.currentAttempt++;
  if (this.currentAttempt <= game.allowedAttempts) {
    drawAttempts(this.currentAttempt);
  } else {
    disableSpeakButton();
  }
};

Player.prototype.finishSentence = function() {
  this.currentAttempt = 1;
  this.score += this.currentScore;
  this.currentScore = 0;
};
