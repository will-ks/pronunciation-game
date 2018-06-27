"use strict";

function Player() {
  this.name = "";
  this.score = 0;
  this.currentAttempt = 1;
  this.currentScore = 0;
}

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
  this.currentScore = score;
  this.currentAttempt++;

  // Translate attempt, if it is not perfect. If it is, use the predefined translation.
  if (!(this.currentScore === 100)) {
    game.translateString(phrase, game.currentSentence.bcp47);
  } else {
    drawTranslation(game.currentSentence.translation);
  }

  if (this.currentScore === 100) {
    drawAttemptString("Pronuncio understands perfectly!");
    game.handleContinueButton();
  } else if (this.currentScore > 80) {
    drawAttemptString(
      "Pronuncio kind of understood that, human. You may try again or continue."
    );
    showContinueButton();
  } else if (this.currentScore > 40) {
    drawAttemptString(
      "Your words confuse Pronuncio but you may continue if you wish."
    );
    showContinueButton();
  } else if (this.currentAttempt <= game.allowedAttempts) {
    drawAttemptString("Pronuncio declares that a terrible attempt. Try again!");
  } else {
    drawAttemptString("Pronuncio declares this is hopeless. Let's move on.");
    game.handleContinueButton();
  }
};

Player.prototype.collectScore = function() {
  this.currentAttempt = 1;
  this.score += this.currentScore;
  this.currentScore = 0;
};

// Dev cheat, remove me
window.addEventListener("keydown", function(e) {
  console.log("cheating!");
  showContinueButton();
});
