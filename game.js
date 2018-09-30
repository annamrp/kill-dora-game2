"use strict";

//constructor del juego
function Game() {
  var self = this;

  self.score = 0;
  self.timer = null;
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
  self.button = self.gameMain.querySelector("button");
  self.boardElement = self.gameMain.querySelector('.game-board');

  //event listener para que reconozca los clicks - ¿¿Debería ir en el document??
  //self.boardElement.addEventListener('click', killDora);

  document.body.appendChild(self.gameMain);

  self.startTimer();
  self.buildBoard();
};

Game.prototype.buildBoard = function() {
  var self = this;

  self.boardDiv = document.querySelector('.game-board')
  self.table = document.createElement("table");
 
  for (self.x = 0; self.x < 3; self.x++) {
    self.row = document.createElement("tr");
    self.row.className = self.x
    for (self.y = 0; self.y < 3; self.y++) {
      self.cell = document.createElement("td");
      self.cell.className = self.y;
      self.row.appendChild(self.cell);
    }
    self.table.appendChild(self.row);
  }

  self.boardDiv.appendChild(self.table)
};


Game.prototype.startTimer = function() {
  var self = this;
  self.timer = 20;
  self.timerElement.innerText = self.timer;
  self.intervalID = setInterval(function() {
    self.timer--;
    self.timerElement.innerText = self.timer;
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
