$(function () {
    init();
});

function init() {
    generateItems();
    startGame();
}

var greenUser = true;
var green = true;
var inside = false;
var index = 0;
var countNearness = 0;
var matrix = [];
var totalGreens = 0;
var totalBlacks = 0;

function generateItems() {
//    matrix is generated
    for (var i = 1; i < 9; i++) {
        matrix[i] = [];
    }
    
//    squares are generated
    $("#mySquares").empty();
    for (var i = 1; i <= 8; i++) {
        for (var j = 1; j <= 8; j++) {
            $("#mySquares").append("<div id=\"square_" + j + i + "\" class=\"row" + j + " square button color0 col" + i + "\"></div>");
            $("#square_" + j + i).off("click").on("click", clickOnItem);
            matrix[i][j] = 0;
        }
    }
//    lines are generated
    for (var j = 0; j <= 13; j++) {
        $("#myLines").append("<div id=\"line" + j + "\" class=\"line\"></div>");
    }
//    infinity signs are generated
    for (var k = 0; k <= 125; k++) {
        $("#infinityHolder").append("<div id=\"infinity" + k + "\" class=\"infinity\"></div>");
    }
}

function movePlayer(x, y, player) {
    matrix[x][y] = player;
}


function startGame() {
//    matrix[4][4]=1;
//    matrix[5][5]=1;
//    matrix[4][5]=2;
//    matrix[5][4]=2;
    $("#square_44, #square_55").removeClass("color0").addClass("color1");
    $("#square_45, #square_54").removeClass("color0").addClass("color2");
}

function clickOnItem() {
    index = this.id.substring(7);
    var x = parseInt(index.substring(0,1));
    var y = parseInt(index.substring(1));
    if ($("#square_" + index).hasClass("color0")) {
        if (greenUser) {
            checkNearness(x, y);
            if(countNearness !== 0) {
                $("#square_" + index).removeClass("color0").addClass("color1");
                countNearness = 0;
            } else {
                return;
            }
            greenUser = false;
            green = true;
            colorSquares(x, y);
        } else {
            checkNearness(x, y);
            if(countNearness !== 0) {
                $("#square_" + index).removeClass("color0").addClass("color2");
                countNearness = 0;
            } else {
                return;
            }
            greenUser = true;
            green = false;
            colorSquares(x, y);
        }
    }
}

// todo: 1. make a single method for colorSquaresInBlack and colorSquaresInGreen, like: move(player,x,y), when this methods runs correctly

// todo: 2. one method to find the corect path for all the 8 directions, like: move(player,x,y,xDirection,yDirection), where xDirection,yDirection can get the following values:[-1,0,1]

// todo: 3: I see the gameboard like a matrix (I call "m", you call it as you want) with the dimensions 8x8, having the values:
// - 0, empty space (or gray)
// - 1, green space (or player1 space)
// - 2, black space  (or player2 space)
// So, when a player (now I choose player1) put a piece into a space (x,y) on gameboard you must do the following checks (I'll describe only for the up path : ((x-1),y):
// if m[x][y]=0, ok, empty space check
// while if the potential occupied piece is on gameboard:
//    (x'+xd=>0 && x'+xd<=7) //, where xd = xDirection = -1, and intial x'=x, and then x' will be the next potential x'=x+xd
//    (y'+yd>=0 && y'+yd<=7) // where yx=yDirection = 0 and inital y'=y  and then y' will be the next potential y'=x+yd  
// and m[x'+xd][y'+yd]=2, ok
// then the algorithm moves the while step, then, check
//   if the next potential space (x',y') is on gameboard and m[x'][y']=1, ok
// if you arrive in this point change all space between (x,y) and (x',y') with your pieces

function checkNearness(x, y) {
    if (!$("#square_" + (x - 1) + y).hasClass("color0") && (x - 1) > 0) {countNearness++;}
    if (!$("#square_" + (x + 1) + y).hasClass("color0") && (x + 1) < 9) {countNearness++;}
    if (!$("#square_" + x + (y - 1)).hasClass("color0") && (y - 1) > 0) {countNearness++;}
    if (!$("#square_" + x + (y + 1)).hasClass("color0") && (y + 1) < 9) { countNearness++;}
    if (!$("#square_" + (x - 1) + (y - 1)).hasClass("color0") && (x - 1) > 0 && (y - 1) > 0) {countNearness++;}
    if (!$("#square_" + (x + 1) + (y + 1)).hasClass("color0") && (x + 1) < 9 && (y + 1) < 9) {countNearness++;}
    if (!$("#square_" + (x - 1) + (y + 1)).hasClass("color0") && (x - 1) > 0 && (y + 1) < 9) {countNearness++;}
    if (!$("#square_" + (x + 1) + (y - 1)).hasClass("color0") && (x + 1) < 9 && (y - 1) > 0) {countNearness++;}
}

function colorSquares(x, y) {
    if (green) {
        colorIn = 1;
        colorOut = 2;
    } else {
        colorIn = 2;
        colorOut = 1;
    }
//    up -> (x-1, y)
    if (!$("#square_" + (x - 1) + y).hasClass("color0") && (x - 1) > 0) {
        var innerY = y;
        var indexesOnX = [];
        for (var i = (x - 1); i >= 1; i--) {
            if ($("#square_" + i + innerY).hasClass("color" + colorOut)) {
                indexesOnX.push(i);
            } else {
                if ($("#square_" + i + innerY).hasClass("color" + colorIn)) {
                    for (var k = 0; k < indexesOnX.length; k++) {
                        $("#square_" + indexesOnX[k] + innerY).removeClass("color" + colorOut).addClass("color" + colorIn);
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
        for (var i = (x + 1); i <= 8; i++) {
            if ($("#square_" + i + innerY).hasClass("color" + colorOut)) {
                indexesOnX.push(i);
            } else {
                if ($("#square_" + i + innerY).hasClass("color" + colorIn)) {
                    for (var k = 0; k < indexesOnX.length; k++) {
                        $("#square_" + indexesOnX[k] + innerY).removeClass("color" + colorOut).addClass("color" + colorIn);
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
        for (var i = (innerY - 1); i >= 1; i--) {
            if ($("#square_" + x + i).hasClass("color" + colorOut)) {
                indexesOnY.push(i);
            } else {
                if ($("#square_" + x + i).hasClass("color" + colorIn)) {
                    for (var k = 0; k < indexesOnY.length; k++) {
                        $("#square_" + x + indexesOnY[k]).removeClass("color" + colorOut).addClass("color" + colorIn);
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
        for (var i = (innerY + 1); i <= 8; i++) {
            if ($("#square_" + x + i).hasClass("color" + colorOut)) {
                indexesOnY.push(i);
            } else {
                if ($("#square_" + x + i).hasClass("color" + colorIn)) {
                    for (var k = 0; k < indexesOnY.length; k++) {
                        $("#square_" + x + indexesOnY[k]).removeClass("color" + colorOut).addClass("color" + colorIn);
                    } 
                }
                break;
            }
        }
    }
//    upper left corner -> (x-1, y-1) 
    if (!$("#square_" + (x - 1) + (y - 1)).hasClass("color0") && (x - 1) > 0 && (y - 1) > 0) {
        var innerY = y;
        var indexesOnX = [];
        var indexesOnY = [];
        for (var i = (x - 1); i >= 1; i--) {
            innerY = innerY - 1;
            if ($("#square_" + i + innerY).hasClass("color" + colorOut)) {
                indexesOnX.push(i);
                indexesOnY.push(innerY);
            } else {
                if ($("#square_" + i + innerY).hasClass("color" + colorIn)) {
                    for (var k = 0; k < indexesOnX.length; k++) {
                        $("#square_" + indexesOnX[k] + indexesOnY[k]).removeClass("color" + colorOut).addClass("color" + colorIn);
                    } 
                }
                break;
            }
        }
    }
//    lower right corner -> (x+1, y+1) 
    if (!$("#square_" + (x + 1) + (y + 1)).hasClass("color0") && (x + 1) < 9 && (y + 1) < 9) {
        var innerY = y;
        var indexesOnX = [];
        var indexesOnY = [];
        for (var i = (x + 1); i <= 8; i++) {
            innerY = innerY + 1;
            if ($("#square_" + i + innerY).hasClass("color" + colorOut)) {
                indexesOnX.push(i);
                indexesOnY.push(innerY);
            } else {
                if ($("#square_" + i + innerY).hasClass("color" + colorIn)) {
                    for (var k = 0; k < indexesOnX.length; k++) {
                        $("#square_" + indexesOnX[k] + indexesOnY[k]).removeClass("color" + colorOut).addClass("color" + colorIn);
                    } 
                }
                break;
            }
        }
    }
//    upper right corner -> (x-1, y+1) 
    if (!$("#square_" + (x - 1) + (y + 1)).hasClass("color0") && (x - 1) > 0 && (y + 1) < 9) {
        var innerY = y;
        var indexesOnX = [];
        var indexesOnY = [];
        for (var i = (x - 1); i >= 1; i--) {
            innerY = innerY + 1;
            if ($("#square_" + i + innerY).hasClass("color" + colorOut)) {
                indexesOnX.push(i);
                indexesOnY.push(innerY);
            } else {
                if ($("#square_" + i + innerY).hasClass("color" + colorIn)) {
                    for (var k = 0; k < indexesOnX.length; k++) {
                        $("#square_" + indexesOnX[k] + indexesOnY[k]).removeClass("color" + colorOut).addClass("color" + colorIn);
                    } 
                }
                break;
            }
        }
    }
//    lower left corner -> (x+1, y-1) 
    if (!$("#square_" + (x + 1) + (y - 1)).hasClass("color0") && (x + 1) < 9 && (y - 1) > 0) {
        var innerY = y;
        var indexesOnX = [];
        var indexesOnY = [];
        for (var i = (x + 1); i <= 8; i++) {
            innerY = innerY - 1;
            if ($("#square_" + i + innerY).hasClass("color" + colorOut)) {
                indexesOnX.push(i);
                indexesOnY.push(innerY);
            } else {
                if ($("#square_" + i + innerY).hasClass("color" + colorIn)) {
                    for (var k = 0; k < indexesOnX.length; k++) {
                        $("#square_" + indexesOnX[k] + indexesOnY[k]).removeClass("color" + colorOut).addClass("color" + colorIn);
                    } 
                }
                break;
            }
        }
    }
    checkScore();
}

function checkScore() {
    totalGreens = 0;
    totalBlacks = 0;
    for (var i = 1; i <= 8; i++) {
        for (var j = 1; j <= 8; j++) {
            if($("#square_" + j + i).hasClass("color1")) {
                totalGreens++;
            } 
            if($("#square_" + j + i).hasClass("color2")) {
                totalBlacks++;
            }
            
        }
    }
    $("#labelGreenUser").text("Total Green: " + totalGreens);
    $("#labelBlackUser").text("Total Black: " + totalBlacks);
}
