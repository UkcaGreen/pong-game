exports.isGoal = (game) => {
    const { ball, leftBar, rightBar } = game

    var leftBorder = leftBar.origin.x + leftBar.width + ball.radius
    var rightBorder = rightBar.origin.x - ball.radius

    return ball.origin.x > rightBorder | ball.origin.x < leftBorder
}

exports.getBar = (game) => {
    if (game.leftBar === null) {
        return "leftBar"
    }
    else if(game.rightBar === null){
        return "rightBar"
    }
}