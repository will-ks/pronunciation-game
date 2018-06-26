var languages = [
  {
    name: "Spanish",
    bcp47: "es-ES",
    sentences: ["hola", "como estas", "me gusta"]
  },
  {
    name: "French",
    bcp47: "fr-FR",
    sentences: ["ooh lala", "je suis francais", "mon dieu"]
  },
  {
    name: "English",
    bcp47: "en-US",
    sentences: ["hello", "what's up", "she sells sea shells by the sea shore"]
  },
  {
    name: "German",
    bcp47: "de-DE",
    sentences: ["nein", "das ist verboten", "ein zwei drei"]
  }
];

function getRandomSentences(num) {
  var array = [];
  for (var i = 0; i < num; i++) {
    var randomLanguage =
      languages[Math.floor(Math.random() * languages.length)];
    var randomSentence =
      randomLanguage.sentences[
        Math.floor(Math.random() * randomLanguage.sentences.length)
      ];
    array.push({
      language: randomLanguage.name,
      bcp47: randomLanguage.bcp47,
      sentence: randomSentence
    });
  }
  return array;
}
