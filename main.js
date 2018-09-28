'use strict';

function buildDom(html){
  var div = document.createElement('div');
  div.innerHTML = html;
  return div.children[0];
}

function main(){
 
  var splashMain;
  var gameOverMain;

  function buildSplash(){

   //destroyGameOver();

    splashMain = buildDom(`
      <main>
        <h1>Kill Dora</h1>
        <button>Start Game</button>
      <main>`);

    document.body.appendChild(splashMain);
    var button = splashMain.querySelector('button');
    button.addEventListener('click', buildGame)
  }

  function destroySplash(){
    splashMain.remove();
  }

  function buildGame(){
    destroySplash()

    var game = new Game();
    game.start();

  }

  function destroyGame(){
    game.destroy();
  }

  /*
  function buildGameOver(){
    gameOverMain = buildDom(`
      <main>
        <h1>Game Over</h1>
        <p>Score: <span></span></p>
        <button>Restart Game</button>
      <main>`)
    
      document.body.appendChild(splashMain);
      var button = splashMain.querySelector('button');
      var span = splashMain.querySelector('span');
      span.innerText = 'score';
      button.addEventListener('click', buildSplash); 
  }

  function destroyGameOver(){
    gameOverMain.remove();
  }
 */
  buildSplash();
}

window.addEventListener('load', main);
