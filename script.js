var container = document.getElementById("grid-container");

var slider = document.querySelector("#slider");
var trigger = false;
var color = "#ff0000";
var numberOfRows = 16;
var squaresHorizontal = numberOfRows;
var squaresVertical = numberOfRows;
var numberOfRowsText = document.getElementById("number-of-rows");
numberOfRowsText.textContent = 16;

for (var i = 0; i < squaresHorizontal * squaresVertical; i++) {
    var square = document.createElement("div");
    square.className = "square";
    container.appendChild(square);
    square.style.width = (400/numberOfRows) + 'px';
    square.style.height = (400/numberOfRows) + 'px';
}

var squares = document.querySelectorAll(".square");

function paint() {
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
}

paint()

document.querySelector("#color-select").onchange = e => {
    color = e.target.value;
}

slider.addEventListener('change', () => {
    numberOfRows = slider.value;
    squaresHorizontal = numberOfRows;
    squaresVertical = numberOfRows;
    container.textContent = '';

    
    for (var i = 0; i < squaresHorizontal * squaresVertical; i++) {
        var square = document.createElement("div");
        square.className = "square";
        container.appendChild(square);
        square.style.width = (400/numberOfRows) + 'px';
        square.style.height = (400/numberOfRows) + 'px';
    }
    squares = document.querySelectorAll(".square");

    paint()

    document.getElementById("number-of-rows").textContent = numberOfRows;
})

document.addEventListener('mouseup', function(){
    trigger = false;
});

document.addEventListener('mousedown', function(){
    trigger = true;
});

var timer;
var randomColorCheckbox = document.getElementById('random-color-checkbox');
var randomColorStatus = null;

randomColorCheckbox.addEventListener('change', () => {
    function change() {
        color = "#" + Math.floor(Math.random()*16777215).toString(16);        
    }

    if (randomColorCheckbox.checked) {
        change();
        timer = setInterval(change, 100);        
    }

    if (randomColorCheckbox.checked == false) {        
        clearInterval(timer);
        document.querySelector("#color-select").value = color;
        document.querySelector("#color-select").onchange = e => {
            color = e.target.value;
        }
    }
});

var clearButton = document.getElementById('clear-button');

clearButton.addEventListener('click', () => {
    squares.forEach((item) => {
        item.style.backgroundColor = "white";
    })
});