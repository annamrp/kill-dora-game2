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
  self.boardElement = self.gameMain.querySelector(".game-board");

  //event listener para que reconozca los clicks
  //self.boardElement.addEventListener('click', killDora);

  document.body.appendChild(self.gameMain);

  self.dora = {};


  self.startTimer();
  self.buildBoard();
  //self.randomDora();
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
      self.counter ++;

      self.cell.classList.add(self.counter);
      self.image.classList.add("image");

      self.cell.appendChild(self.image);
      self.row.appendChild(self.cell);
    }
    self.table.appendChild(self.row);
  }

  self.boardDiv.appendChild(self.table);
};
/*
 var board = new Array(3);
  for (var x = 0; x < 10; x++){
    board[x] = new Array(10);
    for(var y = 0; y < 10; y++){
      board[x][y] = null;
    }
*/

Game.prototype.randomDora = function() {
  var self = this;

  self.randomNum = Math.floor(Math.random() * self.counter+1);

  //self.randomCell = document.querySelector('.\\' + self.randomNum);
  self.randomCell = document.querySelector('[class="'+ self.randomNum + '"]');
  self.doraImage = document.querySelector('.image');
  self.dora.cell = self.randomCell;
  console.log(self.dora);
};

Game.prototype.showDora = function() {
  var self = this;
  self.randomDora();
  //self.dora.cell.classList.toggle('show-element');
  
 
 
 
 
 // if (self.dora.cell.classList.contains('show-element')){
   // self.dora.cell.classList.toggle('hide-element')
    //self.randomDora();

  //}
  
}



/*
  while (self.timer > 0) {
    self.intervalID = setInterval(function() {
    
    }, 3000);
    if(self.timer === 0){
      clearInterval(intervalID);
    }
  }
*/


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
