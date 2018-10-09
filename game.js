"use strict";

class Game {
  constructor() {
    this.score = 0;
    this.timer = null;
    this.lives = 6;
    this.mochila;
    this.onGameOverCallback = null;
  }

  start() {
    this.gameMain = buildDom(`
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

    this.scoreElement = this.gameMain.querySelector(".score .value");
    this.timerElement = this.gameMain.querySelector(".timer .value");
    this.livesElement = this.gameMain.querySelector(".lives .value");

    this.button = this.gameMain.querySelector("button");
    this.boardElement = this.gameMain.querySelector(".game-board");
    this.scoreElement.innerText = this.score;
    this.livesElement.innerText = this.lives;

    this.handleClick = event => this.killDora(event.target);

    this.boardElement.addEventListener("click", this.handleClick);
    document.body.appendChild(this.gameMain);

    this.dora = {};

    this.startTimer();
    this.buildBoard();
    this.doraSong();
  }

  buildBoard() {
    this.rows = 3;
    this.columns = 3;

    this.boardDiv = document.querySelector(".game-board");
    this.table = document.createElement("table");

    this.counter = 0;
    for (this.x = 0; this.x < this.rows; this.x++) {
      this.row = document.createElement("tr");

      for (this.y = 0; this.y < this.columns; this.y++) {
        this.cell = document.createElement("td");
        this.image = document.createElement("img");
        this.counter++;

        this.cell.classList.add(this.counter);

        this.row.appendChild(this.cell);
      }
      this.table.appendChild(this.row);
    }

    this.boardDiv.appendChild(this.table);
  }

  randomDora() {
    this.randomNum = Math.floor(Math.random() * this.counter + 1);

    this.randomCell = document.querySelector('[class="' + this.randomNum + '"]' );
     
    this.dora.cell = this.randomCell;
  }

  showDora() {

    this.randomDora();

    if (this.score < 10) {
      this.dora.cell.classList.add("show-element");
      setTimeout(() => this.dora.cell.classList.remove("show-element"), 750);
    } else {
      this.dora.cell.classList.add("show-element");
      setTimeout(() => this.dora.cell.classList.remove("show-element"), 550);
    }
  }

  killDora(cell) {
    if (cell.classList.contains("show-element")) {
      this.doraScream();
      this.score++;
      this.scoreElement.innerText = this.score;
      cell.classList.add("dead-dora");
      setTimeout(() => cell.classList.remove("dead-dora"), 250);
    } else if (!cell.classList.contains("show-element")) {
      this.lives--;
      this.livesElement.innerText = this.lives;
      this.teasingSound();
      if (this.lives === 0) {
        this.timer = 0;
        clearInterval(this.intervalID);
        this.onGameOverCallback();
        this.stopDoraSong();
      }
    }
  }

  doraScream() {
    this.scream = new Audio("./sonidos/grito_de_una_mujer.mp3");
    this.scream.play();
  }

  teasingSound() {
    this.teasing = new Audio("./sonidos/nanana.mp3");
    this.teasing.play();
  }

  doraSong() {
    this.mochila = new Audio("./sonidos/cancion-mochila.mp3");
    this.mochila.play();
  }

  stopDoraSong() {
    this.mochila.pause();
  }

  startTimer() {
    this.timer = 20;
    this.timerElement.innerText = this.timer;
    this.intervalID = setInterval(() => {
      this.timer--;
      this.timerElement.innerText = this.timer;
      this.showDora();
      if (this.timer === 0) {
        clearInterval(this.intervalID);
        this.onGameOverCallback();
      }
    }, 1000);
  }

  onOver(callback) {
    this.onGameOverCallback = callback;
  }

  destroy() {
    this.gameMain.remove();
  }
}
