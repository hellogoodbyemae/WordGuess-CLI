var Word = require("./word.js");
var inquirer = require("inquirer");

var letterArray = "abcdefghijklmnopqrstuvwxyz";

var theOffice = [
    "michael scott",
    "dwight schrute",
    "jim halpert",
    "pam beesly",
    "angela martin",
    "oscar martinez",
    "kevin malone",
    "stanley hudson",
    "creed bratton",
    "andy bernard",
    "phyllis vance",
    "toby flenderson",
    "erin hannan",
    "darryl philbin",
    "ryan howard",
    "kelly kapoor",
    "meredith palmer",
    "todd packer",
    "david wallace"
];

var randomIndex = Math.floor(Math.random() * theOffice.length);
var randomWord = theOffice[randomIndex];

var dundieWinner = new Word(randomWord);

var requireNewWord = false;
var incorrectLettersArray = [];
var correctChoicesArray=[];

var guessesLeft = 10;

function gameLogic() {
    if(requireNewWord) {
        var randomIndex = Math.floor(Math.random() * theOffice.length);
        var randomWord = theOffice[randomIndex];
        
        dundieWinner = new Word(randomWord);

        requireNewWord = false;
    }

    var completeName = [];

    if(completeName.includes(false)) {
        inquirer.prompt([
            {
                type: "input",
                message: "Select a letter",
                name: "userInput"
            }
        ]).then(function(input) {
            if(!letterArray.includes(input.userInput) || input.userInput.length > 1) {
                console.log("\nOne more time!\n");
                gameLogic();
            }
            else if(incorrectLettersArray.includes(input.userInput) || correctLettersArray.includes(input.userInput) || input.userInput === "") {
                console.log("\nGuess already...\n");
                gameLogic();
            }
            else {
                var wordCheckArray = [];
                dundieWinner.userGuess(input.userInput);
                dundieWinner.wordArray.forEach(wordCheck);

                if(wordCheckArray.join("") === completeName.join("")) {
                    console.log("\nFalse!\n");
                    incorrectLettersArray.push(input.userInput);
                    guessesLeft --;
                }
                else {
                    console.log("\nGood Job, you're better than a moneky\n");
                    correctLettersArray.push(input.userInput);
                }
                dundieWinner();

                console.log("You have " + guessesLeft + " guesses left.");
                console.log("You've guessed: " + incorrectLettersArray.join(" ") + "\n");

                if(guessesLeft > 0) {
                    gameLogic();
                }
                else {
                    console.log("Congratulations.... on being Assistant TO THE REGIONAL MANAGER!");
                }

                function wordCheck(key) {
                    wordCheckArray.push(key.guessed);
                }
            }
        });
    }
    else {
        console.log("Congratulation! You just won a Dundie!!");
    }

    function check(key) {
        completeName.push(key.guessed);
    }
}

function restart() {
    inquirer.prompt ([
        {
            name: "restart",
            type: "list",
            message: "Wanna try again?",
            choices: ["yes", "no"]
        }
    ]).then(function(input) {
        if(input.restart === "yes") {
            console.log("That's What She Said!");
            requireNewWord = true;
            incorrectLettersArray = [];
            correctLettersArray = [];
            guessesLeft = 10;
            gameLogic();
        }
        else {
            console.log("You miss 100% of the shots you don't take. Wayne Gretzski. - Michael Scott");
            return;
        }
    });
}

gameLogic();