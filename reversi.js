$(function () {
    init();
});

function init() {
    generateItems();
    startGame();
}

var greenUser = true;
var index = 0;
var x = 0;
var y = 0;

function generateItems() {
//    squares are generated
    $("#mySquares").empty();
    for (var i = 1; i <= 8; i++) {
        for (var j = 1; j <= 8; j++) {
            $("#mySquares").append("<div id=\"square_" + j + i + "\" class=\"row" + j + " square button color0 col" + i + "\"></div>");
            $("#square_" + j + i).off("click").on("click", clickOnItem);
        }
    }
//    lines are generated
    for (var j = 0; j <= 13; j++) {
        $("#myLines").append("<div id=\"line" + j + "\" class=\"line\"></div>");
    }
}

function startGame() {
    $("#square_44, #square_55").removeClass("color0").addClass("color1");
    $("#square_45, #square_54").removeClass("color0").addClass("color2");
}

function clickOnItem() {
    index = this.id.substring(7);
    x = index.substring(0,1);
    y = index.substring(1);
    x = parseInt(x);
    y = parseInt(y);
    if ($("#square_" + index).hasClass("color0")) {
        if (greenUser) {
            greenUser = false;
            $("#square_" + index).removeClass("color0").addClass("color1");
            colorSquaresWithGreen();
        } else {
            greenUser = true;
            $("#square_" + index).removeClass("color0").addClass("color2");
            colorSquaresWithBlack();
        }
    }
}

function colorSquaresWithGreen() {
//    up -> (x-1, y)
    if (!$("#square_" + (x - 1) + y).hasClass("color0")) {
        for (var i = x; i >= 1; i--) {
            if ($("#square_" + i + y).hasClass("color2")) {
                $("#square_" + i + y).removeClass("color2").addClass("color1");
            }
        }
    }
//    down -> (x+1, y) 
    if (!$("#square_" + (x + 1) + y).hasClass("color0")  && (x+1) < 9 && (y+1) < 9) {
        for (var i = x; i <= 8; i++) {
            if ($("#square_" + i + y).hasClass("color2")) {
                $("#square_" + i + y).removeClass("color2").addClass("color1");
            }
        }
    }
//    left, same line -> (x, y-1) 
    if (!$("#square_" + x + (y - 1)).hasClass("color0")) {
        for (var i = y; i >= 1; i--) {
            if ($("#square_" + x + i).hasClass("color2")) {
                $("#square_" + x + i).removeClass("color2").addClass("color1");
            }
        }
    }
//    right, same line -> (x, y+1) 
    if (!$("#square_" + x + (y + 1)).hasClass("color0") && (x+1) < 9 && (y+1) < 9) {
        for (var i = y; i <= 8; i++) {
            if ($("#square_" + x + i).hasClass("color2")) {
                $("#square_" + x + i).removeClass("color2").addClass("color1");
            }
        }
    }
//    upper left corner -> (x-1, y-1) 
    if (!$("#square_" + (x - 1) + (y - 1)).hasClass("color0")) {
        for (var i = x; i >= 1; i--) {
            if ($("#square_" + i + y).hasClass("color2")) {
                $("#square_" + i + y).removeClass("color2").addClass("color1");
                y = y - 1;
            }
        }
    }
//    lower right corner -> (x+1, y+1) 
    if (!$("#square_" + (x + 1) + (y + 1)).hasClass("color0") && x+1 < 9 && y+1 < 9) {
        for (var i = x; i <= 8; i++) {
            if ($("#square_" + i + y).hasClass("color2")) {
                $("#square_" + i + y).removeClass("color2").addClass("color1");
                y = y + 1;
            }
        }
    }
//    upper right corner -> (x-1, y+1) 
    if (!$("#square_" + (x - 1) + (y + 1)).hasClass("color0") && (x + 1) < 9 && (y + 1) < 9) {
        for (var i = x; i >= 1; i--) {
            if ($("#square_" + i + y).hasClass("color2")) {
                $("#square_" + i + y).removeClass("color2").addClass("color1");
                y = y + 1;
            }
        }
    }
//    lower left corner -> (x+1, y-1) 
    if (!$("#square_" + (x + 1) + (y + 1)).hasClass("color0") && (x+1) < 9 && (y+1) < 9) {
        for (var i = x; i <= 8; i++) {
            if ($("#square_" + i + y).hasClass("color2")) {
                $("#square_" + i + y).removeClass("color2").addClass("color1");
                y = y - 1;
            }
        }
    }
}

function colorSquaresWithBlack() {
//    up -> (x-1, y)
    if (!$("#square_" + (x - 1) + y).hasClass("color0")) {
        for (var i = x; i >= 1; i--) {
            if ($("#square_" + i + y).hasClass("color1")) {
                $("#square_" + i + y).removeClass("color1").addClass("color2");
            }
        }
    }
//    down -> (x+1, y) 
    if (!$("#square_" + (x + 1) + y).hasClass("color0")  && (x+1) < 9 && (y+1) < 9) {
        for (var i = x; i <= 8; i++) {
            if ($("#square_" + i + y).hasClass("color1")) {
                $("#square_" + i + y).removeClass("color1").addClass("color2");
            }
        }
    }
//    left, same line -> (x, y-1) 
    if (!$("#square_" + x + (y - 1)).hasClass("color0")) {
        for (var i = y; i >= 1; i--) {
            if ($("#square_" + x + i).hasClass("color1")) {
                $("#square_" + x + i).removeClass("color1").addClass("color2");
            }
        }
    }
//    right, same line -> (x, y+1) 
    if (!$("#square_" + x + (y + 1)).hasClass("color0") && (x+1) < 9 && (y+1) < 9) {
        for (var i = y; i <= 8; i++) {
            if ($("#square_" + x + i).hasClass("color1")) {
                $("#square_" + x + i).removeClass("color1").addClass("color2");
            }
        }
    }
//    upper left corner -> (x-1, y-1) 
    if (!$("#square_" + (x - 1) + (y - 1)).hasClass("color0")) {
        for (var i = x; i >= 1; i--) {
            if ($("#square_" + i + y).hasClass("color1")) {
                $("#square_" + i + y).removeClass("color1").addClass("color2");
                y = y - 1;
            }
        }
    }
//    lower right corner -> (x+1, y+1) 
    if (!$("#square_" + (x + 1) + (y + 1)).hasClass("color0") && x+1 < 9 && y+1 < 9) {
        for (var i = x; i <= 8; i++) {
            if ($("#square_" + i + y).hasClass("color1")) {
                $("#square_" + i + y).removeClass("color1").addClass("color2");
                y = y + 1;
            }
        }
    }
//    upper right corner -> (x-1, y+1) 
    if (!$("#square_" + (x - 1) + (y + 1)).hasClass("color0") && (x + 1) < 9 && (y + 1) < 9) {
        for (var i = x; i >= 1; i--) {
            if ($("#square_" + i + y).hasClass("color1")) {
                $("#square_" + i + y).removeClass("color1").addClass("color2");
                y = y + 1;
            }
        }
    }
//    lower left corner -> (x+1, y-1) 
    if (!$("#square_" + (x + 1) + (y + 1)).hasClass("color0") && (x+1) < 9 && (y+1) < 9) {
        for (var i = x; i <= 8; i++) {
            if ($("#square_" + i + y).hasClass("color1")) {
                $("#square_" + i + y).removeClass("color1").addClass("color2");
                y = y - 1;
            }
        }
    }
}
