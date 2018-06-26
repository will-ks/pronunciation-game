var languages = [
  {
    name: "Afrikaans",
    bcp47: "af",
    sentences: [
      "Ek hou van druiwe, maar kan nie te veel daarvan eet nie.",
      "Ek moet my kamer opruim.",
      "Hulle gee 'n paar tree vorentoe."
    ],
    translations: [
      "I like grapes, but I can't eat too many of them.",
      "I should clean my room.",
      "They stepped a few paces forward."
    ]
  },
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
    bcp47: "es-ES",
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
    bcp47: "de-DE",
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
  }
];

function getRandomSentences(num) {
  var array = [];
  for (var i = 0; i < num; i++) {
    var randomLanguage =
      languages[Math.floor(Math.random() * languages.length)];
    var randomSentenceNumber = Math.floor(
      Math.random() * randomLanguage.sentences.length
    );
    array.push({
      language: randomLanguage.name,
      bcp47: randomLanguage.bcp47,
      sentence: randomLanguage.sentences[randomSentenceNumber],
      translation: randomLanguage.translations[randomSentenceNumber]
    });
  }
  return array;
}
