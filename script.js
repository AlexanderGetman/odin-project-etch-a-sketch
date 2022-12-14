window.mobileCheck = function() {
    let check = false;
    (function(a){if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4))) check = true;})(navigator.userAgent||navigator.vendor||window.opera);
    return check;
  };

var container = document.getElementById("grid-container");

var isMobile = window.matchMedia("only screen and (max-width: 760px)").matches;
var slider = document.querySelector("#slider");
var trigger = false;
var color = "#ff0000";
var numberOfRows = 16;
var squaresHorizontal = numberOfRows;
var squaresVertical = numberOfRows;
var numberOfRowsText = document.getElementById("number-of-rows");
numberOfRowsText.textContent = 16;
var width = 400;

function buildGrid() {
    for (var i = 0; i < squaresHorizontal * squaresVertical; i++) {
    var square = document.createElement("div");
    square.className = "square";
    container.appendChild(square);
    square.style.width = (width/numberOfRows) + 'px';
    square.style.height = (width/numberOfRows) + 'px';
    }
}

if (mobileCheck()) {
    var elems = document.querySelectorAll(".wrapper");
    [].forEach.call(elems, function(el) {
        el.classList.remove("wrapper");
    });
    
    numberOfRows = 16;
    width = screen.width;
    document.getElementById("grid-container").style.width = width + "px";
    document.getElementById('bottom').style.paddingBottom = '50px';
}

buildGrid();

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

function paintOnMobile() {
    function clearAll() {
        trigger = true;        
    }

    function select(e) {
        e.preventDefault();
        if (trigger) {
            var changedTouch = e.changedTouches[0];
            var elem = document.elementFromPoint(changedTouch.clientX, changedTouch.clientY);
            if (elem.className === 'square') {
                elem.style.backgroundColor = color;
            }
        }
    }

    function reset() {
        trigger = false;
    }

    function start() {
        for (var i = 0; i < squares.length; i++) {
            squares[i].addEventListener("touchstart", clearAll, {passive: false});
            squares[i].addEventListener("touchmove", select, {passive: false});
            squares[i].addEventListener("touchend", reset, {passive: false});
        }
    }

    start();
}

paint();
paintOnMobile();

function onStart (touchEvent) {
    if(navigator.userAgent.match(/Android/i)) {
    touchEvent.preventDefault();
    }
}

document.querySelector("#color-select").onchange = e => {
    color = e.target.value;
}

slider.addEventListener('change', () => {
    numberOfRows = slider.value;
    squaresHorizontal = numberOfRows;
    squaresVertical = numberOfRows;
    container.textContent = '';

    
    buildGrid();
    squares = document.querySelectorAll(".square");

    paint();
    paintOnMobile();

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