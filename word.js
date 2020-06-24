var Letter = require("./letter.js");

function Word(solution) {
    this.letterArray =[];

    for(var i = 0; i < solution.length; i++) {
        var letter = new Letter(solution[i]);
        this.letterArray.push(letter);
    }

    this.log = function() {
        var guessLog = "";

        for(var i = 0; i < this.letterArray.length; i++) {
            guessLog += this.letterArray[i] + " ";
        }
        console.log(guessLog + "\n--------------------------\n");
    };

    this.userGuess = function(input) {
        for(var i = 0; i < this.letterArray.length; i++) {
            this.letterArray[i].guess(input);
        }
    };
}

module.exports = Word;