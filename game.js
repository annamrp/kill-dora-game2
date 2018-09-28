'use strict';

//constructor del juego
function Game(){
  var self = this;

  self.score = 0;
  self.time;
}

Game.prototype.start = function (){
  var self = this;

  self.gameMain = buildDom(`
    <main class="game container">
      <header>
        <div class="score">
          <p class="label">Score: <span class="value"></span>
          </p>
        <div class="timer">
          <p class="label">Time: <span class="value"></span>
          </p>
        </div>
      </header>
      <div class="game-board">
      </div>
    </main>
  `)
  
  self.scoreElement = self.gameMain.querySelector('.score span');
  self.timerElement = self.gameMain.querySelector('.timer span');
  self.button = self.gameMain.querySelector('button')
  self.boardElement = self.gameMain.querySelector('div.game-board');

  //event listener para que reconozca los clicks en el documento - ¿¿Debería ir en la tabla??
  //self.boardElement.addEventListener('click', killDora);

  document.body.appendChild(self.gameMain);
  
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

Game.prototype.destroy = function(){
  var self = this;

  self.gameMain.remove();
}