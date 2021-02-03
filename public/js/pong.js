import {
    drawWaiting,
    clearCanvas,
    drawScores,
    drawCircle,
    drawRectangle
} from "./draw.js"

var socket = io.connect('http://localhost:4000');

const canvas = document.getElementById("pong-game")
const context = canvas.getContext("2d")

canvas.addEventListener("mousemove", (e) => {
    socket.emit("mouse-coordinates", {
        x: e.clientX,
        y: e.clientY
    })
});

socket.on("opponent-left", () => {
    clearCanvas(canvas, context)
    drawWaiting(canvas, context)
})

socket.on("game-data", (gameData) => {
    const { ball, leftBar, rightBar, scores } = gameData
    clearCanvas(canvas, context)
    drawScores(canvas, context, scores)
    drawCircle(context, ball)
    drawRectangle(context, leftBar)
    drawRectangle(context, rightBar)  
})

clearCanvas(canvas, context)
drawWaiting(canvas, context)