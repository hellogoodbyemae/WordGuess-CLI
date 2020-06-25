var Letter = require("./letter.js");

function Word(solution) {
    this.wordArray =[];

    for(var i = 0; i < solution.length; i++) {
        var letter = new Letter(solution[i]);
        this.wordArray.push(letter);
    }

    this.log = function() {
        var guessLog = "";

        for(var i = 0; i < this.wordArray.length; i++) {
            guessLog += this.wordArray[i] + " ";
        }
        console.log(guessLog + "\n--------------------------\n");
    };

    this.userGuess = function(input) {
        for(var i = 0; i < this.wordArray.length; i++) {
            this.wordArray[i].guess(input);
        }
    };
}

module.exports = Word;