var config = {
    type: Phaser.AUTO,
    width: 1920,
    height: 1080,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 300 },
            debug: false
        }
    },
    scene:[Scene0,Scene1,Scene2,Scene3]
};

var player;
var stars;
var bombs;
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


var game = new Phaser.Game(config);
