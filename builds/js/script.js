'use strict';

/*! pronuncio-game - v0.1.0 - 2018-07-07 */

// -------------------------------
// Source: components/scripts/data.js
// -------------------------------

var languages = [
  {
    name: "Czech",
    bcp47: "cs",
    sentences: [
      "Pojďme tady žít.",
      "Můžete si tuhle knihu přečíst.",
      "Nemohu najít mé zavazadlo.",
      "Sedí vedle svého bratra.",
      "Život je těžký.",
      "Víš, co máš dělat?"
    ],
    translations: [
      "Let's live here.",
      "You can read this book.",
      "I can't find my luggage.",
      "He's sitting next to his brother.",
      "Life is hard.",
      "Do you know what you have to do?"
    ]
  },
  {
    name: "Spanish",
    bcp47: "es",
    sentences: [
      "Creo que la decisión es justa.",
      "Bajaron del árbol.",
      "Hemos dividido el dinero entre los dos.",
      "Celebramos su cumpleaños con una fiesta.",
      "¿Tenemos más cerveza?",
      "Los pandas se alimentan de bambú."
    ],
    translations: [
      "I believe that the decision is just.",
      "They climbed down the tree.",
      "We divided the money between us.",
      "We celebrated his birthday with a party.",
      "Do we have any more beer?",
      "Pandas feed on bamboo grass."
    ]
  },
  {
    name: "German",
    bcp47: "de",
    sentences: [
      "Es gibt keinen Grund zu der Annahme, dass Tom der Dieb ist.",
      "Rutsch mir doch den Buckel runter!",
      "Nimm es nicht so ernst.",
      "Welches von beiden ist das Teurere?",
      "Tom ließ sich auf die Couch fallen.",
      "Das Matterhorn zu besteigen ist schwer."
    ],
    translations: [
      "There's no evidence to suggest that Tom was the thief.",
      "I want you to get off my back.",
      "Don't take things so seriously.",
      "Which is the more expensive of the two?",
      "Tom slumped on the couch.",
      "Climbing the Matterhorn is difficult."
    ]
  },
  {
    name: "Italian",
    bcp47: "it",
    sentences: [
      "Preferirebbe andare allo zoo o andare al cinema?",
      "Mi stavo chiedendo se vi sareste fatte vive oggi.",
      "Lui produce giocattoli in Cina.",
      "Io ho mangiato troppo cibo ieri.",
      "Il mio ginocchio continua a fare male.",
      "Forse sai dove sono i miei libri?"
    ],
    translations: [
      "Would you prefer to go to the zoo or go to a movie?",
      "I was wondering if you were going to show up today.",
      "He manufactures toys in China.",
      "I ate too much food yesterday.",
      "My knee keeps hurting.",
      "Maybe you know where my books are?"
    ]
  },
  {
    name: "Danish",
    bcp47: "da",
    sentences: [
      "Hun får altid sin vilje.",
      "Når man taler om solen, så skinner den.",
      "Taler du fransk hver dag?",
      "Tom ønskede ikke at tage afsted tomhændet.",
      "Betyder det at du bliver?",
      "Han er høj og tynd."
    ],
    translations: [
      "She always gets her own way.",
      "Speak of the devil and he is sure to appear.",
      "Do you speak French every day?",
      "Tom didn't want to leave empty-handed.",
      "Does that mean you'll stay?",
      "He's tall and slim."
    ]
  },
  {
    name: "Finnish",
    bcp47: "fi",
    sentences: [
      "Älä yritä tehdä kahta asiaa kerralla.",
      "Muista, mitä kerroin sinulle!",
      "Piilotteletko sinä jotakin?",
      "Herrasmies ei sylkisi kadulle.",
      "Ystäväni on puhelias henkilö.",
      "He kieltäytyivät."
    ],
    translations: [
      "Don't attempt two things at a time.",
      "Remember what I tell you!",
      "Are you hiding something?",
      "A gentleman would not spit on the street.",
      "My friend is a talkative person.",
      "They refused."
    ]
  },
  {
    name: "French",
    bcp47: "fr",
    sentences: [
      "J'ai fait un rêve bizarre.",
      "Où puis-je changer mon argent?",
      "Elles veulent juste s'amuser.",
      "Vous devriez écrire un roman.",
      "Je me rends chaque jour à l'église.",
      "Vous pouvez le faire si vous y mettez votre esprit."
    ],
    translations: [
      "I had a weird dream.",
      "Where can I get my money exchanged?",
      "They just want to have fun.",
      "You should write a novel.",
      "I go to church every day.",
      "You can do it if you put your mind to it."
    ]
  },
  {
    name: "Romanian",
    bcp47: "ro",
    sentences: [
      "Trebuie să faci ce-ți spun.",
      "Nu mai sunt lemne pentru foc.",
      "Zâmbetele nu indică întotdeauna bucuria.",
      "Toți au râs la gluma oratorului.",
      "Ar putea fi îngheț săptămâna viitoare.",
      "N-am avut timp să mă relaxez."
    ],
    translations: [
      "You must do as I tell you.",
      "There's no more firewood.",
      "Smiles do not always indicate pleasure.",
      "Everyone laughed at the speaker's joke.",
      "It may freeze next week.",
      "I didn't have time to relax."
    ]
  },
  {
    name: "Polish",
    bcp47: "pl",
    sentences: [
      "Z czego się tak cieszysz?",
      "Ten sklep sprzedaje dzienniki i magazyny.",
      "Czy Tom ci powiedział gdzie jest impreza?",
      "Surowo wzbronione.",
      "Okres ładnej pogody trwał długo.",
      "Jestem zbyt podekscytowany, by coś jeść."
    ],
    translations: [
      "Why are you so happy?",
      "That shop sells newspapers and magazines.",
      "Did Tom tell you where the party is?",
      "Strictly forbidden.",
      "We have had a long spell of hot weather.",
      "I'm too excited to eat anything."
    ]
  },
  {
    name: "Catalan",
    bcp47: "ca",
    sentences: [
      "En Tom acostuma a trucar noies.",
      "Té dues classes al matí i una a l'horabaixa.",
      "Ara he d'anar a aquella reunió.",
      "L'exèrcit d'en Napoleó ha avançat fins a Moscou.",
      "Els edificis de fusta es prenen foc fàcilment.",
      "És hora de que vagis al llit."
    ],
    translations: [
      "Tom is accustomed to calling up girls on the telephone.",
      "He has two classes in the morning and one in the afternoon.",
      "I need to get to this meeting now.",
      "Napoleon's army has advanced to Moscow.",
      "Wooden buildings catch fire easily.",
      "It's time for you to go to bed."
    ]
  }
];

var highScores = [];

function getRandomSentences(num, lang) {
  var chosenSentences = [];
  var array = [];
  function getSentence() {
    // Get random language, if no language argument specified, else use specified language.
    var languageNumber;
    if (!lang) {
      languageNumber = [Math.floor(Math.random() * languages.length)];
    } else {
      languageNumber = languages.findIndex(function (item) {
        return item.name === lang;
      });
    }
    var language = languages[languageNumber];
    // Get random sentence from language
    var randomSentenceNumber = Math.floor(
      Math.random() * language.sentences.length
    );
    var randomSentence = language.sentences[randomSentenceNumber];
    var translation = language.translations[randomSentenceNumber];
    // Check if selected sentence has already been added to our array. If not, add it.
    if (chosenSentences.indexOf(randomSentence) === -1) {
      chosenSentences.push(randomSentence);
      return {
        language: language.name,
        bcp47: language.bcp47,
        sentence: randomSentence,
        translation: translation
      };
      // If selected sentence has already been selected, run this function again (as long as there is enough sentences)
    } else if (
      !lang ||
      chosenSentences.length < languages[languageNumber].sentences.length
    ) {
      return getSentence();
    } else {
      // If there's not enough sentences, change the game length to the number of sentences available
      console.log("Not enough sentences!");
      window.game.gameLength = chosenSentences.length;
    }
  }
  for (var i = 0; i < num; i++) {
    // Add the randomly selected sentence to the game's array
    array.push(getSentence());
  }
  return array;
}

function getLanguagesList() {
  var languagesList = [];
  languages.forEach(function (item) {
    languagesList.push(item.name);
  });
  return languagesList.sort();
}

// -------------------------------
// Source: components/scripts/main.js
// -------------------------------

var game;
var speakBtn;
var continueBtn;
var revealPronunciationBtn;
var nextBtn;
var startButton;
var playAgainButton;
var gameContainer;
var finalScoreString;
var learningModeButton;
var languagesList;
var highScoresList;

function main() {
  gameContainer = document.getElementById("game-container");
  // Start by building splash screen
  buildSplash();
  // Check if SpeechRecognition API is available
  checkIfSpeechEnabled();
  // The first time speechSynthesis.getVoices is called on Chrome for Android, it returns no results as voices are loaded asynchronously. Calling it here so it's ready when needed.
  speechSynthesis.getVoices();
}

window.addEventListener("load", main);

function buildSplash() {
  var HTML = `
  <div class="row m-3 text-center" id="title-screen-title">
    <div class="col">
      <h1>Pronuncio</h1>
 
      <img src="images/robot-face.svg" alt="Robot face" class="jackInTheBox">
    </div>
  </div>
  <div class="row text-center">
  <div class="col-6"></div>
  <div class="col-6"><div class="speech-bubble rotateInUpLeft animation-delay"><p class="text-light p-3">Greetings. I am Pronuncio.</p></div></div>
  </div>
  
  <div class="row m-3 text-center">
    <div class="col">
      <label for="name-input">Your name</label>
      <input type="text" id="name-input" class="form-control" placeholder="Enter your name">
      <button class="btn btn-primary btn-lg mt-3" id="start-button">Regular Mode</button>
      <button class="btn btn-primary btn-lg mt-3" id="start-learning-mode-button">Learning Mode</button>
      
      <div class="form-group pt-3">
        <span class="switch switch">
          <input type="checkbox" class="switch" id="timed-mode-switch">
          <label for="timed-mode-switch">Pressure Mode</label>
        </span>
      </div>

    </div>
  </div>`;

  gameContainer.innerHTML = HTML;

  startButton = document.getElementById("start-button");
  learningModeButton = document.getElementById("start-learning-mode-button");

  // Do we really want to add event listeners in this function?
  startButton.addEventListener("click", function() {
    var name = document.getElementById("name-input").value;
    var timedMode = document.getElementById("timed-mode-switch").checked;
    handleStartButtonClicked(name, timedMode ? "timed" : "normal");
  });

  learningModeButton.addEventListener("click", function() {
    var name = document.getElementById("name-input").value;
    buildLanguagesList(name, "normal", getLanguagesList());
  });
}

function buildLanguagesList(playerName, option, list) {
  var HTML = `<div class="row m-3 text-center"><div class="col"><h1>Learning Mode</h1><p>Choose a language</p><div class="list-group m-3" id="languages-list"></div></div></div>`;

  gameContainer.innerHTML = HTML;

  languagesList = document.getElementById("languages-list");

  list.forEach(function(language) {
    var listItem = document.createElement("button");
    listItem.setAttribute("type", "button");
    listItem.classList.add("list-group-item");
    listItem.classList.add("list-group-item-action");
    listItem.innerText = language;
    languagesList.appendChild(listItem);
    // Add click handlers for each language. IIFE for maintaining language name in scope
    (function(lang) {
      listItem.addEventListener("click", function() {
        handleStartButtonClicked(playerName, option, lang);
        console.log(lang);
      });
    })(language);
  });
}

function buildGame() {
  var HTML = `
  <div id="zombie-spawner"></div>
  <div class="listening-overlay bg-success"></div>
  <div class="row m-3">
    <div class="col col-4">
      <h1 id="player-name">Name</h1>
    </div>
    <div class="col col-4 text-center">
      <h1 id="timer-display" class="d-none"></h1>
    </div>
    <div class="col col-4 text-right">
      <h1 id="player-score">0000</h1>
    </div>
  </div>
  
  <div class="row m-3">
    <div class="col">
      <div class="card" id="target-sentence">
        <div class="card-body text-center">
          <p class="card-text">foo</p>
        </div>
        <div class="card-footer text-muted text-center">
          <img src="images/flags/af.png" id="country-flag">
          <span class="card-text mb-0" id="target-language">English</span>
  
        </div>
      </div>
    </div>
  </div>
  
  <div class="row m-3">
    <div class="col">
      <div class="card" id="input-sentence">
        <div class="card-body text-center" id="input-card-body">
          <p class="card-text">foo</p>
  
        </div>
        <div class="card-footer text-muted text-center" id="similarity-score">
          <p class="card-text"></p>
        </div>
      </div>
    </div>
  </div>
  
  <div class="row m-3">
    <div class="col text-center">
      <button class="btn btn-primary btn-lg btn-block" id="speak-button">Speak</button>
    </div>
  </div>
  
  <div class="row m-3">
    <div class="col text-center col-3">
      <img src="images/robot-face.svg" alt="Robot face" id="robot-head">
    </div>
    <div class="col text-center col-9">
      <div class="speech-bubble">
        <p class="p-3 text-light" id="attempts-string"></p>
      </div>
    </div>
  </div>
  
  <div class="row m-3">
    <div class="col text-center">
      <button class="btn btn-primary btn-lg" id="continue-button">Continue</button>
      <button class="btn btn-primary btn-lg d-none" id="reveal-pronunciation-button">What should it sound like?</button>
      <button class="btn btn-primary btn-lg d-none" id="next-button">Next</button>
    </div>
  </div>
  
  <div class="row m-3">
    <div class="col">
      <div class="progress" id="progress-bar">
        <div class="progress-bar" role="progressbar" style="width: 0%" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100" id="current-level-bar"></div>
      </div>
    </div>
  </div>
  `;

  gameContainer.innerHTML = HTML;

  speakBtn = document.getElementById("speak-button");
  continueBtn = document.getElementById("continue-button");
  revealPronunciationBtn = document.getElementById(
    "reveal-pronunciation-button"
  );
  nextBtn = document.getElementById("next-button");

  speakBtn.addEventListener("click", function() {
    game.player.handleSpeakButtonClick();
  });

  continueBtn.addEventListener("click", function() {
    game.handleContinueButton();
  });

  revealPronunciationBtn.addEventListener("click", function() {
    game.handleRevealPronunciationButton();
  });

  nextBtn.addEventListener("click", function() {
    game.handleNextButton();
  });
}

function buildGameOver(score, highScores) {
  var HTML = `
  <div class="row m-3">
    <div class="col text-center">
     <h1>Game Over</h1>
      <h2 id="final-score">You scored: 0000</h2>
      <button class="btn btn-lg btn-primary mb-3" id="play-again-btn">Play again?</button>
      <h3>High Scores</h3>
      <ul class="list-group m-3" id="high-scores-list"></ul>
    </div>
  </div>
  `;

  gameContainer.innerHTML = HTML;
  drawFinalScore(score);

  highScoresList = document.getElementById("high-scores-list");

  highScores.forEach(function(score) {
    var listItem = document.createElement("li");
    listItem.classList.add("list-group-item");
    listItem.innerHTML =
      `<p class="font-weight-bold">` +
      score.playerName +
      `</p><p>` +
      score.score +
      `</p>`;
    highScoresList.appendChild(listItem);
  });

  playAgainButton = document.getElementById("play-again-btn");

  playAgainButton.addEventListener("click", function() {
    game.handlePlayAgainButton();
  });
}

function buildIncompatibleScreen() {
  var HTML = `
  <div class="row m-3 text-center" id="title-screen-title">
    <div class="col">
      <h1>Pronuncio</h1>
      <img src="images/robot-face.svg" alt="Robot face">
    </div>
  </div>
  <div class="row m-3 text-center">
    <div class="col">
      <h2>Incompatible Browser</h2>
      <p>Unfortunately, the browser you are using does not support the speech recognition functionality requied by Pronuncio.</p>
      <p>Pronuncio is currently only supported on the Chrome browser for Android and desktop devices.</p>
    </div>
  </div>`;

  gameContainer.innerHTML = HTML;
}

function drawFinalScore(score) {
  finalScoreString = document.getElementById("final-score");
  finalScoreString.innerText = "You scored: " + score;
}

function drawFlag(bcp47) {
  document
    .getElementById("country-flag")
    .setAttribute("src", "images/flags/" + bcp47 + ".png");
}

function handleStartButtonClicked(nameInputValue, option, lang) {
  game = new Game();
  game.createPlayer(nameInputValue);
  buildGame();
  game.startGame(option, lang);
}

function hideNextButtons() {
  nextBtn.classList.add("d-none");
  revealPronunciationBtn.classList.add("d-none");
}

function showNextButtons() {
  nextBtn.classList.remove("d-none");
  revealPronunciationBtn.classList.remove("d-none");
  enableRevealPronunciationButton();
}

function fillInData(name, score, sentence, language, allowedAttempts) {
  document.getElementById("player-name").innerText = name;
  document.getElementById("player-score").innerText = score;
  document.querySelector("#target-sentence p").innerText = sentence;
  document.getElementById("input-card-body").innerHTML = "<span>&nbsp;</span>";
  document.getElementById("target-language").innerText = language;
  document.querySelector("#similarity-score p").innerHTML =
    "<p class='card-text'>&nbsp;</p>";
  document.getElementById("attempts-string").innerText = "";
}

function drawDiffedStrings(diff) {
  var displayDiv = document.getElementById("input-card-body");
  var fragment = document.createDocumentFragment();

  diff.forEach(function(part) {
    // Part added / removed / correct
    var colorClass = part.added
      ? "text-danger"
      : part.removed
        ? "text-dark"
        : "text-success";

    var span = document.createElement("span");
    span.classList.add(colorClass);
    if (!part.removed) {
      span.appendChild(document.createTextNode(part.value));
      fragment.appendChild(span);
    }
  });

  displayDiv.innerHTML = "";
  displayDiv.appendChild(fragment);
}

function drawBadge(score) {
  var displayDiv = document.getElementById("input-card-body");
  var span = document.createElement("span");
  span.classList.add("badge");
  if (score > 80) {
    span.classList.add("badge-success");
  } else if (score > 30) {
    span.classList.add("badge-warning");
  } else {
    span.classList.add("badge-danger");
  }
  span.innerText = score + "%";
  displayDiv.appendChild(span);
}

function drawCurrentScore(score) {
  document.querySelector("#similarity-score p").innerText = score;
}

function drawAttemptString(string) {
  document.getElementById("attempts-string").innerText = string;
  showSpeechBubble();
}

function showTimer() {
  document.getElementById("timer-display").classList.remove("d-none");
}

function hideProgressBar() {
  document.getElementById("progress-bar").classList.add("d-none");
}

function drawTimer() {
  document.getElementById("timer-display").innerText = game.timer;
}

function drawTranslation(translation) {
  document.querySelector("#similarity-score p").innerText = translation;
}

function disableSpeakButton() {
  speakBtn.setAttribute("disabled", true);
  speakBtn.classList.add("btn-secondary");
}

function disableRevealPronunciationButton() {
  revealPronunciationBtn.setAttribute("disabled", true);
  revealPronunciationBtn.classList.add("btn-secondary");
}

function enableSpeakButton() {
  speakBtn.removeAttribute("disabled");
  speakBtn.classList.remove("btn-secondary");
}

function enableRevealPronunciationButton() {
  revealPronunciationBtn.removeAttribute("disabled");
  revealPronunciationBtn.classList.remove("btn-secondary");
}

function hideContinueButton() {
  continueBtn.classList.add("d-none");
}

function showContinueButton() {
  continueBtn.classList.remove("d-none");
}

function drawListening() {
  var speakBtn = document.getElementById("speak-button");
  speakBtn.classList.add("btn-success");
  speakBtn.classList.add("pulse");
  speakBtn.setAttribute("disabled", true);
  document.querySelector(".listening-overlay").classList.add("listening");
}

function drawListeningStopped() {
  var speakBtn = document.getElementById("speak-button");
  speakBtn.classList.remove("btn-success");
  speakBtn.classList.remove("pulse");
  speakBtn.removeAttribute("disabled");
  document.querySelector(".listening-overlay").classList.remove("listening");
}

function drawProgressBar(percent) {
  var progressBar = document.getElementById("current-level-bar");
  progressBar.setAttribute("style", "width: " + percent + "%");
  progressBar.setAttribute("aria-valuenow", percent);
}

function hideSpeechBubble() {
  document.querySelector(".speech-bubble").classList.add("d-none");
}

function showSpeechBubble() {
  var speechBubble = document.querySelector(".speech-bubble");
  speechBubble.classList.remove("d-none");
  speechBubble.classList.add("rotateInUpLeft");
}

function checkIfSpeechEnabled() {
  if (
    !(
      window.SpeechRecognition ||
      window.webkitSpeechRecognition ||
      window.mozSpeechRecognition ||
      window.msSpeechRecognition
    )
  ) {
    // SpeechRecognition API not available in browser
    buildIncompatibleScreen();
  }
}

function hideInputCard() {
  document.getElementById("input-sentence").classList.add("d-none");
}

function showInputCard() {
  document.getElementById("input-sentence").classList.remove("d-none");
}

// -------------------------------
// Source: components/scripts/game.js
// -------------------------------

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

  addScoreToHighScores() {
    const scoreObject = { playerName: this.player.name, score: this.player.score };
    highScores.push(scoreObject);
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

  speakSentence(sentence, languageBcp47String) {
    const utterance = new SpeechSynthesisUtterance(sentence);
    utterance.lang = languageBcp47String;
    window.speechSynthesis.speak(utterance);
  }

  getAvailableSpeechSynthesisLanguages() {
    const supported = [];
    const voices = speechSynthesis.getVoices();
    voices.forEach(({lang}) => {
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
      .then(({text}) => drawTranslation(text[0]))
      .catch(err => {
        //error block
      });
  }

  getHighScores(num) {
    const scores = highScores.slice(0);

    scores.sort(({score}, {score}) => score - score);

    return scores.slice(0, num);
  }

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
    zombies.forEach(({offsetTop}) => {
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

// -------------------------------
// Source: components/scripts/player.js
// -------------------------------

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
