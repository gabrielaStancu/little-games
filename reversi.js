$(function () {
    init();
});

function init() {
    generateItems();
    startGame();
}

var greenUser = true;
var inside = false;
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
    x = parseInt(index.substring(0,1));
    y = parseInt(index.substring(1));
    if ($("#square_" + index).hasClass("color0")) {
        if (greenUser) {
            greenUser = false;
            $("#square_" + index).removeClass("color0").addClass("color1");
            colorSquaresInGreen();
        } else {
            greenUser = true;
            $("#square_" + index).removeClass("color0").addClass("color2");
            colorSquaresInBlack();
        }
    }
}

// todo: 1. make a single method for colorSquaresInBlack and colorSquaresInGreen, like: move(player,x,y), after this methods run correct

// todo: 2. one method to find the corect path for the 8 directions, like: move(player,x,y,xDirection,yDirection), where xDirection,xDirection can let the following values:[-1,0,1]

// todo: 3: I am joke:)

function colorSquaresInGreen() {
//    up -> (x-1, y)
    if (!$("#square_" + (x - 1) + y).hasClass("color0") && (x - 1) > 0) {
        var innerY = y;
        var indexesOnX = [];
        var lastIndex;
        for (var i = (x - 1); i >= 1; i--) {
            if ($("#square_" + i + innerY).hasClass("color2")) {
                indexesOnX.push(i);
            } else {
                lastIndex = i;
                if ($("#square_" + i + innerY).hasClass("color1")) {
                    for (var k = 0; k < indexesOnX.length; k++) {
                        $("#square_" + indexesOnX[k] + innerY).removeClass("color2").addClass("color1");
                    }
                }
                break;
            }
        }
    }
//    down -> (x+1, y) 
    if (!$("#square_" + (x + 1) + y).hasClass("color0") && (x + 1) < 9) {
        var innerY = y;
        var indexesOnX = [];
        var lastIndex;
        for (var i = (x + 1); i <= 8; i++) {
            if ($("#square_" + i + innerY).hasClass("color2")) {
                indexesOnX.push(i);
            } else {
                lastIndex = i;
                if ($("#square_" + i + innerY).hasClass("color1")) {
                    for (var k = 0; k < indexesOnX.length; k++) {
                        $("#square_" + indexesOnX[k] + innerY).removeClass("color2").addClass("color1");
                    } 
                }
                break;
            }
        }
    }
//    left, same line -> (x, y-1) 
    if (!$("#square_" + x + (y - 1)).hasClass("color0") && (y - 1) > 0) {
        var innerY = y;
        var indexesOnY = [];
        var lastIndex;
        for (var i = (innerY - 1); i >= 1; i--) {
            if ($("#square_" + x + i).hasClass("color2")) {
                indexesOnY.push(i);
            } else {
                lastIndex = i;
                if ($("#square_" + i + innerY).hasClass("color1")) {
                    for (var k = 0; k < indexesOnY.length; k++) {
                        $("#square_" + x + indexesOnY[k]).removeClass("color2").addClass("color1");
                    } 
                }
                break;
            }
        }
    }
//    right, same line -> (x, y+1) 
    if (!$("#square_" + x + (y + 1)).hasClass("color0") && (y + 1) < 9) {
        var innerY = y;
        var indexesOnY = [];
        var lastIndex;
        for (var i = (innerY + 1); i <= 8; i++) {
            if ($("#square_" + x + i).hasClass("color2")) {
                indexesOnY.push(i);
            } else {
                lastIndex = i;
                if ($("#square_" + i + innerY).hasClass("color1")) {
                    for (var k = 0; k < indexesOnY.length; k++) {
                        $("#square_" + x + indexesOnY[k]).removeClass("color2").addClass("color1");
                    } 
                }
                break;
            }
        }
    }
//    upper left corner -> (x-1, y-1) 
    if (!$("#square_" + (x - 1) + (y - 1)).hasClass("color0") && (x - 1) > 0 && (y - 1) > 0) {
        var innerY = y;
        var anotherInnerY = y;
        var indexesOnX = [];
        var lastIndexOnX;
        var lastIndexOnY;
        for (var i = (x - 1); i >= 1; i--) {
            if ($("#square_" + i + innerY).hasClass("color2")) {
                indexesOnX.push(i);
            } else {
                lastIndexOnX = i;
                lastIndexOnY = innerY;
                if ($("#square_" + lastIndexOnX + lastIndexOnY).hasClass("color1")) {
                    for (var k = 0; k < indexesOnX.length; k++) {
                        $("#square_" + x + indexesOnY[k]).removeClass("color2").addClass("color1");
                        anotherInnerY = anotherInnerY - 1;
                    } 
                }
                break;
            }
            innerY = innerY - 1;
        }
    }
//    lower right corner -> (x+1, y+1) 
    if (!$("#square_" + (x + 1) + (y + 1)).hasClass("color0") && (x + 1) < 9 && (y + 1) < 9) {
        var innerY = y;
        for (var i = x; i <= 8; i++) {
            if ($("#square_" + i + innerY).hasClass("color2")) {
                $("#square_" + i + innerY).removeClass("color2").addClass("color1");
            }
            innerY = innerY + 1;
        }
    }
//    upper right corner -> (x-1, y+1) 
    if (!$("#square_" + (x - 1) + (y + 1)).hasClass("color0") && (x - 1) > 0 && (y + 1) < 9) {
        var innerY = y;
        for (var i = x; i >= 1; i--) {
            if ($("#square_" + i + innerY).hasClass("color2")) {
                $("#square_" + i + innerY).removeClass("color2").addClass("color1");
            }
            innerY = innerY + 1;
        }
    }
//    lower left corner -> (x+1, y-1) 
    if (!$("#square_" + (x + 1) + (y - 1)).hasClass("color0") && (x + 1) < 9 && (y - 1) > 0) {
        var innerY = y;
        for (var i = x; i <= 8; i++) {
            if ($("#square_" + i + innerY).hasClass("color2")) {
                $("#square_" + i + innerY).removeClass("color2").addClass("color1");
            }
            innerY = innerY - 1;
        }
    }
}

function colorSquaresInBlack() {
//    up -> (x-1, y)
    if (!$("#square_" + (x - 1) + y).hasClass("color0") && (x - 1) > 0) {
        var innerY = y;
        for (var i = x; i >= 1; i--) {
            if ($("#square_" + i + innerY).hasClass("color1")) {
                $("#square_" + i + innerY).removeClass("color1").addClass("color2");
            }
        }
    }
//    down -> (x+1, y) 
    if (!$("#square_" + (x + 1) + y).hasClass("color0")  && (x + 1) < 9) {
        var innerY = y;
        for (var i = x; i <= 8; i++) {
            if ($("#square_" + i + innerY).hasClass("color1")) {
                $("#square_" + i + innerY).removeClass("color1").addClass("color2");
            }
        }
    }
//    left, same line -> (x, y-1) 
    if (!$("#square_" + x + (y - 1)).hasClass("color0") && (y - 1) > 0) {
        var innerY = y;
        for (var i = innerY; i >= 1; i--) {
            if ($("#square_" + x + i).hasClass("color1")) {
                $("#square_" + x + i).removeClass("color1").addClass("color2");
            }
        }
    }
//    right, same line -> (x, y+1) 
    if (!$("#square_" + x + (y + 1)).hasClass("color0") && (y + 1) < 9) {
        var innerY = y;
        for (var i = innerY; i <= 8; i++) {
            if ($("#square_" + x + i).hasClass("color1")) {
                $("#square_" + x + i).removeClass("color1").addClass("color2");
            }
        }
    }
//    upper left corner -> (x-1, y-1) 
    if (!$("#square_" + (x - 1) + (y - 1)).hasClass("color0") && (x - 1) > 0 && (y - 1) > 0) {
        var innerY = y;
        for (var i = x; i >= 1; i--) {
            if ($("#square_" + i + innerY).hasClass("color1")) {
                $("#square_" + i + innerY).removeClass("color1").addClass("color2");
            }
            innerY = innerY - 1;
        }
    }
//    lower right corner -> (x+1, y+1) 
    if (!$("#square_" + (x + 1) + (y + 1)).hasClass("color0") && (x + 1) < 9 && (y + 1) < 9) {
        var innerY = y;
        for (var i = x; i <= 8; i++) {
            if ($("#square_" + i + innerY).hasClass("color1")) {
                $("#square_" + i + innerY).removeClass("color1").addClass("color2");
            }
            innerY = innerY + 1;
        }
    }
//    upper right corner -> (x-1, y+1) 
    if (!$("#square_" + (x - 1) + (y + 1)).hasClass("color0") && (x - 1) > 0 && (y + 1) < 9) {
        var innerY = y;
        for (var i = x; i >= 1; i--) {
            if ($("#square_" + i + innerY).hasClass("color1")) {
                $("#square_" + i + innerY).removeClass("color1").addClass("color2");
            }
            innerY = innerY + 1;
        }
    }
//    lower left corner -> (x+1, y-1) 
    if (!$("#square_" + (x + 1) + (y - 1)).hasClass("color0") && (x + 1) < 9 && (y - 1) > 0) {
        var innerY = y;
        for (var i = x; i <= 8; i++) {
            if ($("#square_" + i + innerY).hasClass("color1")) {
                $("#square_" + i + innerY).removeClass("color1").addClass("color2");
            }
            innerY = innerY - 1;
        }
    }
}
