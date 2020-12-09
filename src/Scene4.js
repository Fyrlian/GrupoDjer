class Scene4 extends Phaser.Scene {

    constructor(){

        super({ key: "sceneOptions" });
    }
    preload(){
        
   
    }
    create(){

      this.background = this.add.image(config.width/2,config.height/2,'opciones');
      
        if(iteracion == 0){

        this.musicOn = true;
        this.soundOn = true;
        
        }

        this.musicButton = this.add.image(config.width/2.5, config.height/2,'botonEnabled');
        this.musicText = this.add.text(config.width/2.4, config.height/2.06, 'ENABLE/DISABLE MUSIC ', { fontSize: 32 });
         
        this.soundButton = this.add.image(config.width/2.5, config.height/1.6,'botonEnabled');
        this.soundText = this.add.text(config.width/2.4, config.height/1.64, 'ENABLE/DISABLE SOUND ', { fontSize: 32 });
         
        this.musicButton.setInteractive();
        this.soundButton.setInteractive();
         
        this.musicButton.on('pointerdown', function () {
          
          this.musicOn = !this.musicOn;
          this.updateAudioMusic();

        }.bind(this));
         
        this.soundButton.on('pointerdown', function () {

          this.soundOn = !this.soundOn;
          this.updateAudioSonido();
          

        }.bind(this));
         
        




        //BOTON PARA VOLVER A LA ESCENA ANTERIOR 
        this.gameButtonBack = this.add.sprite(100, 200, 'botonAtrasNotOver').setInteractive();
        this.centerButton(this.gameButtonBack, 0,-3); //Posicion inicial 
 
        this.gameTextBack = this.add.text(0, 0, 'BACK', { fontSize: '32px', fill: '#fff' });
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


       iteracion++;
       
    }


    updateAudioMusic() {

        if (this.musicOn === true) {

          this.musicButton.setTexture('botonEnabled');
          this.sound.resumeAll();
          estadoSonido = true;

        } else {
          
          this.musicButton.setTexture('botonDisabled');
          this.sound.stopAll();
          estadoSonido = false;
        
        }

        if (this.soundOn === true) {

          this.soundButton.setTexture('botonEnabled');
         
        } else {
          
          this.soundButton.setTexture('botonDisabled');
        
        }

      }
      updateAudioSonido() {

        if (this.musicOn === true) {

          this.musicButton.setTexture('botonEnabled');

        } else {
          
          this.musicButton.setTexture('botonDisabled');
        
        }
       
       
        if (this.soundOn === true) {

          this.soundButton.setTexture('botonEnabled');
          this.sound.resumeAll();
          estadoSonido = true;
          

        } else {
        
          this.soundButton.setTexture('botonDisabled');
          this.sound.stopAll();
          estadoSonido = false;

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
