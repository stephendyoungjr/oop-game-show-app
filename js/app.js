/* Treehouse FSJS Techdegree
 * Project 4 - OOP Game App
 * app.js */

let game;

// begin a new game
const startButton = document.querySelector("btn__reset");
startButton.addEventListener("click", ()=> {
    game = new Game();
    game.startGame();
})
