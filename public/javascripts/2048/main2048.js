/**
 * Created by ironman on 17-1-2.
 */
var board = [];
var score = 0;
var hasConflicted = [];

var statrx, starty, endx, endy;

var btn = $('#newGameButton');
btn[0].addEventListener('click', newGame, false);

$(document).ready(function () {
    prepareForMobile();
    newGame();
    document.querySelector('#grid-container').addEventListener('touchstart', function (ev) {
        ev.preventDefault();
    });

});

function prepareForMobile() {

    $('#grid-container').css('width', gridContainerWidth);
    $('#grid-container').css('height', gridContainerWidth);

    $('.grid-cell').css('width', cellSlidLength);
    $('.grid-cell').css('height', cellSlidLength);
}

function newGame() {
    //初始化棋盘格
    init();
    //在随机两个格子生成数字
    generateOneNumber();
    generateOneNumber();
}

function init() {
    for (var i = 0; i < 4; i++) {
        for (var j = 0; j < 4; j++) {

            var gridCell = $('#grid-cell' + '-' + i + '-' + j);
            gridCell.css('top', getPosTop(i, j) + 'px');
            gridCell.css('left', getPosLeft(i, j) + 'px');
        }
    }

    for (var i = 0; i < 4; i++) {
        board[i] = [];
        hasConflicted[i] = [];
        for (var j = 0; j < 4; j++) {
            board[i][j] = 0;
            hasConflicted[i][j] = false;
        }
    }

    updateScore(0);
    updateBoardView();

}

function updateBoardView() {

    $('.number-cell').remove();
    for (var i = 0; i < 4; i++) {
        for (var j = 0; j < 4; j++) {
            $('#grid-container').append('<div class="number-cell" id="number-cell-' + i + '-' + j + '"></div>');

            var theNumberCell = $('#number-cell-' + i + '-' + j);

            if (board[i][j] === 0) {
                theNumberCell.css('width', '0px');
                theNumberCell.css('height', '0px');
                theNumberCell.css('top', getPosTop(i, j) + cellSlidLength / 2);
                theNumberCell.css('left', getPosLeft(i, j) + cellSlidLength / 2);
            } else {
                theNumberCell.css('width', cellSlidLength);
                theNumberCell.css('height', cellSlidLength);
                theNumberCell.css('top', getPosTop(i, j));
                theNumberCell.css('left', getPosLeft(i, j));
                theNumberCell.css('background', getNumberBackground(board[i][j]));
                theNumberCell.css('color', getNumberColor(board[i][j]));
                theNumberCell.text(board[i][j]);
            }
            hasConflicted[i][j] = false;
        }

    }

    $('.number-cell').css('line-height', cellSlidLength + 'px');
    $('.number-cell').css('font-size', 0.4 * cellSlidLength + 'px');

}


function generateOneNumber() {

    if (noSpace(board)) {
        return false;
    }
    //随机一个位置
    if (spaceArr) {
        spaceArr = [];
    }
    var spaceArr = [];

    for (var i = 0; i < 4; i++) {
        for (var j = 0; j < 4; j++) {
            if (board[i][j] === 0) {
                spaceArr.push([i, j]);
            }
        }
    }
    var randomSpaceNum = Math.floor(Math.random() * spaceArr.length);
    var randx = spaceArr[randomSpaceNum][0];
    var randy = spaceArr[randomSpaceNum][1];

    //随机一个2或4
    var randomNumber = Math.random() < 0.5 ? 2 : 4;

    //在随机位置显示随机数字
    board[randx][randy] = randomNumber;
    showNumberWithAnimation(randx, randy, randomNumber);

    return true;
}

$(document).keydown(function (event) {

    switch (event.keyCode) {
        case 37: //left
            event.preventDefault();
            if (moveLeft()) {
                setTimeout(generateOneNumber, 210);
                setTimeout(isGameOver, 300);
            }
            break;
        case 38: //up
            event.preventDefault();
            if (moveUp()) {
                setTimeout(generateOneNumber, 210);
                setTimeout(isGameOver, 300);
            }
            break;
        case 39: //right
            event.preventDefault();
            if (moveRight()) {
                setTimeout(generateOneNumber, 210);
                setTimeout(isGameOver, 300);
            }
            break;
        case 40: //down
            event.preventDefault();
            if (moveDown()) {
                setTimeout(generateOneNumber, 210);
                setTimeout(isGameOver, 300);
            }
            break;
        default:
            break;
    }
});

document.addEventListener('touchstart', function (event) {
    startx = event.touches[0].pageX;
    starty = event.touches[0].pageY;
});

document.addEventListener('touchend', function (event) {
    endx = event.changedTouches[0].pageX;
    endy = event.changedTouches[0].pageY;

    var deltax = endx - startx;
    var deltay = endy - starty;

    if (Math.abs(deltax) < 0.2 * documentWidth && Math.abs(deltay) < 0.2 * documentWidth) {
        return;
    }

    if (Math.abs(deltax) > Math.abs(deltay)) {
        //x
        if (deltax > 0) {
            //right
            if (moveRight()) {
                setTimeout(generateOneNumber, 300);
                setTimeout(isGameOver, 300);
            }
        } else {
            //left;
            if (moveLeft()) {
                setTimeout(generateOneNumber, 300);
                setTimeout(isGameOver(), 300);
            }
        }
    } else {
        //y
        if (deltay > 0) {
            //down
            if (moveDown()) {
                setTimeout(generateOneNumber, 300);
                setTimeout(isGameOver, 300);
            }
        } else {
            //up
            if (moveUp()) {
                setTimeout(generateOneNumber, 300);
                setTimeout(isGameOver(), 300);
            }
        }
    }

});

function isGameOver() {
    if (noSpace(board) && noMove(board)) {
        gameover();
    }
}

function gameover() {
    alert('game over!');
}

function moveLeft() {

    if (!canMoveLeft(board)) {
        return false;
    }
    for (i = 0; i < 4; i++) {
        for (var j = 1; j < 4; j++) {
            if (board[i][j] !== 0) {
                for (var k = 0; k < j; k++) {
                    if (board[i][k] === 0 && noBlockHorizontal(i, j, k, board)) {
                        //move
                        showMoveAnimation(i, j, i, k);
                        board[i][k] = board[i][j];
                        board[i][j] = 0;


                    } else if (board[i][k] === board[i][j] && noBlockHorizontal(i, k, j, board) && !hasConflicted[i][k]) {
                        //move
                        showMoveAnimation(i, j, i, k);

                        //add
                        board[i][k] += board[i][j];
                        board[i][j] = 0;

                        score += board[i][k];
                        updateScore(score);

                        hasConflicted[i][k] = true;



                    }
                }
            }
        }
    }

    setTimeout(updateBoardView, 200);

    return true;

}

function moveUp() {

    if (!canMoveUp(board)) {
        return false;
    }
    for (i = 1; i < 4; i++) {
        for (var j = 0; j < 4; j++) {
            if (board[i][j] !== 0) {
                for (var k = 0; k < i; k++) {
                    if (board[k][j] === 0 && noBlockVertical(j, i, k, board)) {
                        //move
                        showMoveAnimation(i, j, k, j);
                        board[k][j] = board[i][j];
                        board[i][j] = 0;


                    } else if (board[k][j] === board[i][j] && noBlockVertical(j, k, i, board) && !hasConflicted[k][j]) {
                        //move
                        showMoveAnimation(i, j, k, j);

                        //add
                        board[k][j] += board[i][j];
                        board[i][j] = 0;

                        score += board[k][j];
                        updateScore(score);

                        hasConflicted[k][j] = true;


                    }
                }
            }
        }
    }

    setTimeout(updateBoardView, 200);

    return true;

}

function moveDown() {

    if (!canMoveDown(board)) {
        return false;
    }
    for (i = 2; i >= 0; i--) {
        for (var j = 0; j < 4; j++) {
            if (board[i][j] !== 0) {
                for (var k = 3; k > i; k--) {
                    if (board[k][j] === 0 && noBlockVertical(j, i, k, board)) {
                        //move
                        showMoveAnimation(i, j, k, j);
                        board[k][j] = board[i][j];
                        board[i][j] = 0;

                    } else if (board[k][j] === board[i][j] && noBlockVertical(j, i, k, board) && !hasConflicted[k][j]) {
                        //move
                        showMoveAnimation(i, j, k, j);

                        //add
                        board[k][j] += board[i][j];
                        board[i][j] = 0;

                        score += board[k][j];
                        updateScore(score);

                        hasConflicted[k][j] = true;


                    }
                }
            }
        }
    }

    setTimeout(updateBoardView, 200);

    return true;

}

function moveRight() {

    if (!canMoveRight(board)) {
        return false;
    }
    for (i = 0; i < 4; i++) {
        for (var j = 2; j >= 0; j--) {
            if (board[i][j] !== 0) {
                for (var k = 3; k > j; k--) {
                    if (board[i][k] === 0 && noBlockHorizontal(i, j, k, board)) {
                        //move
                        showMoveAnimation(i, j, i, k);
                        board[i][k] = board[i][j];
                        board[i][j] = 0;


                    } else if (board[i][k] === board[i][j] && noBlockHorizontal(i, j, k, board) && !hasConflicted[i][k]) {
                        //move
                        showMoveAnimation(i, j, i, k);

                        //add
                        board[i][k] += board[i][j];
                        board[i][j] = 0;

                        score += board[i][k];
                        updateScore(score);

                        hasConflicted[i][k] = true;
                        continue;

                    }
                }
            }
        }
    }

    setTimeout(updateBoardView, 200);

    return true;

}