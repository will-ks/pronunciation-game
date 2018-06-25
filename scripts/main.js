"use strict";

function main() {
  function getGameContainer() {
    return document.getElementById("game-container");
  }

  function buildSplash() {
    var HTML = `<div class="row">
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

    gameContainer.innerHTML = HTML;
  }

  function buildGame() {
    var HTML = `<div class="row m-3">
      <div class="col col-6">
        <h1>Name</h1>
      </div>
      <div class="col col-6 text-right">
        <h1>0000</h1>
      </div>
    </div>

    <div class="row m-3">
      <div class="col">
        <div class="card" id="target-sentence">
          <!-- <img class="card-img-top" src="https://cdn.rawgit.com/hjnilsson/country-flags/master/svg/ad.svg" alt="Andorra flag "></img> -->
          <div class="card-body ">
            <p class="card-text text-center ">foo</p>
          </div>
        </div>
      </div>
    </div>
    <div class="row m-3">
      <div class="col text-center">
        <button class="btn btn-primary btn-lg" id="speak-button">Speak</button>
      </div>
    </div>
    <div class="row m-3">
      <div class="col">
        <div class="card" id="input-sentence">
          <div class="card-body ">
            <p class="card-text text-center ">foo</p>

          </div>
        </div>
      </div>
    </div>
    <div class="row m-3">
      <div class="col text-center">
        <button class="btn btn-primary btn-lg d-none" id="speak-button">Continue</button>
      </div>
    </div>`;

    var gameContainer = getGameContainer();

    gameContainer.innerHTML = HTML;
  }

  function buildGameOver() {
    var HTML = `<div class="row m-3">
      <div class="col text-center">
        <h1>Game Over</h1>
        <h2>You scored: 0000</h2>
        <button class="btn btn-lg btn-primary">Play again?</button>
      </div>
    </div>`;

    var gameContainer = getGameContainer();

    gameContainer.innerHTML = HTML;
  }
}

window.addEventListener("load", main);
