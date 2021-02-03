exports.ballHitBar = (ball, leftBar, rightBar) => {
    var leftBorder = leftBar.origin.x + leftBar.width + ball.radius
    var rightBorder = rightBar.origin.x - ball.radius

    if(ball.origin.x > rightBorder){
        if(rightBar.origin.y < ball.origin.y && rightBar.origin.y + rightBar.height > ball.origin.y){
            ball.origin.x = 2*rightBorder - ball.origin.x
            ball.velocity.x *= -1
        }
    }
    else if(ball.origin.x < leftBorder){
        if(leftBar.origin.y < ball.origin.y && leftBar.origin.y + leftBar.height > ball.origin.y){
            ball.origin.x = 2*leftBorder - ball.origin.x
            ball.velocity.x *= -1
        }
    }

    return ball
}

exports.ballHitBorder = (ball, screenHeight) => {
    var topBorder = 0
    var bottomBorder = screenHeight - 2*ball.radius

    ball.origin.x -= ball.radius
    ball.origin.y -= ball.radius

    if(ball.origin.y > bottomBorder | ball.origin.y < topBorder){
        ball.origin.y -= 2*(ball.origin.y % bottomBorder)
        ball.velocity.y *= -1
    }

    ball.origin.x += ball.radius
    ball.origin.y += ball.radius

    return ball
}

exports.barHitBorder = (bar, screenHeight) => {
    var topBorder = 0
    var bottomBorder = screenHeight - bar.height

    if(bar.origin.y > bottomBorder){
        bar.origin.y = bottomBorder
    }
    else if(bar.origin.y < topBorder){
        bar.origin.y = topBorder
    }

    return bar
}