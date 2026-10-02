/* Treehouse FSJS Techdegree
 * Project 4 - OOP Game App
 * app.js */
// initialize game 
let game;

// Start a new game when the "Start Game" button is clicked
const startButton = document.querySelector("#btn__reset");
startButton.addEventListener("click", () => {
  game = new Game();
  game.startGame();
});

// Use event delegation so we don't need a listener on every single key
const qwerty = document.querySelector("#qwerty");
qwerty.addEventListener("click", (event) => {
  // Only respond when an actual <button> was clicked,
  // not the gaps between/around the keys
  if (event.target.tagName === "BUTTON") {
    game.handleInteraction(event.target);
  }
});

// Extra credit - let players use their physical keyboard to guess letters
document.addEventListener("keydown", (event) => {
  // Ignore keypresses before a game has started
  if (!game || !game.activePhrase) return;

  const letter = event.key.toLowerCase();

  // Only react to single a-z letter keys
  if (letter.length === 1 && letter >= "a" && letter <= "z") {
    const matchingButton = [...qwerty.querySelectorAll("button")].find(
      (button) => button.textContent.toLowerCase() === letter
    );

    // Ignore keys that don't match a visible key, or keys already disabled
    if (matchingButton && !matchingButton.disabled) {
      game.handleInteraction(matchingButton);
    }
  }
});