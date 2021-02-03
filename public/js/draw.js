export const clearCanvas = (canvas, context) => {
    context.fillStyle = "#000"
    context.fillRect(0,0,canvas.width, canvas.height)
}

export const drawCircle = (context, circle) => {
    const { origin , radius } = circle
    const { x, y } = origin

    context.fillStyle = "#ddd"
    context.beginPath();
    context.arc(x, y, radius, 0, 2*Math.PI);
    context.fill();
}

export const drawRectangle = (context, rectangle) => {
    const { origin, height, width } = rectangle
    const { x, y } = origin

    context.fillStyle = "#ddd"
    context.fillRect(x, y, width, height)
}

export const drawScores = (canvas, context, scores) => {
    var { right, left } = scores
    context.font = "40px Verdana";
    context.fillStyle = "#333"
    context.textAlign = "center"; 
    context.fillText(left + ":" + right, canvas.width/2, 50, 200);
}

export const drawWaiting = (canvas, context) => {
    context.font = "40px Verdana";
    context.fillStyle = "#333"
    context.textAlign = "center"; 
    context.fillText("Waiting for an opponent...", canvas.width/2, canvas.height/2, canvas.width/2);
}