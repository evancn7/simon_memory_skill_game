function getIndex(n){
    return Math.round(Math.random() * n);
}
function toggleIndicator(){
    var indicator = document.getElementById('indicator');
    indicator.style.backgroundColor = "#7CFC00";
}
function flash(){
    var circle = document.getElementById("green");
    if (circle.style.opacity == "1"){
        circle.style.opacity = "0.5";
        return;
    }
    else{
        circle.style.opacity = "1";
        setTimeout(flash, 200);
    }
}
