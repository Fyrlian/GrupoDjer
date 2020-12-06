var config = {
    type: Phaser.AUTO,
    width: window.innerWidth * window.devicePixelRatio,
    height: window.innerHeight * window.devicePixelRatio,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 300 },
            debug: false

        },
        matter: {


        },
    },
    scale: {
        parent: 'yourgamediv',
        mode: 'resize',
        width: 800,
        height: 600
    },
    scene:[Scene0,Scene1,Scene2,Scene3,Scene4,Scene5]
};

var player;
var stars;
var bombs;
var enemigos;
var platforms;
var cursors;
var score = 0;
var gameOver = false;
var scoreText;
var fireButton;
var bullets;
var speed;
var lastFired = 0;
var estado;
var encimaDePlat =0;


var game = new Phaser.Game(config);
