class Game {
  constructor() {
    this.sentences = [];
    this.currentSentenceNum = 0;
    this.currentSentence;
    this.gameLength = 10;
    this.allowedAttempts = 3;
    this.timed = false;
    this.timer = 30;
    this.timerMax = 30;
    this.timerID;
    this.zombieIntervalID;
    this.zombieSpawnIntervalID;
    this.zombieMode = false;
  }

  createPlayer(name) {
    this.player = new Player();
    this.player.setName(name);
  }

  getSentences(num, lang) {
    this.sentences = getRandomSentences(num, lang);
  }

  getProgressPercent(current, total) {
    return Math.floor((current / total) * 100);
  }

  startGame(option, lang) {
    const self = this;
    this.getSentences(this.gameLength, lang);
    // If timed mode is on, start timer interval and show timer
    if (option === "timed") {
      this.timed = true;
      showTimer();
      drawProgressBar(self.getProgressPercent(self.timer, self.timerMax));
      this.timerID = window.setInterval(() => {
        drawTimer();
        drawProgressBar(self.getProgressPercent(self.timer, self.timerMax));
        self.timerDecrement();
      }, 1000);
    }
    this.nextQuestion();

    // Zombie Mode easter egg
    const robotHead = document.getElementById("robot-head");
    robotHead.addEventListener("dblclick", () => {
      self.startZombieMode();
      drawAttemptString("Welcome to THE PRONUNCIO OF THE DEAD!");
    });
  }


  timerDecrement() {
    this.timer--;
    if (this.timer < 0) {
      this.gameEnded();
      window.clearInterval(this.timerID);
      return;
    }
  }

  handleContinueButton() {
    hideContinueButton();
    showNextButtons();
    // disableSpeakButton();
    if (!this.checkIfVoiceAvailable(this.currentSentence.bcp47)) {
      disableRevealPronunciationButton();
    }
  }

  handlePlayAgainButton() {
    buildSplash();
  }

  handleRevealPronunciationButton() {
    this.speakSentence(this.currentSentence.sentence, this.currentSentence.bcp47);
  }

  handleNextButton() {
    this.currentSentenceNum++;
    this.nextQuestion();
    hideNextButtons();
  }

  nextQuestion() {
    this.player.collectScore();
    this.currentSentence = this.sentences[this.currentSentenceNum];
    if (this.currentSentenceNum < this.gameLength) {
      fillInData(
        this.player.name,
        this.player.score,
        this.currentSentence.sentence,
        this.currentSentence.language,
        this.allowedAttempts
      );
      drawFlag(this.currentSentence.bcp47);
      if (!this.timed) {
        drawProgressBar(
          this.getProgressPercent(this.currentSentenceNum, this.gameLength)
        );
      }
      enableSpeakButton();
      hideContinueButton();
      hideSpeechBubble();
      this.player.handleSpeakButtonClick();
    } else {
      this.gameEnded();
    }
  }

  gameEnded() {
    this.addScoreToHighScores();
    buildGameOver(this.player.score, this.getHighScores(10));
    if (this.zombieMode) {
      document.body.classList.remove("bg-secondary");
    }
  }


  // --- Score functions

  getHighScores(num) {
    const scores = highScores.slice(0);

    scores.sort(({ score }, { score }) => score - score);

    return scores.slice(0, num);
  }

  addScoreToHighScores() {
    const scoreObject = { playerName: this.player.name, score: this.player.score };
    highScores.push(scoreObject);
  }
  // --- Speech synthesis functions

  getAvailableSpeechSynthesisLanguages() {
    const supported = [];
    const voices = speechSynthesis.getVoices();
    voices.forEach(({ lang }) => {
      supported.push(lang.slice(0, 2));
    });
    return supported;
  }

  checkIfVoiceAvailable(languageBcp47String) {
    const supported = this.getAvailableSpeechSynthesisLanguages();
    if (supported.includes(languageBcp47String)) {
      return true;
    } else {
      return false;
    }
  }

  speakSentence(sentence, languageBcp47String) {
    const utterance = new SpeechSynthesisUtterance(sentence);
    utterance.lang = languageBcp47String;
    window.speechSynthesis.speak(utterance);
  }

  // --- String functions ---

  translateString(string, lang) {
    // Note: This is a temporary method using a disposable free API key. Will eventually be replaced when the app has a backend.
    const stringURI = encodeURI(string);
    fetch(
      `https://translate.yandex.net/api/v1.5/tr.json/translate?key=trnsl.1.1.20180627T143038Z.1e878579d0dfe5ce.cace0e83481e4da16a038b62e31825c4764bb8c5&text=${stringURI}&lang=${lang}-en`,
      {
        method: "get"
      }
    )
      .then(response => response.json())
      .then(({ text }) => drawTranslation(text[0]))
      .catch(err => {
        //error block
      });
  }

  cleanString(string) {
    // Strip out punctuation with Regex and trim whitespace.
    const regex = new RegExp(/[\.,-\/#!$%\^&\*;:{}=\-_`~()@\+\?><\[\]\+"'\\]/g);
    return string
      .replace(regex, "")
      .trim()
      .toLowerCase();
  }

  diffStrings(string1, string2) {
    if (!(string1 && string2)) {
      return null;
    }
    const cleanString1 = this.cleanString(string1);
    const cleanString2 = this.cleanString(string2);

    const diff = JsDiff.diffWordsWithSpace(cleanString1, cleanString2);
    return diff;
  }

  calculateDiffScore(string1, string2) {
    if (!(string1 && string2)) {
      return null;
    }

    const cleanString1 = this.cleanString(string1);
    const cleanString2 = this.cleanString(string2);
    const similarity = dice.coefficient(cleanString1, cleanString2);
    return Math.floor(similarity * 100);
  }

  // --- Zombie mode ---

  startZombieMode() {
    const self = this;
    this.zombieMode = true;
    this.zombieSpawnIntervalID = window.setInterval(() => {
      self.spawnZombie();
    }, 4000);
    game.startZombieChecking();
    hideInputCard();
    document.body.classList.add("bg-secondary");
  }

  stopZombieMode(zombieSpawnIntervalID) {
    window.clearInterval(zombieSpawnIntervalID);
  }

  spawnZombie() {
    const zombieSpawner = document.getElementById("zombie-spawner");
    const zombie = document.createElement("div");
    zombie.classList.add("zombie");
    zombie.setAttribute(
      "style",
      `left: ${Math.random() * (window.innerWidth - 100)}px`
    );
    zombieSpawner.appendChild(zombie);
  }

  checkIfZombieWalkFinished() {
    const self = this;
    const zombies = document.querySelectorAll(".zombie:not(.zombie-dead)");
    const viewportHeight = Math.max(
      document.documentElement.clientHeight,
      window.innerHeight
    );
    zombies.forEach(({ offsetTop }) => {
      if (offsetTop > viewportHeight - 80) {
        self.stopZombieChecking(self.zombieIntervalID);
        self.stopZombieMode(self.zombieSpawnIntervalID);
        self.gameEnded();
      }
    });
  }

  startZombieChecking() {
    game.zombieIntervalID = window.setInterval(() => {
      game.checkIfZombieWalkFinished();
    }, 50);
  }

  stopZombieChecking(intervalID) {
    window.clearInterval(intervalID);
  }

  killZombie() {
    const zombieSpawner = document.getElementById("zombie-spawner");
    const zombie = document.querySelector(".zombie");
    zombie.classList.add("zombie-dead");
    window.setTimeout(() => {
      zombieSpawner.removeChild(zombie);
    }, 1000);
  }
}