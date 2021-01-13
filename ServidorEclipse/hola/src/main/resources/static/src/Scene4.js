class Scene4 extends Phaser.Scene {

    constructor(){

        super({ key: "sceneOptions" });
    }
    preload(){
        
   
    }
    create(){

      this.background = this.add.image(config.width/2,config.height/2,'opciones');
     
      audio1 = this.sound.add('audioScene1',{volume: 0.05,loop: true});
      


        if(estadoMusica===true)
        this.musicButton = this.add.image(config.width/2.5, config.height/2,'botonEnabled');
        else
        this.musicButton = this.add.image(config.width/2.5, config.height/2,'botonDisabled');
        

        this.musicText = this.add.bitmapText(config.width/2.4, config.height/2.06,'fuentes','enable/disable music ',32);
         
        
        if(estadoSonido===true)
        this.soundButton = this.add.image(config.width/2.5, config.height/1.6,'botonEnabled');
        else
        this.soundButton = this.add.image(config.width/2.5, config.height/1.6,'botonDisabled');
        

        this.soundText = this.add.bitmapText(config.width/2.4, config.height/1.64,'fuentes','enable/disable sound ',32);
         
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
        this.centerButton(this.gameButtonBack, 0,-3); //Posicion inicial 
 
        this.gameTextBack = this.add.bitmapText(0, 0,'fuentes',' back ',32);
        this.centerButtonText(this.gameTextBack, this.gameButtonBack); 
        
        this.gameButtonBack.on('pointerdown', function (pointer) {
            this.scene.start('sceneMenu');
            
        }.bind(this));
 
        this.gameButtonBack.on('pointerover', function (event) {
            this.setTexture('botonAtrasOver');
        });
 
        this.gameButtonBack.on('pointerout', function (event) {
            this.setTexture('botonAtrasNotOver');
           
        });


      
       
    }


    updateAudioMusic() {

        if (estadoMusica === true) {

          this.musicButton.setTexture('botonEnabled');
          this.sound.resumeAll();
          audio1.stop();

        } else {
          
          this.musicButton.setTexture('botonDisabled');
          this.sound.stopAll();
         
        
        }


      }
      updateAudioSonido() {

        if (estadoSonido === true) {

          this.soundButton.setTexture('botonEnabled');
          this.sound.resumeAll();
         
          

        } else {
        
          this.soundButton.setTexture('botonDisabled');
          this.sound.stopAll();
          

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