/** show whether the player has won or not*/
const statusDisplay = document.querySelector('.game--status');

/** player variables */
let gameActive = true;                                     // strange, usually this is false hmmm ...
let currentPlayer = "X";                                   // start with player 'X'
let gameState = ["", "", "", "", "", "", "", "", ""];      // stores the value whether 'X' or '0' based on the moves

/** messages functions , IMP. N.B When I removed the curly braces from the drawMessage and currentPlayerTurn the message GENUINELY appeared on the HTML wtf??*/
const winningMessage = () => `Player ${currentPlayer} has won !`;
const drawMessage = () => `Game has ended in a draw !`;
const currentPlayerTurn = () => `It's ${currentPlayer}'s turn now`;

/** show the current status */
statusDisplay.innerHTML = currentPlayerTurn();

/** display the winning conditions */
const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

/** ______________ game functions _________________________*/

function handleCellPlayed(clickedCell, clickedCellIndex) {
    /**
     * @desc: function checks if the current clicked cell is marked or not
     * @args:
     *      [1] clickedCell (type=HTML obj) : check which cell is user hovering over
     *      [2] clickedCellIndex (type=HTML obj) : is the index of the cell which player is hovering over
     * @return: void
     */
    gameState[clickedCellIndex] = currentPlayer;
    clickedCell.innerHTML = currentPlayer;          // gets the HTML content of the property clickedCell and assign it to the string currentPlayer
}

function handlePlayerChange() {
    /**
     * @desc: swaps the turn of the player
     * @args: none
     * @return: void
     */

    // check the link for more info on "ternary operator" ==> https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Conditional_Operator
    // check if it is "X", if yes then switch to "0" otherwise set currentPlayer to "X"
    currentPlayer = currentPlayer === "X" ? "O" : "X";
    // show the player status on the web
    statusDisplay.innerHTML = currentPlayerTurn();
}

function handleResultValidation() {
    /**
    * @desc: checks if the round is false  
    * @args: none
    * @return: void
    */
    let roundWon = false;

    // loop through the winning conditions
    for (let i = 0; i <= 7; i++) {

        // first store the winning condition
        const winCondition = winningConditions[i];

        // each get the winning condition cell indices and match with those set by the players stored in the gameState variable
        const a = gameState[winCondition[0]];
        const b = gameState[winCondition[1]];
        const c = gameState[winCondition[2]];

        // move to the next gamestate if no victory states are observed
        if (a === '' || b === '' || c === '') {
            continue;
        }

        // if the set state by players matches the winning condition set the roundWon=true
        if (a === b && b === c) {
            roundWon = true;
            break;
        }
    }

    // if victory is observed then display the victory message and stop the function and return void
    if (roundWon) {
        statusDisplay.innerHTML = winningMessage();
        gameActive = false;
        return;
    }

    // if there is a draw, first define draw btw, then display the drawMessage and set gameActive=false becoz no playing involved, furthermore isDraw is seeing if no value of array gameState is a "" (empty string)
    const isDraw = !gameState.includes("");
    if (isDraw) {
        statusDisplay.innerHTML = drawMessage();
        gameActive = false;
        return;
    }

    // if NEITHER the game is WON or DRAW, just SWAP player turn and make sure game is Active
    handlePlayerChange();
}

function handleCellClick(clickedCellEvent) {
    /**
    * @desc: controls the frontline GUI based on the user's click and hover movement
    * @args: clickedCellEvent (type=HTML eventListener) :: listens if the user has clicked or not
    * @return: void
    */

    // the clicking of the user is an EVENT so STORE that and then check the index of which cell the user clicked, parseInt converts the string, which the HTML eventListener, into an integer
    const clickedCell = clickedCellEvent.target;
    const clickedCellIndex = parseInt(clickedCell.getAttribute('data-cell-index'));

    // if the game state at the clicked cell index is EMPTY (i.e no 'X' or 'O') OR gameActive is False
    /** imp.n.b, the final mistake was here, it had to be that the gameState is NOT empty i.e !== sheesh made a silly mistake */
    if (gameState[clickedCellIndex] !== "" || !gameActive) {
        // then return nothing and end the function
        return;
    }

    // other wise just handle the cell player and handle results
    else {
        handleCellPlayed(clickedCell, clickedCellIndex);
        handleResultValidation();
    }



}

function handleRestartGame() {
    /**
    * @desc: takes care of the restarting the game event entirely
    * @args: none
    * @return: void
    */

    // make sure you set gameActive to True, delete all messages and delete all the moves
    gameActive = true;
    currentPlayer = "X";            // default player move
    gameState = ["", "", "", "", "", "", "", "", ""];
    statusDisplay.innerHTML = currentPlayerTurn();
    document.querySelectorAll('.cell').forEach(cell => { cell.innerHTML = "" });
}


/** the final document call: 1) for each cell in the game add an eventListener obj that check's user mouse input*/
document.querySelectorAll('.cell').forEach(cell => { cell.addEventListener('click', handleCellClick) });
document.querySelector('.game--restart').addEventListener('click', handleRestartGame);