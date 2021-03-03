// global variables for gameplay
var lights = ['green', 'red', 'yellow', 'blue'];
var series = [];
var userChoices =[];
var userContinues = true;
var highScore = 0;
var rounds = 0;
var timer = 5000;

// declare states for flashing lights (opacity)
var on = "1";
var off = "0.5";
var turnedOn = false;


function start(){
    toggleIndicator();

    // turn on game and notify console
    console.log('game has started');

    setTimeout(playRound, 3000);
}

function getIndex(){
    return Math.round(Math.random() * 3);
}

function toggleIndicator(){
    var indicator = document.getElementById('indicator');
    if (!turnedOn) {
        indicator.style.backgroundColor = "#7CFC00";
        turnedOn = true;
    }
    else {
        indicator.style.backgroundColor = "#FF0000";
        turnedOn = false;
    }
}

function lightShow(series){
    var timeout = 0;
    for (let i = 0, len = series.length; i < len; i++) {
        var timeout = timeout + 800;
        setTimeout(
            function(){
                flash(series[i]);
            },
            timeout
        );
    }
}

function flash(id){
    var circle = document.getElementById(id);
    // if it's on, turn it off
    if (circle.style.opacity == on){
        circle.style.opacity = off;
        return;
    }
    // if it's off, turn it on
    else{
        circle.style.opacity = on;
        // but when it' s on, turn off after a set time to produce flash
        setTimeout(
            function(){
                flash(id);
            },
            200
        );
    }
}

function check(){
    // if not same length definetly wrong
    if ( series.length != userChoices.length ) userContinues = false;
    // check each item against the pattern
    for (let i = 0, len = userChoices.length; i < len; i++) {
        if ( userChoices[i] != series[i] ) userContinues = false;
    }
}

function add(light){
    userChoices.push(light)
}

function playRound(){
    rounds++;
    timer = timer + (series.length * 1000)
    document.getElementById('lastScore').innerHTML = rounds;
    // reset the user inputs
    userChoices = [];

    // add random light to pattern, then flash the pattern
    // IMPORTANT - THIS PROCESS TAKES SOME OF THE TIME FROM THE USER
    var randomLight = lights[ getIndex() ];
    series.push( randomLight );
    lightShow(series);

    setTimeout(
        () => {
            check(),


            console.log("check")
        },
        timer);

    setTimeout( () => {
        if ( userContinues ) playRound();
        else {
            console.log('game over');
            endGameSequence();
        }
    }, timer + 100);

    // reset the timer
    timer = 5000;
}

function endGameSequence(){
    // firstly clear the array data
    series = [];
    userChoices = [];

    // then allow user to play again
    userContinues = true;

    // reset the timer and rounds
    timer = 5000;

    /* then add the score to 'lastScore'
    and if rounds tops last high score then update it,
    reset rounds after */
    document.getElementById('lastScore').innerHTML = rounds;

    if (rounds > highScore) {
        document.getElementById('highScore').innerHTML = rounds;
    }

    rounds = 0;

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
    )};

    toggleIndicator();
}
