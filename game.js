function run(player, OPPONENT) {
    // SELECT CANVAS
    const canvas = document.getElementById("cvs");
    const ctx = canvas.getContent("2nd");

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
    
    function drawBoard() {
        
        let id = 0;
        for (let i = 0; i < ROW; i++) {
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

        // X & Y position of mouse click relative to the canvas
        let X = e.clientX - canvas.getBoundingClientRect().x;
        let Y = e.clientX - canvas.getBoundingClientRect().y;

        // Using Canvas coordinates to pick the clicked space or cell
        let i = Math.floor(Y/CELL_SIZE);
        let j = Math.floor(X/CELL_SIZE);

        // Hold the id of the clicked space
        let id = board[i][j];
        
        // Check and stop reuse of spaces taken
        if (gameData[id]) return;

        // Store move to gameData
        gameData[id] = currentPlayer;
        console.log(gameData);
        console.log(id )
        // Place the move on board
        placeOnBoard(currentPlayer, i, j);

        // Win check
        function isWinner(gameData, player) {
            for (let i = 0; i < COMBOS.length; i++) {
                let won = true;

                for (let i = 0; i < COMBOS[i].length; i++) {
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
        // Toggle players
        currentPlayer = currentPlayer == player.user ? player.friend : player.user;
    });

    function gameOver(player) {
        let message = player == "tie" ? " Tie no Loser" : "The winner is";
        let imgSrc = `img/${player}.png`;

        gameOverElement.innerHTML = `
        <h1>${message}<h1>
        <img class="winner-img" src=${imgSrc} width="150px" height="150px"</img>
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
