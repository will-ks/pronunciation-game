"use strict";

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
