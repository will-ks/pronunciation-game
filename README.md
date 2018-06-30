# # Pronuncio

<img src="images/robot-face.svg" alt="Pronuncio robot" width="350" height="350">

Pronuncio is a web game, in which the aim is to pronounce sentences in different languages as accurately as possible. It can be played just for fun, or as a learning aid for practicing pronunciation of a language you are learning.

Pronuncio was built in one week as a practice project at [Ironhack](http://www.ironhack.com) coding bootcamp, Barcelona, after two weeks of studying frontend JavaScript, HTML and CSS.

## Features

- Randomised sentences in different languages
- Speech recognition (using [Web Speech API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Speech_API))
- Speech synthesis (also using [Web Speech API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Speech_API))
- Translation (using [Yandex Translate API](https://tech.yandex.com/translate/))
- Different game modes
  _ Regular (random languages)
  _ Learning (choose a target language)
  _ Pressure (play either mode with a time limit)
  _ Hidden easter egg zombie mode, The Pronuncio of the Dead
- Local high scores

## Play it

[https://dambusm.github.io/pronunciation-game/](https://dambusm.github.io/pronunciation-game/)

## To Do

Future developments planned for Pronuncio:

- Add a backend for storing sentence data, player accounts and high scores
- Redevelop using either Angular or React, and produce a mobile version using NativeScript or React Native

## Limitations

- The Speech Recognition component of the Web Speech API, which the game relies upon, has [limited browser support](https://www.caniuse.com/#feat=speech-recognition). This means that unfortunately the game currently is only known to work on Chrome for Desktop and Chrome for Android. Samsung Browser and Firefox (with the `media.webspeech.recognition.enable` flag in about:config enabled) may also work, though untested.
