"use strict";

function main() {
  function buildSplash() {
    var splashHTML = `<div class="row">
    <div class="col">
      <h1>Amazing Game</h1>
    </div>
  </div>

  <div class="row">

    <div class="col">
      <label for="name-input">Your name</label>
      <input type="text" id="name-input" class="form-control" placeholder="Enter your name">
      <button class="btn btn-primary btn-lg">Start</button>
    </div>
  </div>`;

    var gameContainer = getGameContainer();

    gameContainer.innerHTML = splashHTML;
  }

  buildSplash();

  function getGameContainer() {
    return document.getElementById("game-container");
  }
}

window.addEventListener("load", main);
