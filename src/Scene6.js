class Scene6 extends Phaser.Scene {

    constructor(){

        super({ key: "sceneControles" });
    }
    preload(){

   
    }
    create(){
      
      this.background = this.add.image(config.width/2,config.height/2,'controles');


      //////////////////////BOTON ATRAS 
      this.gameButtonBack = this.add.sprite(100, 200, 'botonAtrasNotOver').setInteractive();
      this.centerButton(this.gameButtonBack, 8.1,-4); //Posicion inicial 

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
     

  }
 
  update(){

    

  }
  init () {

      this.readyCount = 0;
    
    }
    
    ready () {
          this.readyCount++;
      if (this.readyCount === 2) {
          this.scene.start('sceneMenu');
      }

  }
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