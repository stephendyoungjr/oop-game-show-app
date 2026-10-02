/* Treehouse FSJS Techdegree
 * Project 4 - OOP Game App
 * Phrase.js */

class Phrase {
    // changes all input to lowercase
    // will be lowercased for consistency instead of checking upper and lower
    constructor(phrase){
        this.phrase = phrase.toLowerCase();
    }

    //method for building in input on <li> per character 
    addPhraseDisplay(){
        const ul = document.querySelector('#phrase ul');
        // loop, set char to a variable, and create li for char 
        for (let i = 0; i < this.phrase.length; i++) {
            const character = this.phrase[i];
            const li = document.createElement('li');

            
            // if theres a space, add space class
            if(character === ' '){
                li.classList.add('space');

            } else {
                //if not, set text, add hide, add the letter, and the character as a class
                li.textContent = character;
                li.classList.add("hide","letter", character);
            }

            //add li to the ul 
            ul.appendChild(li);

        }
    }



        //method to check if the clicked letter is somewhere in phrase 
        checkLetter(letter){
            return this.phrase.includes(letter);
        }
        
        //if letter is guessed, show that letter

        showMatchedLetter(letter){
            //query select each letter that is the guessed letter
            //have to ${letter} as letter will change 
            const matchedLetters = document.querySelectorAll(`#phrase ul li.${letter}`);
            //go through array of letters, if it matches, do not hide, show 
            matchedLetters.forEach((li) => {
                li.classList.remove("hide");
                li.classList.add("show");
            })
        }

}

