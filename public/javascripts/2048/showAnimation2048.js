/**
 * Created by ironman on 17-1-2.
 */
function showNumberWithAnimation(i, j, randomNumber) {

    var numberCell = $('#number-cell-' + i + '-' + j);

    numberCell.css('background', getNumberBackground(randomNumber));
    numberCell.css('color', getNumberColor(randomNumber));
    numberCell.text(randomNumber);

    numberCell.animate({
        width: cellSlidLength,
        height: cellSlidLength,
        top: getPosTop(i,j),
        left: getPosLeft(i,j)
    },50);
}


function showMoveAnimation(fromx, fromy, tox, toy ) {

    console.log('from: '+ fromx +', '+ fromy );
    console.log('to: ' + tox + ', ' + toy);

    var numberCell = $('#number-cell-' + fromx + '-' + fromy );
    numberCell.animate({
        top: getPosTop(tox, toy),
        left: getPosLeft(tox, toy)
    },200);
}

function updateScore(score) {

    $('#score').text(score);
}
