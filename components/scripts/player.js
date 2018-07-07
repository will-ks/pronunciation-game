class Player {
  constructor() {
    this.name = "";
    this.score = 0;
    this.currentAttempt = 1;
    this.currentScore = 0;
  }

  setName(name) {
    if (name) {
      this.name = name;
    } else {
      this.name = "Player";
    }
  }

  handleSpeakButtonClick() {
    this.startListening(game.currentSentence.bcp47);
  }

  startListening(languageBcp47String) {
    const self = this;

    // Callback on result
    annyang.addCallback("result", phrases => {
      self.handleVoiceInput(phrases[0], phrases);
      self.stopListening();
    });
    // Set options
    annyang.setLanguage(languageBcp47String);

    // Callback on start - Fired as soon as the browser's Speech Recognition engine starts listening
    annyang.addCallback("start", () => {
      drawListening();
    });

    // Callback on end - Fired when the browser's Speech Recognition engine stops
    annyang.addCallback("end", () => {
      drawListeningStopped();
      annyang.removeCallback();
    });

    // Start listening.
    annyang.start({ autoRestart: false });
  }

  stopListening() {
    annyang.abort();
  }

  handleVoiceInput(phrase, phrases) {
    const diff = game.diffStrings(game.currentSentence.sentence, phrase);
    const score = game.calculateDiffScore(
      game.currentSentence.sentence,
      phrase
    );
    drawDiffedStrings(diff);
    drawBadge(score);
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
      document.getElementById("success-sound").play();
      game.handleContinueButton();
    } else if (this.currentScore > 80) {
      drawAttemptString("Pronuncio is slightly confused...");
      document.getElementById("success-sound").play();
      game.handleContinueButton();
    } else if (this.currentScore > 40) {
      drawAttemptString("Pronuncio is very confused by your words, human.");
      document.getElementById("fail-sound").play();
      game.handleContinueButton();
    } else if (this.currentAttempt <= game.allowedAttempts) {
      drawAttemptString("Pronuncio has no idea what you are talking about.");
      document.getElementById("fail-sound").play();
      game.handleContinueButton();
    } else {
      drawAttemptString("Pronuncio declares this is hopeless. Let's move on.");
      document.getElementById("fail-sound").play();
      game.handleContinueButton();
    }

    if (game.zombieMode && this.currentScore > 0) {
      game.killZombie();
      this.stopListening();
      window.setTimeout(() => {
        game.handleNextButton();
      }, 100);
    }
  }

  collectScore() {
    this.currentAttempt = 1;
    this.score += this.currentScore;
    this.currentScore = 0;
  }
}
