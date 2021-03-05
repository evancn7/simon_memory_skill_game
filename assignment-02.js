/*
The start function is the starting point of the program. It is called when the
user clicks the #prompt in the HTML file. The playRound function is called from
here and control redirects to that function where all aspects of the round are
taken care of. It tracks the score by incrementing for each new round, it
resets userChoices for a new round of play, it flashes the light series for
user to repeat, it sets the time for the round and it checks on timeout. In the
end, depending on the outcome of the check, it sets the alive variable to true
or false, this determines if the game ends or continues, if true game loops if
false then the endGameSequence function is called and this clears out all data
for another game to played.
*/

// global variables for gameplay
var lights = ['green', 'red', 'yellow', 'blue']; // the lights
var series = []; // the pattern for the user to remember
var userChoices = []; // the users guess at the pattern
var alive = true; // is the user alive to continue??
var highScore = 0;
var score = 0;
var timer = 5000;

// declare states for flashing lights (opacity)
var on = "1";
var off = "0.5";
var turnedOn = false;


function start() {
    toggleIndicator();

    // turn on game and notify console
    console.log('game has started');

    // play the 1st round, control of rounds then takes place in playRound()
    setTimeout(playRound, 3000);
}

function getIndex() {
    // random number to chose in light array
    return Math.round(Math.random() * 3);
}

function toggleIndicator() {
    // this function will act like a switch depending on the state of the light
    var indicator = document.getElementById('indicator');
    // if not on, turn on
    if (!turnedOn) {
        indicator.style.backgroundColor = "#7CFC00";
        turnedOn = true;
    }
    // if on, then turn off
    else {
        indicator.style.backgroundColor = "#FF0000";
        turnedOn = false;
    }
}

function lightShow(series) {
    var timeout = 0;
    // flash each light in the series for the user
    for (let i = 0, len = series.length; i < len; i++) {
        var timeout = timeout + 800;
        setTimeout(
            function () {
                flash(series[i]);
            },
            timeout
        );
    }
}

function flash(id) {
    var circle = document.getElementById(id);
    // if it's on, turn it off
    if (circle.style.opacity == on) {
        circle.style.opacity = off;
        return;
    }
    // if it's off, turn it on
    else {
        circle.style.opacity = on;
        // but when it' s on, turn off after a set time to produce flash
        setTimeout(
            function () {
                flash(id);
            },
            200
        );
    }
}

function check() {
    // if not same length definetly wrong
    if (series.length != userChoices.length) alive = false;
    // check each item against the pattern
    for (let i = 0, len = userChoices.length; i < len; i++) {
        if (userChoices[i] != series[i]) alive = false;
    }
}

function add(light) {
    userChoices.push(light)
}

function playRound() {
    // new round, increment it
    score++;
    /* add timer and add 1 second for each light, this is added to the timeout
    for check below as before the flashing lights used up the round time as the
    lights take time to flash */
    timer = timer + (series.length * 1000)
    document.getElementById('lastScore').innerHTML = score;

    // reset the user inputs for this round
    userChoices = [];

    // add random light to the series
    // IMPORTANT - THIS PROCESS TAKES SOME OF THE TIME FROM THE USER
    // adding the time above corrected this
    var randomLight = lights[getIndex()];
    series.push(randomLight);
    // call the lightShow method to flash the series
    lightShow(series);

    // check the user input (userChoices) against the series after the round times out
    setTimeout(
        () => {
            check(),
                console.log("check")
        },
        timer);

    setTimeout(() => {
        if (alive) playRound();
        else {
            console.log('game over');
            endGameSequence();
        }
    }, timer + 100);

    // reset the timer
    timer = 5000;
}

function endGameSequence() {
    // firstly clear the array data
    series = [];
    userChoices = [];

    // then allow user to play again if they want
    alive = true;

    // reset the timer and score
    timer = 5000;

    /* then add the score to 'lastScore'
    and if score tops last high score then update it,
    reset score after */
    document.getElementById('lastScore').innerHTML = score;

    if (score > highScore) {
        highScore = score;
        document.getElementById('highScore').innerHTML = highScore;
    }

    score = 0;

    // flash the lights 5 times
    flashTimer = 0;
    for (let i = 0; i < 5; i++) {
        flashTimer = flashTimer + 350;
        setTimeout(() => {
            flash(lights[0]);
            flash(lights[1]);
            flash(lights[2]);
            flash(lights[3]);
        },
            flashTimer
        )
    };

    // turn off the indicator
    toggleIndicator();
}
