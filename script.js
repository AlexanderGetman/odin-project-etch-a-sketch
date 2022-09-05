var container = document.getElementById("grid-container");

var squaresHorizontal = 16;
var squaresVertical = 16;

for (var i = 0; i < squaresHorizontal * squaresVertical; i++) {
    var square = document.createElement("div");
    square.className = "square";
    container.appendChild(square);
}

