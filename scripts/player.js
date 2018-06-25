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

  var inputCard = document.querySelector("#input-sentence p");

  if (inputCard) {
    inputCard.innerText = phrases[0];
  }
};
