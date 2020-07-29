# ConwaysGameOfLife

### The Game of Life

https://conways-game-of-life-psi.vercel.app/

---

Conway's Game of Life made in react js

A game made by John Horton Conway in 1970, set up the different grid cells to be either dead or alive and the game plays itself. The cells interact with the surrounding cells, above, below, left, right, and all 4 diagonals and change with each passing generation. The changes depend on the rules listed for the game of life.

## Rules for the Game of Life

1. Any cell with 2 or 3 neighbors lives the next generation.

2. Any dead cell with exactly 3 neighbors comes to life.

3. Any other cell is dead.

## My Version of the game

On this version, the grid is 50x50 to begin with. The walls act as dead cells.

-   There are Play and Pause buttons, as well as speed buttons that increment or decrement .2 of a second per generation.
-   If you wish to clear the field and draw your own figures on the grid, there is a button for that. Note that the only time changes can be made is when the game is paused. Clearing the grid pauses the game.
-   The Random button will make the board randomized with some cells being dead and most being alive.

## For developers

React js was the main code for this project. Nothing more than normal react dependencies needed.

-react
-react-dom
-react-scripts
-react testing libraries
