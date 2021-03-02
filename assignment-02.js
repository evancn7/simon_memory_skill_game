// global variables
var lights = ['green', 'red', 'yellow', 'blue'];
var series = [];
var userChoices =[];
var userContinues = true;
// declare states for flashing lights (opacity)
var on = "1";
var off = "0.5";


function start(){
    // turn on game and notify console
    toggleIndicator();
    console.log('game has started');

    // add random light to pattern, then flash the pattern
    var randomLight = lights[ getIndex() ];
    series.push( randomLight );
    lightShow(series);

    // user has 5 seconds to input the sequence
    userSequence();
    setTimeout( check, 5000 );
}

function getIndex(){
    return Math.round(Math.random() * 3);
}

function toggleIndicator(){
    var indicator = document.getElementById('indicator');
    indicator.style.backgroundColor = "#7CFC00";
}

function lightShow(series){
    var timeout = 0;
    for (let i = 0, len = series.length; i < len; i++) {
        var timeout = timeout + 1000;
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
    if ( series.length != userChoices.length ) return false;
    // check each item against the pattern
    for (let i = 0, len = userChoices.length; i < len; i++) {
        if ( userChoices[i] != series[i] ) return false;
    }
    return true;
}
