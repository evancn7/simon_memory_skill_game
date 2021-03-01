// global variables
var lights = ['green', 'red', 'yellow', 'blue'];
var series = [];
var userChoices =[];


function start(){

    while (true){

        toggleIndicator();

        console.log('ha iniciado el juego');

        var randomLight = lights[ getIndex() ];

        series.push( randomLight );

        lightShow(series);

        // user input code block
        // i need to wait for the response and then push to userChoices

        break;

    }
}




function getIndex(){
    return Math.round(Math.random() * 4);
}


function toggleIndicator(){
    var indicator = document.getElementById('indicator');
    indicator.style.backgroundColor = "#7CFC00";
}





function lightShow(series){
    // an array for testing
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


// the flash function


// declare the two states of the circle
var on = "1";
var off = "0.5";


// takes in the id of the element from which it is called using this.id
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
