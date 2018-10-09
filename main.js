"use strict";

let buildDom = html => {
  const div = document.createElement("div");
  div.innerHTML = html;
  return div.children[0];
};

const main = () => {
  let splashMain;
  let gameOverMain;
  let game;

  const buildSplash = () => {
    destroyGameOver();

    splashMain = buildDom(`
      <main id="splash">
        <h1>KiLL DoRa</h1>
        <button>Start Game</button>
      </main>`);

    document.body.appendChild(splashMain);
    const button = splashMain.querySelector("button");
    button.addEventListener("click", buildGame);
  };

  const destroySplash = () => splashMain.remove();
  

  const buildGame = () => {
    destroySplash();

    game = new Game();
    game.start();
    game.onOver(() => gameOver(game.score));
  };

  const destroyGame = () => game.destroy();
  

  const gameOver = score => {
    destroyGame();
    buidlGameOver(score);
  };

  const buidlGameOver = score => {
    gameOverMain = buildDom(`
      <main id="game-over">
        <h1>Game Over</h1>
        <p>Score: <span></span></p>
        <button>Restart Game</button>
      </main>`);

    document.body.appendChild(gameOverMain);
    const button = gameOverMain.querySelector("button");
    const span = gameOverMain.querySelector("span");
    span.innerText = score;
    button.addEventListener("click", buildSplash);
  };

  const destroyGameOver = () => {
    if (gameOverMain) {
      gameOverMain.remove();
    }
  };

  buildSplash();
};

window.addEventListener("load", main);
