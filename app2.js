//initial quantities;
let currentTiles = [];
let correctTiles = [];
let score = 0;
let timeLeft = 15;
let clock;
let buttons = document.querySelectorAll('button');
let dislpayScore = document.querySelector('#score');
let timer = document.querySelector('#timer')


//sound file
let clickSound = new Audio('click.mp3')
let endSound = new Audio('end.mp3')


//get name
function getName() {
    let name = prompt("enter your name");
    if (name.trim() === "") {
        name = getName();
    }
    return name;
}

//timer
function startClock() {
    clock = setInterval(() => {
        timeLeft--;

        if (timeLeft > -1) {
            timer.textContent = timeLeft;
        } else {
            timeLeft.textContent = "Time's Up";
            end();
        }
    }, 1000);
}
//correctTileGenerator:
function correctTilesGenerator() {

    let element = Math.floor(Math.random() * 36 + 1);
    if (correctTiles.length === 36) {
        end();

    } else if (!correctTiles.includes(element)) {
        correctTiles.push(element);
    }
    else {
        correctTilesGenerator();
    }
}

// lists comparision:
function isSame(list2, list1) {
    for (let i = 0; i < correctTiles.length; i++) {
        if (list1[i] !== list2[i]) {
            return false;
        }
    }
    return true;
}


// displaying correct tiles:
let display = function (i) {
    buttons[i].classList.toggle('correct');
}

let hide = function (i) {
    buttons[i].classList.toggle('correct');

}

function displayCorrectTiles() {
    let i = 900;
    for (let j = 0; j < correctTiles.length; j++) {
        setTimeout(display, i, correctTiles[j] - 1);
        setTimeout(hide, i + 900, correctTiles[j] - 1);
        i += 900;
    }

}
//final result
function result() {

    if (currentTiles.length === correctTiles.length) {

        if (isSame(correctTiles, currentTiles)) {
            score += 1;
            dislpayScore.textContent = score;
            currentTiles = [];
            clickSound.play();
            correctTilesGenerator();
            displayCorrectTiles();
            timeLeft += 10;
        } else {
            endSound.play();
            end();
        }
    }
    else {

        for (let i = 0; i < currentTiles.length; i++) {
            if (correctTiles[i] !== currentTiles[i]) {
                endSound.play();
                end();
            } else {
                clickSound.play();
            }
        }
    }
}


// game start and setting up board;
function start() {
    startClock();
    correctTilesGenerator();
    displayCorrectTiles();

    for (let i = 0; i < 36; i++) {
        buttons[i].addEventListener('click', () => {
            currentTiles.push(i + 1);
            result();
        })
    }

}
start();

// end
function end() {
    let name = getName();
    window.localStorage.setItem(name, score);
    score = 0;
    currentTiles = [];
    correctTiles = [];
    dislpayScore.textContent = 0;
    timeLeft = 15;
    clearInterval(clock);
    let again = prompt("do yo want to play again?Type 'yes' if you want to play again");
    if (again === "yes") {
        correctTilesGenerator();
        displayCorrectTiles();
        startClock();
    } else {
        alert('thanks for playing');
        window.location.replace('leaderboard.html');
    }
}