'use strict';

//constructor del juego
function Game(){
  var self = this;

  self.score = 0;
  self.timer = null;
  self.onGameOverCallback = null;
}

Game.prototype.start = function (){
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
  `)
  
  self.scoreElement = self.gameMain.querySelector('.score .value');
  self.timerElement = self.gameMain.querySelector('.timer .value');
  self.button = self.gameMain.querySelector('button')
  self.boardElement = self.gameMain.querySelector('div.game-board');

  //event listener para que reconozca los clicks - ¿¿Debería ir en el document??
  //self.boardElement.addEventListener('click', killDora);

  document.body.appendChild(self.gameMain);
  self.startTimer();
}


/* falta como añadir la tabla al DOM => Crear una tabla en html con el loop
Game.prototype.buildBoard = function (){
  self.board = new Array(3);
  for (var x = 0; x < 3; x++){
    self.board[x] = new Array(3);
    for (var y = 0; y < 3; y++){
      self.board[x][y] = null;
    }
  }
}*/

Game.prototype.startTimer = function(){
  var self = this;
  self.timer = 2;
  self.timerElement.innerText = self.timer;
  self.intervalID = setInterval(function() {
    self.timer --;
    self.timerElement.innerText = self.timer;
    if(self.timer === 0){
      clearInterval(self.intervalID);
      self.onGameOverCallback();   
    }
  },1000)
}

Game.prototype.onOver = function (callback) {
  var self = this;

  self.onGameOverCallback = callback;
};

Game.prototype.destroy = function(){
  var self = this;

  self.gameMain.remove();
}