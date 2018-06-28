"use strict";

var languages = [
  {
    name: "Czech",
    bcp47: "cs",
    sentences: [
      "Pojďme tady žít.",
      "Můžete si tuhle knihu přečíst.",
      "Nemohu najít mé zavazadlo."
    ],
    translations: [
      "Let's live here.",
      "You can read this book.",
      "I can't find my luggage."
    ]
  },
  {
    name: "Spanish",
    bcp47: "es",
    sentences: [
      "Creo que la decisión es justa.",
      "Bajaron del árbol.",
      "Hemos dividido el dinero entre los dos."
    ],
    translations: [
      "I believe that the decision is just.",
      "They climbed down the tree.",
      "We divided the money between us."
    ]
  },
  {
    name: "German",
    bcp47: "de",
    sentences: [
      "Es gibt keinen Grund zu der Annahme, dass Tom der Dieb ist.",
      "Rutsch mir doch den Buckel runter!",
      "Nimm es nicht so ernst."
    ],
    translations: [
      "There's no evidence to suggest that Tom was the thief.",
      "I want you to get off my back.",
      "Don't take things so seriously."
    ]
  },
  {
    name: "Italian",
    bcp47: "it",
    sentences: [
      "Preferirebbe andare allo zoo o andare al cinema?",
      "Mi stavo chiedendo se vi sareste fatte vive oggi.",
      "Lui produce giocattoli in Cina."
    ],
    translations: [
      "Would you prefer to go to the zoo or go to a movie?",
      "I was wondering if you were going to show up today.",
      "He manufactures toys in China."
    ]
  },
  {
    name: "Danish",
    bcp47: "da",
    sentences: [
      "Hun får altid sin vilje.",
      "Når man taler om solen, så skinner den.",
      "Taler du fransk hver dag?"
    ],
    translations: [
      "She always gets her own way.",
      "Speak of the devil and he is sure to appear.",
      "Do you speak French every day?"
    ]
  },
  {
    name: "Estonian",
    bcp47: "et",
    sentences: [
      "Tomi käed on räpased.",
      "Päike on punane.",
      "Kas teil õlut on?"
    ],
    translations: [
      "Tom's hands are dirty.",
      "The sun is red.",
      "Do you have any beer?"
    ]
  },
  {
    name: "Finnish",
    bcp47: "fi",
    sentences: [
      "Älä yritä tehdä kahta asiaa kerralla.",
      "Muista, mitä kerroin sinulle!",
      "Piilotteletko sinä jotakin?"
    ],
    translations: [
      "Don't attempt two things at a time.",
      "Remember what I tell you!",
      "Are you hiding something?"
    ]
  },
  {
    name: "French",
    bcp47: "fr",
    sentences: [
      "J'ai fait un rêve bizarre.",
      "Où puis-je changer mon argent?",
      "Elles veulent juste s'amuser."
    ],
    translations: [
      "I had a weird dream.",
      "Where can I get my money exchanged?",
      "They just want to have fun."
    ]
  },
  {
    name: "Romanian",
    bcp47: "ro",
    sentences: [
      "Trebuie să faci ce-ți spun.",
      "Nu mai sunt lemne pentru foc.",
      "Zâmbetele nu indică întotdeauna bucuria."
    ],
    translations: [
      "You must do as I tell you.",
      "There's no more firewood.",
      "Smiles do not always indicate pleasure."
    ]
  },
  {
    name: "Polish",
    bcp47: "pl",
    sentences: [
      "Z czego się tak cieszysz?",
      "Ten sklep sprzedaje dzienniki i magazyny.",
      "Czy Tom ci powiedział gdzie jest impreza?"
    ],
    translations: [
      "Why are you so happy?",
      "That shop sells newspapers and magazines.",
      "Did Tom tell you where the party is?"
    ]
  },
  {
    name: "Catalan",
    bcp47: "ca",
    sentences: [
      "En Tom acostuma a trucar noies.",
      "Té dues classes al matí i una a l'horabaixa.",
      "Ara he d'anar a aquella reunió."
    ],
    translations: [
      "Tom is accustomed to calling up girls on the telephone.",
      "He has two classes in the morning and one in the afternoon.",
      "I need to get to this meeting now."
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
      languageNumber = languages.findIndex(function(item) {
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
  languages.forEach(function(item) {
    languagesList.push(item.name);
  });
  return languagesList.sort();
}
