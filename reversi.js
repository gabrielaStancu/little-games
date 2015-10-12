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
var countNearness = 0;

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
            colorSquaresInGreen(x, y);
        } else {
            checkNearness(x, y);
            if(countNearness !== 0) {
                $("#square_" + index).removeClass("color0").addClass("color2");
                countNearness = 0;
            } else {
                return;
            }
            greenUser = true;
            colorSquaresInBlack(x, y);
        }
    }
}

// todo: 1. make a single method for colorSquaresInBlack and colorSquaresInGreen, like: move(player,x,y), after this methods run correct

// todo: 2. one method to find the corect path for the 8 directions, like: move(player,x,y,xDirection,yDirection), where xDirection,xDirection can let the following values:[-1,0,1]

// todo: 3: I see the gameboard like a matrix (I call "m", you say as you want) with the dimesions 8x8, with values:
// - 0, free space
// - 1, green space (or gamer1 space)
// - 2, black space  (or gamer2 space)
// So, when a gamer (now I choose gamer1) put a piece into a space (x,y) on gameboard you must to make the following checks (I describe just for up path : ((x-1),y):
// if m[x][y]=0, ok, free space check
// while if the potential occupied piece is on gameboard:
//    (x'+xd=>0 && x'+xd<=7) //, where xd = xDirection = -1, and intial x'=x, and then x' will be the next potential x'=x+xd
//    (y'+yd>=0 && y'+yd<=7) // where yx=yDirection = 0 and inital y'=y  and then y' will be the next potential y'=x+yd  
// and m[x'+xd][y'+yd]=2, ok
// then the algorithm move the while step, then, check
//   if the next potential space (x',y') is on gameboard and m[x'][y']=1, ok
// if you arrive in this point change all space between (x,y) and (x',y') with your pieces

function checkNearness(x, y) {
    if (!$("#square_" + (x - 1) + y).hasClass("color0") && (x - 1) > 0) {
        countNearness++;
    }
    if (!$("#square_" + (x + 1) + y).hasClass("color0") && (x + 1) < 9) {
        countNearness++;
    }
    if (!$("#square_" + x + (y - 1)).hasClass("color0") && (y - 1) > 0) {
        countNearness++;
    }
    if (!$("#square_" + x + (y + 1)).hasClass("color0") && (y + 1) < 9) {
        countNearness++;
    }
    if (!$("#square_" + (x - 1) + (y - 1)).hasClass("color0") && (x - 1) > 0 && (y - 1) > 0) {
        countNearness++;
    }
    if (!$("#square_" + (x + 1) + (y + 1)).hasClass("color0") && (x + 1) < 9 && (y + 1) < 9) {
        countNearness++;
    }
    if (!$("#square_" + (x - 1) + (y + 1)).hasClass("color0") && (x - 1) > 0 && (y + 1) < 9) {
        countNearness++;
    }
    if (!$("#square_" + (x + 1) + (y - 1)).hasClass("color0") && (x + 1) < 9 && (y - 1) > 0) {
        countNearness++;
    }
}

function colorSquaresInGreen(x, y) {
//    up -> (x-1, y)
    if (!$("#square_" + (x - 1) + y).hasClass("color0") && (x - 1) > 0) {
        var innerY = y;
        var indexesOnX = [];
        for (var i = (x - 1); i >= 1; i--) {
            if ($("#square_" + i + innerY).hasClass("color2")) {
                indexesOnX.push(i);
            } else {
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
        for (var i = (x + 1); i <= 8; i++) {
            if ($("#square_" + i + innerY).hasClass("color2")) {
                indexesOnX.push(i);
            } else {
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
        for (var i = (innerY - 1); i >= 1; i--) {
            if ($("#square_" + x + i).hasClass("color2")) {
                indexesOnY.push(i);
            } else {
                if ($("#square_" + x + i).hasClass("color1")) {
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
        for (var i = (innerY + 1); i <= 8; i++) {
            if ($("#square_" + x + i).hasClass("color2")) {
                indexesOnY.push(i);
            } else {
                if ($("#square_" + x + i).hasClass("color1")) {
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
        var indexesOnX = [];
        var indexesOnY = [];
        for (var i = (x - 1); i >= 1; i--) {
            innerY = innerY - 1;
            if ($("#square_" + i + innerY).hasClass("color2")) {
                indexesOnX.push(i);
                indexesOnY.push(innerY);
            } else {
                if ($("#square_" + i + innerY).hasClass("color1")) {
                    for (var k = 0; k < indexesOnX.length; k++) {
                        $("#square_" + indexesOnX[k] + indexesOnY[k]).removeClass("color2").addClass("color1");
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
            if ($("#square_" + i + innerY).hasClass("color2")) {
                indexesOnX.push(i);
                indexesOnY.push(innerY);
            } else {
                if ($("#square_" + i + innerY).hasClass("color1")) {
                    for (var k = 0; k < indexesOnX.length; k++) {
                        $("#square_" + indexesOnX[k] + indexesOnY[k]).removeClass("color2").addClass("color1");
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
            if ($("#square_" + i + innerY).hasClass("color2")) {
                indexesOnX.push(i);
                indexesOnY.push(innerY);
            } else {
                if ($("#square_" + i + innerY).hasClass("color1")) {
                    for (var k = 0; k < indexesOnX.length; k++) {
                        $("#square_" + indexesOnX[k] + indexesOnY[k]).removeClass("color2").addClass("color1");
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
            if ($("#square_" + i + innerY).hasClass("color2")) {
                indexesOnX.push(i);
                indexesOnY.push(innerY);
            } else {
                if ($("#square_" + i + innerY).hasClass("color1")) {
                    for (var k = 0; k < indexesOnX.length; k++) {
                        $("#square_" + indexesOnX[k] + indexesOnY[k]).removeClass("color2").addClass("color1");
                    } 
                }
                break;
            }
        }
    }
}

function colorSquaresInBlack(x, y) {
//    up -> (x-1, y)
    if (!$("#square_" + (x - 1) + y).hasClass("color0") && (x - 1) > 0) {
        var innerY = y;
        var indexesOnX = [];
        for (var i = (x - 1); i >= 1; i--) {
            if ($("#square_" + i + innerY).hasClass("color1")) {
                indexesOnX.push(i);
            } else {
                if ($("#square_" + i + innerY).hasClass("color2")) {
                    for (var k = 0; k < indexesOnX.length; k++) {
                        $("#square_" + indexesOnX[k] + innerY).removeClass("color1").addClass("color2");
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
            if ($("#square_" + i + innerY).hasClass("color1")) {
                indexesOnX.push(i);
            } else {
                if ($("#square_" + i + innerY).hasClass("color2")) {
                    for (var k = 0; k < indexesOnX.length; k++) {
                        $("#square_" + indexesOnX[k] + innerY).removeClass("color1").addClass("color2");
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
            if ($("#square_" + x + i).hasClass("color1")) {
                indexesOnY.push(i);
            } else {
                if ($("#square_" + x + i).hasClass("color2")) {
                    for (var k = 0; k < indexesOnY.length; k++) {
                        $("#square_" + x + indexesOnY[k]).removeClass("color1").addClass("color2");
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
            if ($("#square_" + x + i).hasClass("color1")) {
                indexesOnY.push(i);
            } else {
                if ($("#square_" + x + i).hasClass("color2")) {
                    for (var k = 0; k < indexesOnY.length; k++) {
                        $("#square_" + x + indexesOnY[k]).removeClass("color1").addClass("color2");
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
            if ($("#square_" + i + innerY).hasClass("color1")) {
                indexesOnX.push(i);
                indexesOnY.push(innerY);
            } else {
                if ($("#square_" + i + innerY).hasClass("color2")) {
                    for (var k = 0; k < indexesOnX.length; k++) {
                        $("#square_" + indexesOnX[k] + indexesOnY[k]).removeClass("color1").addClass("color2");
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
            if ($("#square_" + i + innerY).hasClass("color1")) {
                indexesOnX.push(i);
                indexesOnY.push(innerY);
            } else {
                if ($("#square_" + i + innerY).hasClass("color2")) {
                    for (var k = 0; k < indexesOnX.length; k++) {
                        $("#square_" + indexesOnX[k] + indexesOnY[k]).removeClass("color1").addClass("color2");
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
            if ($("#square_" + i + innerY).hasClass("color1")) {
                indexesOnX.push(i);
                indexesOnY.push(innerY);
            } else {
                if ($("#square_" + i + innerY).hasClass("color2")) {
                    for (var k = 0; k < indexesOnX.length; k++) {
                        $("#square_" + indexesOnX[k] + indexesOnY[k]).removeClass("color1").addClass("color2");
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
            if ($("#square_" + i + innerY).hasClass("color1")) {
                indexesOnX.push(i);
                indexesOnY.push(innerY);
            } else {
                if ($("#square_" + i + innerY).hasClass("color2")) {
                    for (var k = 0; k < indexesOnX.length; k++) {
                        $("#square_" + indexesOnX[k] + indexesOnY[k]).removeClass("color1").addClass("color2");
                    }
                }
                break;
            }
        }
    }
}
