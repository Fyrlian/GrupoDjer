var config = {
    type: Phaser.AUTO,
    width: 1920,
    height: 1080,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 500 },
            debug: false

        },
        matter: {
            gravity: { y: 500 },
            debug: false
        },
    },
    
 
    parent: 'divId',
    dom: {
        createContainer: true
    },
    scene:[Scene0,Scene1,Scene2,Scene3,Scene4,Scene5,Scene6,Scene7,Scene8,Scene9,Scene10,Scene11,Scene12,ChatScene,LoginScene,ListaJugadores]
};
var listaJugAbierta = false;
var nombreUsuario;
var that;
var element;
var chatAbierto = false;
var contenidoChat;
var player;
var player2;
var stars;
var bombs;
var enemigos;
var platforms;
var platformsz;
var platformsd;
var escaleras,escaleras1,escaleras2,tejas,tejas2;
var escalerasz,escaleras1z,escaleras2z;
var escalerasd,escaleras1d,escaleras2d;
var cursors;
var score = 0;
var scoreText;
var vidasText;
var vidasText2;
var cuentaAtras;
var fireButton;
var bullets;
var speed;
var lastFired = 0;
var estado;
var estado2;
var xContrario =-500;
var yContrario = -500;
var xZombie =0;
var yZombie = 0;
var parado = true;
var parado2 = true;
var encimaDePlat =0;
var colliderEliminado = 0;
var colliderEscalerasEliminado = 0;
var colliderEliminado2 = 0;
var colliderEscalerasEliminado2 = 0;
var estadoSonido = true;
var estadoMusica=true;
var disparoSound;
var gameOverSound;
var Sound;
var colliderEnemigosEliminado = 0;
var audio1;
var audio;
var vueltaAlJuego = false;
var rondaFinal = 0;
var jugadorRepresentado = -1;
var that2;
var that3;
var that4;
var estaConectadoPlayer1 = false;
var estaConectadoPlayer2 = false;
var estaConectadoPlayer1aux= false;
var estaConectadoPlayer2aux = false;
var textEstadoServidor;
var overlapPlataformasBool = false;
var overlapEscalerasBool = false;
var connection = new WebSocket('ws://localhost:8080/LastNightFall');
//var   connection = new WebSocket('wss://lastnightfall-landing.herokuapp.com/LastNightFall');
var game = new Phaser.Game(config);
