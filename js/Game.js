/* Treehouse FSJS Techdegree
 * Project 4 - OOP Game App
 * Game.js */

class Game {
    constructor(){
        //Number of wrong guesses 
        this.missed = 0;
    

    //Five Phrase objects 
    this.phrases = [
        new Phrase("javascript is fun"),
        new Phrase("object oriented programming"),
        new Phrase("front end development"),
        new Phrase("treehouse techdegree"),
        new Phrase("the quick brown fox"),
    ];

    //phrase is being played
    this.activePhrase = null;

}

    //Pick one random Phrase object out of the phrases array
    getRandomPhrase(){
        //just grab a random index from the array and return that phrase
        const randomIndex = Math.floor(Math.random() * this.phrases.length);
        return this.phrases[randomIndex];
    }

    //start over, choose new phrase 

    startGame(){
        //hide the start screen so the board shows
        const overlay = document.querySelector("#overlay")
        overlay.style.display = "none";

        //pick a phrase and put it on the board
        this.activePhrase = this.getRandomPhrase();
        this.activePhrase.addPhraseToDisplay();
    }

    //Each time button is used

    handleInteraction(button){
        //don't let them click this key again
        button.disabled = true;

        const letter = button.textContent.toLowerCase();

        if(this.activePhrase.checkLetter(letter)){
            //if correct
            button.classList.add("chosen");
            this.activePhrase.showMatchedLetter(letter);

            //check if that was the last letter needed
            if(this.checkForWin()){
                this.gameOver(true);
            }
        } else {
            //incorrect guess
            button.classList.add("wrong");
            this.removeLife();
        }
    }

    //remove life from player

    removeLife(){
        this.missed++;

        //find the next live heart and swap it for a lost one
        const hearts = document.querySelectorAll("#scoreboard ol li img");
        const heartToLose = hearts[this.missed -1];

        if(heartToLose){
            heartToLose.src = "images/lostHeart.png";
        }

        //out of hearts, game over
        if(this.missed === 5){
            this.gameOver(false);
        }
    }

    //check if every letter on the board is revealed, means they won
    checkForWin() {
      const letterTiles = document.querySelectorAll("#phrase ul li.letter");
      return [...letterTiles].every((li) => li.classList.contains("show"));
    }

    //bring back the start screen and show if they won or lost
    gameOver(didWin) {
      const overlay = document.querySelector("#overlay");
      const heading = document.querySelector("#game-over-message");

      overlay.classList.remove("start");
      overlay.style.display = "flex";

      if (didWin) {
        //won, so style it green and say congrats
        overlay.classList.add("win");
        overlay.classList.remove("lose");
        heading.textContent = "You won! Play again?";
      } else {
        //lost, style it red and let them know
        overlay.classList.add("lose");
        overlay.classList.remove("win");
        heading.textContent = "You lost! Play again?";
      }

      //clean everything up for next round
      this.resetGame();
    }

    //wipe the board clean so a new game can start fresh
    resetGame() {
      //clear out all the letter tiles from last game
      const ul = document.querySelector("#phrase ul");
      ul.innerHTML = "";

      //turn all the keys back on and remove old chosen/wrong styling
      const keys = document.querySelectorAll("#qwerty button");
      keys.forEach((key) => {
        key.disabled = false;
        key.classList.remove("chosen", "wrong");
        key.classList.add("key");
      });

      //put all the hearts back to full
      const hearts = document.querySelectorAll("#scoreboard ol li img");
      hearts.forEach((heart) => {
        heart.src = "images/liveHeart.png";
      });

      this.missed = 0;
      this.activePhrase = null;
    }
}



