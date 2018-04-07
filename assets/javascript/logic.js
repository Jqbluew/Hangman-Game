//Global Variables
//=================================================
//Arrays and Variables for holding data
var wordOptions = ['grunge', 'sublime', 'rem', 'nirvana', 'inxs'];
var selectedWord = "";
var lettersinWord =[];
var numBlanks = 0;
var blanksAndSuccesses = [];
var wrongLetters =[];

//Game counters
var winCount = 0;
var lossCount = 0;
var guessesLeft = 9;

/////Functions 
//============================================

function startGame () {
	selectedWord = wordOptions[Math.floor(Math.random() * wordOptions.length)];
	lettersinWord = selectedWord.split("");
	numBlanks = lettersinWord.length;

	///Reset
	guessesLeft = 9;
	wrongLetters = [];
	blanksAndSuccesses = [];

	///Populate blanks and successes
	for (var i = 0; i < numBlanks; i++) {
		blanksAndSuccesses.push("_");
	}

	document.getElementById("wordToGuess").innerHTML = blanksAndSuccesses.join(" ");
	document.getElementById("numGuesses").innerHTML = guessesLeft;
	document.getElementById("winCounter").innerHTML = winCount;
	document.getElementById("lossCounter").innerHTML = lossCount;


	///Testing & Debug
	console.log(selectedWord);
	console.log(lettersinWord);
	console.log(numBlanks);
	console.log(blanksAndSuccesses);
}

function checkLetters(letter){
	////Check if letter exists
	var isLetterInWord = false;
	for (var i=0; i<numBlanks; i++){
		if(selectedWord[i]==letter) {
			isLetterInWord=true;
		}
	}

	if (isLetterInWord){

		for (var i = 0; i <numBlanks; i++) {
			if(selectedWord[i] == letter){
				blanksAndSuccesses[i] = letter;
			}
		}
	}

		///Letter not found
		else {
		wrongLetters.push(letter);
		guessesLeft--
	} 

	//Debug
	console.log(blanksAndSuccesses);

}

function roundComplete(){
	console.log("Win: " + winCount + " | Loss Count: " + lossCount + " | Guesses Left " + guessesLeft);

	////Update HTML 
	document.getElementById("numGuesses").innerHTML=guessesLeft;
	document.getElementById("wordToGuess").innerHTML = blanksAndSuccesses.join(" ");
	document.getElementById("wrongGuesses").innerHTML = wrongLetters.join(" ");
	
	///check if user won
	if(lettersinWord.toString() == blanksAndSuccesses.toString()) {
		winCount++;
		alert("You Won");

	///Update win counter
		document.getElementById("winCounter").innerHTML = winCount;
	
		startGame();
	}

	///User lost
	else if (guessesLeft == 0) {
		lossCount++;
		alert("You Lost!");

		//Update HTML
		document.getElementById("lossCounter").innerHTML = lossCount;
		
		startGame();
	}
}

// Main Process
//==========================

//Initiates Game 
startGame();

///Register Key Clicks

document.onkeyup = function(event) {
	var letterGuessed = String.fromCharCode(event.keyCode).toLowerCase();
	checkLetters(letterGuessed);
	roundComplete();

///Debugging
	console.log(letterGuessed);
}

