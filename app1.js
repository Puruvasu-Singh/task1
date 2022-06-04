//initial quantities;
let currentTiles = [];
let correctTiles = [];
let score = 0;
let buttons = document.querySelectorAll('button');
let dislpayScore = document.querySelector('#score');

//correctTileGenerator:
function correctTilesGenerator() {
    let element = Math.floor(Math.random() * 16 + 1);
    if (correctTiles.length === 16) {
        end();

    } else if (!correctTiles.includes(element)) {
        correctTiles.push(element);
    }
    else {
        correctTilesGenerator();
    }
}

// lists comparision:
function isSimilar(list2, list1) {
    for (let i = 0; i < correctTiles.length; i++) {
        if (!list1.includes(list2[i])) {
            return false;
        }
    }
    return true;
}

//displaying correct tiles:
let display = function (i) {
    buttons[i].classList.toggle('correct');
}

let hide = function (i) {
    buttons[i].classList.toggle('correct');
}


function displayCorrectTiles() {
    let i = 500;
    for (tiles of correctTiles) {
        setTimeout(display, i, tiles - 1);
        setTimeout(hide, i + 500, tiles - 1);
        i += 500;

    }
}
//timer 


//final result:
function result() {
    //final check
    if (currentTiles.length === correctTiles.length) {

        if (isSimilar(correctTiles, currentTiles)) {
            score += 1;
            dislpayScore.textContent = score;
            currentTiles = [];
            correctTilesGenerator();
            displayCorrectTiles();
        } else {
            end();
        }
        // step check    
    } else {
        for (const tiles of currentTiles) {
            if (!correctTiles.includes(tiles)) {
                end();
            }
        }
    }
}

// game start and setting up board;
function start() {
    correctTilesGenerator();
    displayCorrectTiles();


    for (let i = 0; i < 16; i++) {
        buttons[i].addEventListener('click', () => {
            currentTiles.push(i + 1);
            if (currentTiles.length >= 1) {
                result();

            }
        });
    }

}
// staring after 2 seconds
setTimeout(start(), 2000);


function end() {
    score = 0;
    currentTiles = [];
    correctTiles = [];
    dislpayScore.textContent = 0;
    let again = prompt("do yo want to play again? type 'yes' if you want to play again").toLowerCase();
    if (again === "yes") {
        correctTilesGenerator();
        displayCorrectTiles();
    } else {
        alert('thanks for playing');
        window.location.replace('menu.html');
    }
}