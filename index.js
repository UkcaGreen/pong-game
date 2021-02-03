var express = require('express');
var socket = require('socket.io');
var hitHandler = require("./src/hit_handler.js")
var update = require("./src/update.js")
var utility = require("./src/utility.js")

var app = express();
var server = app.listen(4000, () => {
    console.log('listening for requests on port 4000,');
});

app.use(express.static('./public'));

const WIDTH = 600
const HEIGHT = 400
var GAME = {
    ball: {
        origin: {
            x: WIDTH/2,
            y: HEIGHT/2,
        },
        radius: 10,
        velocity: {
            x: 1.2,
            y: 1.6
        }
    }, 
    leftBar: null, 
    rightBar: null,
    scores: {
        left: 0,
        right: 0
    }
}

var io = socket(server);
io.on('connection', (socket) => {   
    const bar = utility.getBar(GAME)
    socket.join('game-room');

    console.log("joined game:", socket.id, "as", bar)
    
    if(bar === "rightBar"){
        barInitialX = 575
    }else{
        barInitialX = 5
    }

    GAME[bar] = {
        origin: {
            x: barInitialX,
            y: 0,
        },
        height: 120,
        width: 20
    }

    socket.on("mouse-coordinates", (data) => {
        GAME[bar].origin.y = data.y - GAME[bar].height / 2
        GAME[bar] = hitHandler.barHitBorder(GAME[bar], HEIGHT)
    })

    socket.on("disconnect", () => {
        GAME[bar] = null
        GAME.ball.origin = {
            x: WIDTH/2,
            y: HEIGHT/2,
        }
        GAME.scores = {
            left: 0,
            right: 0
        }
        socket.to("game-room").emit("opponent-left")
    })
});

setInterval(() => {
    if(GAME.leftBar && GAME.rightBar){
        GAME.ball = update.updateBall(GAME, HEIGHT)

        if(utility.isGoal(GAME)){
            GAME.scores = update.updateScore(GAME)

            GAME.ball.origin = {
                x: WIDTH/2,
                y: HEIGHT/2,
            }
        }

        if(GAME.leftBar && GAME.rightBar){
            io.to("game-room").emit("game-data", GAME)
        }
    }
}, 1000/60 );
