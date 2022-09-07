var container = document.getElementById("grid-container");

var squaresHorizontal = 16;
var squaresVertical = 16;
var trigger = false;
var color = "#ff0000";

document.querySelector("#color-select").onchange = e => {
    color = e.target.value;
 }

for (var i = 0; i < squaresHorizontal * squaresVertical; i++) {
    var square = document.createElement("div");
    square.className = "square";
    container.appendChild(square);
}

var squares = document.querySelectorAll(".square");

squares.forEach((item) => {
    item.addEventListener('mouseenter', () => {
        if (trigger === true) {
            item.style.backgroundColor = color;
        }
    })

    item.addEventListener('mousedown', () => {
        item.style.backgroundColor = color;        
    })
})

document.addEventListener('mouseup', function(){
    trigger = false;
});

document.addEventListener('mousedown', function(){
    trigger = true;
});

function change() {
    color = "#" + Math.floor(Math.random()*16777215).toString(16);
}

var checkbox = document.getElementById('random-color-checkbox');

checkbox.addEventListener('change', () => {
    if (checkbox.checked) {
        change();
        setInterval(change, 100);
    }
});
