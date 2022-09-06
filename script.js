var container = document.getElementById("grid-container");

var squaresHorizontal = 16;
var squaresVertical = 16;
var trigger = false;

for (var i = 0; i < squaresHorizontal * squaresVertical; i++) {
    var square = document.createElement("div");
    square.className = "square";
    container.appendChild(square);
}

var squares = document.querySelectorAll(".square");

squares.forEach((item) => {
    item.addEventListener('mouseenter', () => {
        if (trigger === true) {
            item.style.backgroundColor = "red";
        }
    })
})

document.addEventListener('mousedown', function(){
    trigger = true;
});

document.addEventListener('mouseup', function(){
    trigger = false;
});
