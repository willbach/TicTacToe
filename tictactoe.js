/* tic tac toe game javascript*/


$(document).ready(function() {
	var globals = {};
	//start the game
	$( ".start" ).click(function() {
		globals.game = new Game();
		alert("The game begins! It is X's turn.");
		$('#notification').text("Current Turn: " + globals.game.currentState.turn);
	});
	
	//loop for the game
	$('.space').each(function() {
		var $this = $(this);
		
		//changes the board space corresponding to the table entry to the value of the current player
		$this.click(function() {
			var key = parseInt($this.data("space"));
//			$this.text(globals.game.currentState.turn);
			globals.game.advanceState(globals.game.currentState, key);
			//test to see if the game is over
			if(globals.game.currentState.gameOver()) {
				alert(globals.game.currentState.result);
				$('#notification').text("Game Over");
			}
			//express the current state on the board
			
			
			
			//update the turn
			else if(globals.game.currentState.result === "still running") {
				globals.game.currentState.advanceTurn();
				$('#notification').text("Current Turn: " + globals.game.currentState.turn);
			}
			//display the current state on the board
			$('.space').each(function() {
				var $this = $(this);
				$this.text(globals.game.currentState.board[parseInt($this.data("space"))])
				
			});
		});
	});
});
var State = function(old) {
	
	this.turn = "X";
	this.movesCount = 0;
	this.result = "still running";
	this.board = [];
	this.oldState = {};
	// if the old state exists
	/*if(typeof old !== undefined) {
		this.board = old.board;
		this.movesCount = old.movesCount;
		this.turn = old.turn;
		this.result = old.result;
		
	}*/
	//return a new state and save the old state
	
	this.advanceTurn = function() {
		this.turn = this.turn === "X" ? "O" : "X";
	}
	//return the spaces in the board that are empty, in an array
	this.emptySpaces = function() {
		var spaces = [];
		for(i = 0; i < 9; i++) {
			if(this.board[i] === " ")
				spaces.push(i);
			
		}
		return spaces;
	}
	//test to see if the game is over, returns true if the game is over
	this.gameOver = function() {
		var B = this.board;
		//horizontal test
		for(var i = 0; i < 9; i += 3) {
			if(B[i] !== " " && B[i] === B[i+1] && B[i+1] === B[i+2]) {
				this.result = B[i] + " won!"
				return true;
			}
		}
		//vertical test
		for(var i = 0; i < 3; i += 1) {
			if(B[i] !== " " && B[i] === B[i+3] && B[i+3] === B[i+6]) {
				this.result = B[i] + " won!"
				return true;
			}
		}
		//diagonal test
		for(var i = 0, j = 4; i < 3; i += 2, j -= 2) {
			if(B[i] !== " " && B[i] === B[i + j] && B[i+j] === B[i + j*2]) {
				this.result = B[i] + " won!"
				return true;
			}
		}
		//if a draw happens, return true; if not, return false
		var available = this.emptySpaces();
		if(available.length == 0){
			this.result = "The game ends in a draw!";
			return true;
		}
		else {
			return false;}
	}
}
//function to initialize the game
var Game = function() {
	this.currentState = new State();
	this.currentState.board = [" ", " ", " ", " ", " ", " ", " ", " ", " ", " "];
	this.advanceState = function(curState, keyToChange) {
		this.newState = curState;
		this.newState.oldState = curState;
		this.newState.movesCount++;
		this.newState.board[keyToChange] = this.newState.turn;
		this.newState.advanceTurn;
	}
}



		
		
/*while(!globals.game.currentState.gameOver()) {
  confirm(globals.game.currentState.turn + ", time to go!);
  var choice = Number(prompt("Where do you want to place your piece?"));
  globals.game.currentState.board[choice] = globals.game.currentState.turn;
  globals.game.currentState.advanceTurn();
}
console.log(globals.game.currentState.result, 
            globals.game.currentState.board);
*/

