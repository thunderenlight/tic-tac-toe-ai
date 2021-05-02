function run(player, OPPONENT) {
    // SELECT CANVAS
    const canvas = document.getElementById("cvs");
    const ctx = canvas.getContext("2d");

    // BOARD VARIABLES
    let board = [];
    const COLUMN = 3;
    const ROW = 3;
    const CELL_SIZE = 150;

    // STORES MOVES
    let gameData = new Array(9);

    // Set Default Player as USER
    let currentPlayer = player.user;

    // Load images
    const xImage = new Image();
    xImage.src = "img/X.png";

    const oImage = new Image();
    oImage.src = "img/O.png";

    // Winning Combinations {
    const COMBOS = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]

    ];

    let GAME_OVER = false;
    
    function drawBoard() {
        
        let id = 0;
        for (let i = 0; i < ROW; i++) {
            console.log(i)
            board[i] = [];
            for (let j = 0; j < COLUMN; j++ ) {
                board[i][j] = id;
                id++;
                
                // draw cells to canvas
                ctx.strokeStyle = "#000";
                ctx.strokeRect(j * CELL_SIZE, i * CELL_SIZE, CELL_SIZE, CELL_SIZE);
            }

        }
    }
    drawBoard();

    // ON USER CLICK LISTENING
    canvas.addEventListener("click", function(e) {

        if(GAME_OVER) return;

        // X & Y position of mouse click relative to the canvas
        let X = e.clientX - canvas.getBoundingClientRect().x;
        let Y = e.clientY - canvas.getBoundingClientRect().y;

        // Using Canvas coordinates to pick the clicked space or cell
        let i = Math.floor(Y/CELL_SIZE);
        let j = Math.floor(X/CELL_SIZE);
        console.log(j);
        // Hold the id of the clicked space
        let id = board[i][j];
        console.log(board[i]);
        // Check and stop reuse of spaces taken
        if (gameData[id]) return;

        // Store move to gameData
        gameData[id] = currentPlayer;
        console.log(gameData);
        console.log(id)

        // Place the move on board
        placeOnBoard(currentPlayer, i, j);

        // Win check
        if (isWinner(gameData, currentPlayer)) {
            gameOver(currentPlayer);
            GAME_OVER = true;
            return;
        }

        // Tie check
        if (isTie(gameData)) {
            gameOver("tie");
            GAME_OVER = true;
            return;
        }
        if (OPPONENT == "computer") { //Start here @28.11
            // Get id of cell using minimax algorithm
            // Hold the id of the clicked cell
            let id = minimax( gameData, player.computer ).id;
            console.log(board[i]);
            
            // Store player's move to gameData
            gameData[id] = player.computer;

            // Get i and j of cell
            let space = getIJ(id); 
            console.log(gameData);
            console.log(id)

            // Place the move on board
            placeOnBoard(player.computer, space.i, space.j);

            // Win check
            if (isWinner(gameData, player.computer)) {
                gameOver(player.computer);
                GAME_OVER = true;
                return;
            }

            // Tie check
            if (isTie(gameData)) {
                gameOver("tie");
                GAME_OVER = true;
                return;
            }
        } else {
            // Toggle players
            currentPlayer = currentPlayer == player.user ? player.friend : player.user;
        }
    });
    //MINIMAX
    function minimax(gameData, PLAYER) {
        //BASE LOGIC 
        if( isWinner(gameData, player.computer) ) return  { evaluation : +10 };
        if( isWinner(gameData, player.user)     ) return  { evaluation : -10 };
        if( isTie(gameData)                     ) return  { evaluation :   0 };
    
        let EMPTY_CELLS = getEmptyCells(gameData);

        // Save all Moves and Evaulations
        let moves = [];

        // Loop over empty cells and eval
        for (let i = 0; i < EMPTY_CELLS.length; i++) {
            // Get id 
            let id = EMPTY_CELLS[i];
            // Save Cell hold for eval
            let backup = gameData[id];
            // Move Player?
            gameData[id] = PLAYER;

            // Save Move's ID and EVAL
            let move = {};
            move.id = id;
            // Evaluate the virtual move
            if (PLAYER == player.computer) {
                move.evaluation = minimax(gameData, player.user).evaluation;
            } else {
                move.evaluation = minimax(gameData, player.computer).evaluation;
            }

            // Reset Empty Cell
            gameData[id] = backup;

            // Push to moves array
            moves.push(move);
        }

        // AI algorithm

        let bestMove;

        if (PLAYER == player.computer) {
            // Maximizer
            let bestEvaluation = -Infinity;
            for (let i = 0; i < moves.length; i++) {
                if ( moves[i].evaluation > bestEvaluation ) {
                    bestEvaluation = moves[i].evaluation;
                    bestMove = moves[i];
                }
            }
        } else {
            // Minimizer
            let bestEvaluation = +Infinity;
            for (let i = 0; i < moves.length; i++) {
                if ( moves[i].evaluation < bestEvaluation ) {
                    bestEvaluation = moves[i].evaluation;
                    bestMove = moves[i];
                }
            }
        }
        return bestMove;

    }
    // Get Empty Cells
    function getEmptyCells(gameData) {
        let EMPTY = [];

        for (let id = 0; id < gameData.length; id++ ){
            if (!gameData[id]) EMPTY.push(id);
        }
        return EMPTY;
    }

    // Get cell's i and j
    function getIJ(id) {
        for (let i = 0; i < board.length; i++) {
            for (let j = 0; j < board[i].length; j++) {
                if (board[i][j] == id) return  {i : i, j: j}
            }
        }
    }

    function isWinner(gameData, player) {
        for (let i = 0; i < COMBOS.length; i++) {
            let won = true;

            for (let j = 0; j < COMBOS[i].length; j++) {
                let id = COMBOS[i][j];
                won = gameData[id] == player && won;
            }
            if (won) {
                return true;
            }
        }
        return false;
    }
    // Tie check
    function isTie(gameData) {
        let isBoardFull = true;
        for (let i = 0; i < gameData.length; i++) {
            isBoardFull = gameData[i] && isBoardFull;
        }
        if (isBoardFull) {
            return true;
        }
        return false;
    }

    function gameOver(player) {
        let message = player == "tie" ? " Tie no Loser" : "The winner is";
        let imgSrc = `img/${player}.png`;

        gameOverElement.innerHTML = `
        <h1>${message}<h1>
        <img class="winner-img" src=${imgSrc} </img>
        <div class="play" onclick="location.reload()">Play Again!</div>
        `;
        gameOverElement.classList.remove("hide");

    }
    function placeOnBoard(player, i, j) {
        let img = player == "X" ? xImage : oImage;
        // mapping x,y position to cell space
        ctx.drawImage(img, j * CELL_SIZE, i * CELL_SIZE);
    }
}
