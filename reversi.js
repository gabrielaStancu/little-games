$(function () {
    init();
});

function init() {
    generateSquares();
}

function generateSquares() {
        $("#mySquares").empty();
        for (var i = 1; i <= 8; i++) {
            for (var j = 1; j <= 8; j++) {
                $("#mySquares").append("<div id=\"square_" + j + i + "\" class=\"row" + j + " black square col" + i + "\"></div>");
            }
        }
}
