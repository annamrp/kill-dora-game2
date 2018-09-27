# kill-dora-game

## Description

Juego en el que va apareciendo aleatoriamente dentro de un casillero y hay que conseguir hacer click encima antes de que desaparezca.

## MVP (DOM - CANVAS)

DOM - Debe aparecer al menos una Dora de manera aleatoria durante unos determinados segundos. El juego termina cuando se acaba el tiempo. 

## Backlog

* Que aparezcan varias Doras.
* A medida que la puntuación aumenta que se muestren durante un intervalo de tiempo menor.
* Añadir 'vidas'. Cuando se hace click en un lugar donde no está Dora, se quita una vida. El juego termina cuando se acaban las vidas.
* Añadir sonido cada vez que aparezca una dora.

## Data Structure

### main.js

  - buildDom();
  - builSplash();
  - destroySplash();
  - buildGame();
  - destroyGame();
  - buildGameOver();
  - destroyGameOver();
  
### game.js

  - Game(){score,lives,time};
  - startGame();
  - buildBoard();
  - buildDora(){position:x,y => undefined}
  - showDora() - definir posición aleatoria y tiempo que se muestra.
  - killedDora() o comprobar que hay dora en la casilla. Si hay suma puntos. Si no hay quita vida.


## States y States Transitions

* Splash Screen
  * buildSplash()
  * destroyGameOver()
  * button eventListener => buildGame()
  
* Game Screen
  * destroySplash()
  * buildGame()
  * startGame()
  
* Game Over Screen
  * destroyGame()
  * buildGameOver()
  * button eventListener => buildSplash
  
## Task

* Crear main.js
* Declarar funciones main.js
* Crear game.js
* Declarar Game constructor y start.
* Declarar función temporizador.
* Crear tabla e incluir en DOM.
* Declarar objeto 'Dora' position undefined.
* Declarar función para mostrar a Dora (posición aleatoria y tiempo determinado).
* Declarar función para comprobar si hemos clickado sobre una casilla ocupada por Dora.
* Dar estilos al juego.
* Añadir sonidos.

## Links

### Trello

### Git

* View Repo:
* View Deploy:

### Slides

[Link Slides.com](http://slides.com)
