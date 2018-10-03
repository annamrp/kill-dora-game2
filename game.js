"use strict";

//constructor del juego
function Game() {
  var self = this;

  self.score = 0;
  self.timer = null;
  self.lives = 6;
  self.mochila;
  self.onGameOverCallback = null;
}

Game.prototype.start = function() {
  var self = this;

  self.gameMain = buildDom(`
    <main class="game container">
      <header>
        <div class="score">
          <span class="label">Score: </span>
          <span class="value"></span>
        </div>
        <div class="lives">
          <span class="label">Lives:  </span>
          <span class="value"></span>
        </div>
        <div class="timer">
          <span class="label">Time:  </span>
          <span class="value"></span>
        </div>
      </header>
      <div class="game-board">
      </div>
    </main>
  `);

  self.scoreElement = self.gameMain.querySelector(".score .value");
  self.timerElement = self.gameMain.querySelector(".timer .value");
  self.livesElement = self.gameMain.querySelector(".lives .value");

  self.button = self.gameMain.querySelector("button");
  self.boardElement = self.gameMain.querySelector(".game-board");
  self.scoreElement.innerText = self.score;
  self.livesElement.innerText = self.lives;

  self.handleClick = function(event) {
    self.killDora(event.target);
  };

  self.boardElement.addEventListener("click", self.handleClick);
  document.body.appendChild(self.gameMain);

  self.dora = {};

  self.startTimer();
  self.buildBoard();
  self.doraSong();
};

Game.prototype.buildBoard = function() {
  var self = this;

  self.rows = 3;
  self.columns = 3;

  self.boardDiv = document.querySelector(".game-board");
  self.table = document.createElement("table");

  self.counter = 0;
  for (self.x = 0; self.x < self.rows; self.x++) {
    self.row = document.createElement("tr");

    for (self.y = 0; self.y < self.columns; self.y++) {
      self.cell = document.createElement("td");
      self.image = document.createElement("img");
      self.counter++;

      self.cell.classList.add(self.counter);

      self.row.appendChild(self.cell);
    }
    self.table.appendChild(self.row);
  }

  self.boardDiv.appendChild(self.table);
};

Game.prototype.randomDora = function() {
  var self = this;

  self.randomNum = Math.floor(Math.random() * self.counter + 1);

  self.randomCell = document.querySelector('[class="' + self.randomNum + '"]');

  self.dora.cell = self.randomCell;
};

Game.prototype.showDora = function() {
  var self = this;

  self.randomDora();
  self.dora.cell.classList.add("show-element");
  setTimeout(function() {
    self.dora.cell.classList.remove("show-element");
  }, 750);
};

Game.prototype.killDora = function(cell) {
  var self = this;

  if (cell.classList.contains("show-element")) {
    self.doraScream();
    self.score++;
    self.scoreElement.innerText = self.score;
    cell.classList.add("dead-dora");
    setTimeout(function() {
      cell.classList.remove("dead-dora");
    }, 250);
  } else if (!cell.classList.contains("show-element")) {
    self.lives--;
    self.livesElement.innerText = self.lives;
    self.teasingSound();
    if (self.lives === 0) {
      self.timer = 0;
      clearInterval(self.intervalID);
      self.onGameOverCallback();
      self.stopDoraSong();
    }
  }
};

Game.prototype.doraScream = function() {
  self.scream = new Audio("./sonidos/grito_de_una_mujer.mp3");
  self.scream.play();
};
Game.prototype.teasingSound = function() {
  self.teasing = new Audio("./sonidos/nanana.mp3");
  self.teasing.play();
};
Game.prototype.doraSong = function() {
  self.mochila = new Audio("./sonidos/cancion-mochila.mp3");
  self.mochila.play();
};

Game.prototype.stopDoraSong = function() {
  self.mochila.pause();
};

Game.prototype.startTimer = function() {
  var self = this;

  self.timer = 20;
  self.timerElement.innerText = self.timer;
  self.intervalID = setInterval(function() {
    self.timer--;
    self.timerElement.innerText = self.timer;
    self.showDora();
    if (self.timer === 0) {
      clearInterval(self.intervalID);
      self.onGameOverCallback();
    }
  }, 1000);
};

Game.prototype.onOver = function(callback) {
  var self = this;

  self.onGameOverCallback = callback;
};

Game.prototype.destroy = function() {
  var self = this;

  self.gameMain.remove();
};
