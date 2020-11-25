class Scene2 extends Phaser.Scene {

    constructor(){

        super({ key: "sceneMenu" });
    }
    preload(){

    }
    create(){


        
        this.gameButton = this.add.sprite(100, 200, 'star').setInteractive();
        this.centerButton(this.gameButton, 1);
 
        this.gameText = this.add.text(0, 0, 'Play', { fontSize: '32px', fill: '#fff' });
        this.centerButtonText(this.gameText, this.gameButton);
 
        this.gameButton.on('pointerdown', function (pointer) {
            this.scene.start('sceneGame');
        }.bind(this));
 
        this.input.on('pointerover', function (event, gameObjects) {
        gameObjects[0].setTexture('star');
        });
 
        this.input.on('pointerout', function (event, gameObjects) {
        gameObjects[0].setTexture('star');
        });

    
      
    }
    update(){}


    centerButton (gameObject, offset = 0) {
        Phaser.Display.Align.In.Center(
          gameObject,
          this.add.zone(config.width/2, config.height/2 - offset * 100, config.width, config.height)
        );
      }
       
      centerButtonText (gameText, gameButton) {
        Phaser.Display.Align.In.Center(
          gameText,
          gameButton
        );
      }

}
