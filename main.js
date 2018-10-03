'use strict';

function buildDom(html){
  var div = document.createElement('div');
  div.innerHTML = html;
  return div.children[0];
}

function main(){
 
  var splashMain;
  var gameOverMain;
  var game;

  function buildSplash(){

   destroyGameOver();

    splashMain = buildDom(`
      <main id="splash">
        <h1>KiLL DoRa</h1>
        <button>Start Game</button>
      </main>`);

    document.body.appendChild(splashMain);
    var button = splashMain.querySelector('button');
    button.addEventListener('click', buildGame)
  }

  function destroySplash(){
    splashMain.remove();
  }

  function buildGame(){
    destroySplash()

    game = new Game();
    game.start();
    game.onOver(function (){
      gameOver(game.score);
    });
  }

  function destroyGame(){
    game.destroy();
  }

  function gameOver(score){
    destroyGame();
    buidlGameOver(score);
  }
  
  function buidlGameOver(score){
    gameOverMain = buildDom(`
      <main id="game-over">
        <h1>Game Over</h1>
        <p>Score: <span></span></p>
        <button>Restart Game</button>
      </main>`)
    
      document.body.appendChild(gameOverMain);
      var button = gameOverMain.querySelector('button');
      var span = gameOverMain.querySelector('span');
      span.innerText = score;
      button.addEventListener('click', buildSplash); 
  }

  function destroyGameOver(){
    if(gameOverMain){
    gameOverMain.remove();
    }
  }
 
  buildSplash();
}

window.addEventListener('load', main);
