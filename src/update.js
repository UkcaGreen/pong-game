var hitHandler = require("./hit_handler.js")

exports.updateBall = (game, screenHeight) => {
    var { ball, leftBar, rightBar } = game
    ball.origin.x += ball.velocity.x
    ball.origin.y += ball.velocity.y

    ball = hitHandler.ballHitBorder(ball, screenHeight)
    ball = hitHandler.ballHitBar(ball, leftBar, rightBar)

    return ball
}

exports.updateScore = (game) => {
    const {ball, leftBar, rightBar} = game

    var leftBorder = leftBar.origin.x + leftBar.width + ball.radius
    var rightBorder = rightBar.origin.x - ball.radius

    if(ball.origin.x > rightBorder){
        game.scores.left += 1
    }
    else if(ball.origin.x < leftBorder){
        game.scores.right += 1
    }

    return game.scores
}