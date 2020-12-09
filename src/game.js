var config = {
    type: Phaser.AUTO,
    width: window.innerWidth * window.devicePixelRatio,
    height: window.innerHeight * window.devicePixelRatio,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 300 },
            debug: true

        },
        matter: {
            gravity: { y: 300 },
            debug: false
        },
    },
    scale: {
        parent: 'yourgamediv',
        mode: 'fit',
        width: 1920,
        height: 1080
    },
    scene:[Scene0,Scene1,Scene2,Scene3,Scene4,Scene5,Scene6,Scene7,Scene8]
};

var player;
var player2;
var stars;
var bombs;
var enemigos;
var platforms;
var escaleras,escaleras1,escaleras2,tejas,tejas2;
var cursors;
var score = 0;
var scoreText;
var cuentaAtras;
var fireButton;
var bullets;
var speed;
var lastFired = 0;
var estado;
var estado2;
var encimaDePlat =0;
var colliderEliminado = 0;
var colliderEscalerasEliminado = 0;
var iteracion = 0;
var estadoSonido = true;
var gameOver = false;

var disparoSound;


var game = new Phaser.Game(config);
