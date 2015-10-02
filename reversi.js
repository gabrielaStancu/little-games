$(function () {
    init();
});

var randomArray = new Array();
var randomColor = ["0", "1", "0", "1", "0", "1", "0", "1", "0", "1", "0", "1", "0", "1", "0", "1", "0", "1", "0", "1", "0", "1", "0", "1", "0", "1", "0", "1", "0", "1", "0", "1", "0", "1", "0", "1", "0", "1", "0", "1", "0", "1", "0", "1", "0", "1", "0", "1", "0", "1", "0", "1", "0", "1", "0", "1", "0", "1", "0", "1", "0", "1", "0", "1"];

function init() {
    for (var i = 0; i < 64; i += 1) {
        randomArray.push(i);
    }

    randomArray = randomColor.sort(function () {
        return .5 - Math.random();
    });
    generateSquares();
    addColor();
    
}

function generateSquares() {
        $("#mySquares").empty();
        for (var i = 1; i <= 8; i++) {
            for (var j = 1; j <= 8; j++) {
                for (var k = 0; k < 64; k++) {
                    $("#mySquares").append("<div id=\"square_" + j + i + "\" class=\"row" + j + " square col" + i + "\"></div>");
                }
            }
        }
}

function addColor() {
    for (var i = 1; i <= 8; i++) {
        for (var j = 1; j <= 8; j++) {
            $("#square_" + j + i).addClass("color" + randomColor[0]);
            randomColor.splice(0,1);
        }
    }
}
