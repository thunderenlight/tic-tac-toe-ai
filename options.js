// SELECT ELEMENTS
const options = document.querySelector(".options");
const gameOverElement = document.querySelector(".gameover hide");

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
    
    switchActive();
});

friendBtn.addEventListener("click", function() {
    OPPONENT = "friend";
    
    switchActive();
});

xBtn.addEventListener("click", function() {
    player.user = "x";
    player.computer = "o";
    player.friend = "o";
    
    switchActive(oBtn, xBtn);
});
oBtn.addEventListener("click", function() {
    player.user = "o";
    player.computer = "x";
    player.friend = "x";
    
    switchActive(xBtn, oBtn);
});
playBtn.addEventListener("click", function() {
    if (!OPPONENT) {
        computerBtn.style.backgroundColor = "#f00";
        friendBtn.style.backgroundColor = "#f00";

        return;
    }

    if (!player.user) {
        xBtn.style.backgroundColor = "#f00";
        oBtn.style.backgroundColor = "#f00";

        return;
    }
    run(player, OPPONENT);
    options.classList.add("hide");

});

//SWITCH ACTIVE CLASS BETWEEN TWO ELEMENTS - toggle maps between x and o btns

function switchActive(off, on) {
    off.classList.remove("active");
    on.classList.add("active");

}
