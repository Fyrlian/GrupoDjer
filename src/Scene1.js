class Scene1 extends Phaser.Scene {

  constructor(){

      super({ key: "sceneLogoCarga" });
  }
  preload(){
   
   


    //IMAGENES DEL JUEGO
      this.load.image('sueloMapa','../assets/sueloMapa.png');
      this.load.image('suelo','../assets/suelo.png');
      this.load.image('sueloMedio','../assets/sueloMedio.png');
      this.load.image('sueloMedio2','../assets/sueloMedio2.png');
      this.load.image('escalon','../assets/escalon.png');
      this.load.image('escalonGrande','../assets/escalonGrande.png');
      this.load.image('equis','../assets/equisalternativa.png');


      this.load.image('fondoLogin','../assets/fondoLogin.png');
      this.load.image('fondo','../assets/Nivel 1.png');
      this.load.image('sky', '../assets/sky.png');
      this.load.image('ground', '../assets/platform.png');
      this.load.image('star', '../assets/star.png');
      this.load.image('bomb', '../assets/bomb.png');
      
      this.load.image('botonPausa','../assets/botonPausa.png');
      this.load.image('botonGrande','../assets/botonGrande.png');
      this.load.image('botonPeque','../assets/botonPeque.png');
      this.load.image('fondoMenu','../assets/fondoMenu.png');
      this.load.image('controles','../assets/menuControles.png');
      this.load.image('botonGrandeOver','../assets/botonGrandeOver.png');
      this.load.image('botonGrandeNotOver','../assets/botonGrandeNotOver.png');
      
      this.load.image('rampaEscalera','../assets/collideEscaleras.png');
      this.load.image('paredFondo','../assets/paredFondo.png');
      this.load.image('sueloTejado','../assets/sueloTejado.png');
      this.load.image('tejado','../assets/tejadoEscalera.png');
      this.load.image('gameOv','../assets/gameOver.png');
      
      this.load.image('opciones','../assets/fondoConfig.png');
      this.load.image('botonAtrasNotOver','../assets/botonAtrasGris.png');
      this.load.image('botonAtrasOver','../assets/botonAtrasBlanco.png');
      this.load.image('botonExitNotOver','../assets/botonAtrasGris.png');
      this.load.image('botonExitOver','../assets/botonAtrasBlanco.png');
      this.load.image('botonEnabled','../assets/botonesEnabled.png');
      this.load.image('botonDisabled','../assets/botonDisabled.png');
      this.load.image('fondoPausa','../assets/menuPausa.png');



      this.load.image('icono1','../assets/iconoP1.png');
      this.load.image('icono2','../assets/iconoP2.png');


      this.load.image('chat','../assets/chat.png');
      //fuentes
      this.load.bitmapFont('fuentes','../assets/font.png','../assets/font.fnt');
      this.load.bitmapFont('fuentes2','../assets/font2.png','../assets/font2.fnt');
      this.load.bitmapFont('fuentes3','../assets/font3.png','../assets/font3.fnt');


      //SPRITES DEL JUEGO
      this.load.spritesheet('zombieRight','../assets/zombieRight.png',{ frameWidth: 106, frameHeight: 118});
      this.load.spritesheet('zombieLeft','../assets/zombieLeft.png',{ frameWidth: 106, frameHeight: 118});

      this.load.spritesheet('balaLeft','../assets/balaIzq.png',{ frameWidth: 16, frameHeight: 8});            
      this.load.spritesheet('balaRight','../assets/bala.png',{ frameWidth: 16, frameHeight: 8});
      
      this.load.spritesheet('dude', '../assets/mainch.png', { frameWidth: 60, frameHeight: 100 });

      this.load.spritesheet('mainch', '../assets/mainchAK-47.png', { frameWidth: 106, frameHeight: 120 });
      this.load.spritesheet('mainchizq', '../assets/mainchAK-47Izq.png', { frameWidth: 106, frameHeight: 120 });
      //Sprite jugador 2
      this.load.spritesheet('mainch2', '../assets/mainchAK-47-2.png', { frameWidth: 106, frameHeight: 120 });
      this.load.spritesheet('mainchizq2', '../assets/mainchAK-47Izq-2.png', { frameWidth: 106, frameHeight: 120 });

      
      //AUDIO DEL JUEGO
      this.load.audio('audioMenu','../assets/MusicaTenebrosa.mp3');
      this.load.audio('audioScene1','../assets/MusicaFondoScene1.mp3');
      this.load.audio('perderUnaVidaSound','../assets/PerderUnaVida.mp3');
      this.load.audio('disparoSound','../assets/disparo.mp3');
      this.load.audio('gameOverSound','../assets/GameOver.mp3');

      
      

      var progressBar = this.add.graphics();
      var progressBox = this.add.graphics();

      progressBox.fillStyle(0x222222, 0.8);
      progressBox.fillRect(config.width/2-160, config.height/2-30, 320, 50);

      this.load.on('progress', function (value) {
      percentText.setText(parseInt(value * 100) + '%');
      progressBar.clear();
      progressBar.fillStyle(0xffffff, 1);
      progressBar.fillRect(config.width/2-150, config.height/2-20, 300 * value, 30);
    
      });
      var loadingText = this.make.text({
        x: config.width / 2,
        y: config.height / 2 - 100,
        text: 'Loading...',
        style: {
                font: '20px monospace',
                fill: '#ffffff'
              }
      });

      loadingText.setOrigin(0.5, 0.5);
    
      var percentText = this.make.text({
        x: config.width / 2,
        y: config.height / 2 - 50,
        text: '0%',
        style: {
                font: '18px monospace',
                fill: '#ffffff'
              }
      });
      percentText.setOrigin(0.5, 0.5);
    
      var assetText = this.make.text({
        x: config.width / 2,
        y: config.height / 2 + 50,
        text: '',
        style: {
                font: '18px monospace',
                fill: '#ffffff'
               }
      });
      assetText.setOrigin(0.5, 0.5);

    // update file progress text
    this.load.on('fileprogress', function (file) {
      assetText.setText('Loading asset: ' + file.key);
    });
    
    // remove progress bar when complete
    this.load.on('complete', function () {
      progressBar.destroy();
      progressBox.destroy();
      loadingText.destroy();
      percentText.destroy();
      assetText.destroy();
    });
      

      
  }
  create(){


      this.background=this.add.image(config.width/2,config.height/2, 'logoHWK');
      

 
      //this.scene.start('sceneGame');
      this.ready();
      this.timedEvent = this.time.delayedCall(3000, this.ready, [], this);  
     
}
update(){



}

  //NO SE SI FUNCIONA2
init () {

  this.readyCount = 0;

}

ready () {
      this.readyCount++;
  if (this.readyCount === 2) {
      this.scene.start('loginScene');
  }

}
} 
