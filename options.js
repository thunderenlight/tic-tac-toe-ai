// SELECT ELEMENTS
const options = document.querySelector(".options");
const gameOverElement = document.querySelector(".gameover");

// SELECT ELEMENTS
const computerBtn = options.querySelector(".computer");
const friendBtn = options.querySelector(".friend");
const xBtn = options.querySelector(".x");
const oBtn = options.querySelector(".o");
const playBtn = options.querySelector(".play");

// VARIABLES TO SAVE PLAYER'S GAME can i use localstorage here to save history?
let OPPONENT;
const player = new Object;

// EVENT LISTENING VARIABLES

computerBtn.addEventListener("click", function() {
    OPPONENT = "computer";
    
    switchActive(friendBtn, computerBtn);
});

friendBtn.addEventListener("click", function() {
    OPPONENT = "friend";
    
    switchActive(computerBtn, friendBtn);
});

xBtn.addEventListener("click", function() {
    player.user = "X";
    player.computer = "O";
    player.friend = "O";
    
    switchActive(oBtn, xBtn);
});
oBtn.addEventListener("click", function() {
    player.user = "O";
    player.computer = "X";
    player.friend = "X";
    
    switchActive(xBtn, oBtn);
});
playBtn.addEventListener("click", function() {
    if (!OPPONENT) {
        computerBtn.style.backgroundColor = "salmon";
        friendBtn.style.backgroundColor = "salmon";

        return;
    }

    if (!player.user) {
        xBtn.style.backgroundColor = "salmon";
        oBtn.style.backgroundColor = "salmon";

        return;
    }
    //Run Game
    run(player, OPPONENT);
    options.classList.add("hide");

});

//SWITCH ACTIVE CLASS BETWEEN TWO ELEMENTS - toggle maps between x and o btns

function switchActive(off, on) {
    off.classList.remove("active");
    on.classList.add("active");

}
