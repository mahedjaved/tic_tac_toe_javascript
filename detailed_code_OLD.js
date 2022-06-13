/**
 * ___________________________________________________________________________________
 * @desc : Example TIC-TAC-TOE game for optional recreational code:Tic-Tac-Toe is a 
 * two-player game in which the players fill up nine empty rectangles in a table with 
 * either an X or an O when it is their turn. Once someone succeeds to line up their 
 * sign vertically or horizontally without an interruption, that player wins. Chances
 * of wining increase with size of board for horiz and vert moves, but for diagonal
 * moves chances remain the same
 * @name : Mahed Javed
 * @date : 11/06/2022
 * @ref : https://www.codebrainer.com/blog/tic-tac-toe-javascript-game
 * @depth : you can check out more examples on : https://www.codebrainer.com/
 * @filesystem : [1] index.html (root) : takes care of assigning classes to seperate
 * constructors in our game
 * [2] style.css (root) : styles our game
 * ___________________________________________________________________________________
 */


/**
 * ___________________________________________________________________________________
 * Notes Section
 * 
 * HTML code is for assigning tags and classes to the basic elements of the game
 * For example  :  a board can be a tag or a cell can be a tag
 * HINT : entitities ==> tagged
 * CSS is mainly use to personalise the code
 * The below code is split into three PARTS
 * ____________________________________________________________________________________
 */

/**
 * ___________________________________________________________________________________
 * PART 1 : Assigning tags with HTML
 * @desc: here we assign id tags to our HTML elements
 *  (1) we assign cells with a <div> tag --> <div> a generic container which is styled
 * later, (2) the <head> tag mainly sets the title, the page style and size and the
 * connections between two of our files : cross_dot_game.js  and the style.css
 * The main work is done with the <head> tag which stores our cells in <div> tag
 * We have a 3x3 TIC-TAC-TOE with 9 cells, so there are nine <div> tags for cells
 * The buttons id is for playing the game and a seperate ids for outputting messages
 * ____________________________________________________________________________________
 */

/**
 * ___________________________________________________________________________________
 * PART 2 : Take care of interactions with JavaScript
 * @desc: In this code execution block we take care of moves the player make
 * and the combination of winning moves as a nested list of possibilities
 * To access ids from our html file we use the command document.getElementbyId
 * Now the "querySelector" ... sorry b4 that keep in mind that html code the <div>
 * tags come with a <div class=??>, we use the querySelector to access these classes
 * otherwise we can also get the tags based on their id names with "getElementbyId"
 * Basically, if you see id use "getElementbyId", otherwise you QUERY or ASK if there 
 * exists an element with name ['elem_name'] and get the first one available using []
 * brackets and target the 'data-cell' attribute
 * ____________________________________________________________________________________
 */

// this boolean decides whether the next move is done by 'X' player or the 'O' player
let isPlayer_0_Turn = false;

// Player possible moves
const PLAYER_X_CLASS = 'x';
const PLAYER_O_CLASS = 'circle';

// Winning moves
const WINNING_COMBINATIONS = [
    // The horizontal winning combos
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],

    // the vertial winning combos
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],

    // diagonal winning combox
    [0, 4, 8],
    [2, 4, 6]
];

// to get cell elements we use the query selector
const cellElements = document.querySelectorAll('[data-cell]');
const boardElement = document.getElementById('board');
const winningMessageElement = document.getElementById('winningMessage');

// restart button and wining message text and function that starts the game
const restartButton = document.getElementById('restartButton');
const winningMessageTextElement = document.getElementById('winningMessageText');



// #################################### //
//        FUNCTION DECLARACTIONS        //
// #################################### //

// function ------ #1
const setBoardHoverClass = () => {
    /**
     * @desc:a pure aesthetic improving code for interaction that displays a fading image 
     * of the move cursor (i.e. X or O) b4 the actual move is made by the player
     * it operates on the boardElement since it carries the cell info, but we
     * dont need to work directly on the cell.
     * The below .classList.add add the fade in images
     * @arg: none
     * @returns: void
     */
    boardElement.classList.remove(PLAYER_X_CLASS);
    boardElement.classList.remove(PLAYER_O_CLASS);
    if (isPlayer_0_Turn) {
        boardElement.classList.add(PLAYER_O_CLASS);
    }
    else {
        boardElement.classList.add(PLAYER_X_CLASS);
    }
}

// function ------ #2
const startGame = () => {
    /**
     * @desc:function for staring the game
     * @arg: none
     * @returns: void
     */
    // 'X' makes the move first
    isPlayer_0_Turn = false;

    // loop through all cells and remove all cells set to 'X'moves or 'O' moves
    cellElements.forEach(cell => {
        cell.classList.remove(PLAYER_X_CLASS)
        cell.classList.remove(PLAYER_O_CLASS)

        // trigger events which are mouse clicks
        cell.removeEventListener('click', handleCellClick)
        cell.addEventListener('click', handleCellClick, { once: true })
    });
    setBoardHoverClass();
    // then remove any display messages from previous gameplays
    winningMessageElement.classList.remove('show');
}

// function ------ #3
const checkWin = (currentClass) => {
    /**
     * @desc: check if any of the moves made by players match the wining
     * combinations
     * @arg: 
     *  [1] currentClass (type=) : 
     * @returns: winning combinations
     */
    return WINNING_COMBINATIONS.some(combination => {
        return combination.every(index => {
            return cellElements[index].classList.contains(currentClass);
        })
    });

}

// function ------ # 4
const placeMark = (cell, currentClass) => {
    /**
* @desc: places the character in the cell, the 
* @arg: 
*  [1] cell (type=htmltag) :
*  [2] currentClass () : the currentClass can be 'X' or 'O' depending on whose turn it is
* @returns: void
*/
    cell.classList.add(currentClass);
}


// function ------ # 5
const swapTurns = () => {
    /**
* @desc: sets player 0 to stop and give turn to player X
* @arg: none
* @returns: void
*/
    isPlayer_0_Turn = !isPlayer_0_Turn;
}


// function ------ # 6
const isDraw = () => {
    /**
* @desc: checks if the game is a DRAW, nobody wins
There is also a nice method hidden in the isDraw function named every that checks all elements of an array to confirm a condition by returning a boolean value.It is usually defined as an array which tests the elements of an array and returns true (1) if they pass the test.
* @arg: none
* @returns: returns the cell classes list
*/
    return [...cellElements].every(cell => {
        return cell.classList.contains(PLAYER_X_CLASS) || cell.classList.contains(PLAYER_O_CLASS);
    })
}


// function ------ # 7
const endGame = (draw) => {
    /**
* @desc: checks if the game is ENDED
* @arg: none
* @returns: returns the cell classes list
*/
    if (draw) {
        winningMessageElement.innerText = "It is a draw";
    }
    else {
        winningMessageElement.innerText = `Player with ${isPlayer_0_Turn ? "O's" : "X's"} wins !`;
    }
    winningMessageElement.classList.add('show');
}


// function ------ # 7
const handleCellClick = (e) => {
    /**
* @desc: checks if the game is ENDED by checking if it is a DRAW or WIN, if not
then swap turn and enable interactive HOVER MODE
* @arg: none
* @returns: returns the cell classes list
*/
    const cell = e.target;
    const currentClass = isPlayer_0_Turn ? PLAYER_O_CLASS : PLAYER_X_CLASS;
    placeMark(cell, currentClass);
    if (checkWin) {
        endGame(false);
    }
    else if (isDraw()) {
        endGame(true);
    }
    else {
        swapTurns();
        setBoardHoverClass();
    }
}

// #################################### //
//        FUNCTION   CALL               //
// #################################### //
startGame();

// make the mouse event "listenable" as soon as the game starts
restartButton.addEventListener('click', startGame);
