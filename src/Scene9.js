class Scene9 extends Phaser.Scene {

    constructor(){

        super({ key: "scenePause" });
    }
    preload(){
        
   
    }
    create(){

      this.background = this.add.image(config.width/2,config.height/2,'fondoPausa');
     
      audio = this.sound.add('audioMenu',{volume: 0.04,loop: true});
      audio1 = this.sound.add('audioScene1',{volume: 0.05,loop: true});

      
        if(estadoMusica===true)
        this.musicButton = this.add.image(config.width/2.5, config.height/2,'botonEnabled');
        else
        this.musicButton = this.add.image(config.width/2.5, config.height/2,'botonDisabled');
        

        this.musicText = this.add.text(config.width/2.4, config.height/2.06, 'ENABLE/DISABLE MUSIC ', { fontSize: 32 });
         
        
        if(estadoSonido===true)
        this.soundButton = this.add.image(config.width/2.5, config.height/1.6,'botonEnabled');
        else
        this.soundButton = this.add.image(config.width/2.5, config.height/1.6,'botonDisabled');
        

        this.soundText = this.add.text(config.width/2.4, config.height/1.64, 'ENABLE/DISABLE SOUND ', { fontSize: 32 });
         
        this.musicButton.setInteractive();
        this.soundButton.setInteractive();

         
        this.musicButton.on('pointerdown', function () {
          estadoMusica = !estadoMusica;
          this.updateAudioMusic();
          

        }.bind(this));
         
        this.soundButton.on('pointerdown', function () {
          estadoSonido = !estadoSonido;
          
          this.updateAudioSonido();
         

        }.bind(this));
         




        //BOTON PARA VOLVER A LA ESCENA ANTERIOR 
        this.gameButtonBack = this.add.sprite(100, 200, 'botonAtrasNotOver').setInteractive();
        this.centerButton(this.gameButtonBack, 0,-2.5); //Posicion inicial 
 
        this.gameTextBack = this.add.text(0, 0, 'BACK', { fontSize: '32px', fill: '#fff' });
        this.centerButtonText(this.gameTextBack, this.gameButtonBack); 
        
        this.gameButtonBack.on('pointerdown', function (pointer) {
            this.scene.resume('sceneGame');
            vueltaAlJuego = true;
            this.scene.stop("scenePause");
            
        }.bind(this));
 
        this.gameButtonBack.on('pointerover', function (event) {
            this.setTexture('botonAtrasOver');
        });
 
        this.gameButtonBack.on('pointerout', function (event) {
            this.setTexture('botonAtrasNotOver');
           
        });

        //BOTON PARA VOLVER A MENU
        this.gameButtonExit = this.add.sprite(100, 200, 'botonExitNotOver').setInteractive();
        this.centerButton(this.gameButtonExit, 0,-3.5); //Posicion inicial 
 
        this.gameTextExit = this.add.text(0, 0, 'EXIT', { fontSize: '32px', fill: '#fff' });
        this.centerButtonText(this.gameTextExit, this.gameButtonExit); 
        
        this.gameButtonExit.on('pointerdown', function (pointer) {
            this.scene.stop('sceneGame');
            this.scene.start('sceneMenu');
            audio1.stop();
            
        }.bind(this));
 
        this.gameButtonExit.on('pointerover', function (event) {
            this.setTexture('botonExitOver');
        });
 
        this.gameButtonExit.on('pointerout', function (event) {
            this.setTexture('botonExitNotOver');
           
        });

      
       
    }


    updateAudioMusic() {

        if (estadoMusica === true) {

          this.musicButton.setTexture('botonEnabled');
          this.sound.resumeAll();
          audio.stop();
          

        } else {
          
          this.musicButton.setTexture('botonDisabled');
          this.sound.pauseAll();
         
        
        }


      }
      updateAudioSonido() {

        if (estadoSonido === true) {

          this.soundButton.setTexture('botonEnabled');
          this.sound.resumeAll();
         
          

        } else {
        
          this.soundButton.setTexture('botonDisabled');
          this.sound.pauseAll();
        
          
          

        }

      }


    update(){}

    centerButton (gameObject, offsetw = 0, offseth = 0) {
      Phaser.Display.Align.In.Center(
        gameObject,
        this.add.zone(config.width/2 - offsetw * 100, config.height/2 - offseth * 100, config.width, config.height)
      );
    }
     
    centerButtonText (gameText, gameButton) {
      Phaser.Display.Align.In.Center(
        gameText,
        gameButton
      );
    }
}