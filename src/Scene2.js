class Scene2 extends Phaser.Scene {

    constructor(){

        super({ key: "sceneMenu" });
    }
    preload(){



    }
    create(){


        this.background = this.add.image(960,540,"fondoMenu");
       //MUSICA DE FONDO DEL MENU
        var audio = this.sound.add('audioMenu',{volume: 0.11,loop: true});
        audio.play();

        

        //BOTON PARA JUGAR 1 JUGADOR
        this.gameButtonOnePlayer = this.add.sprite(100, 200, 'star').setInteractive();
        this.centerButton(this.gameButtonOnePlayer, 0,4);
 
        this.gameTextOnePlayer = this.add.text(0, 0, 'UN JUGADOR', { fontSize: '32px', fill: '#fff' });
        this.centerButtonText(this.gameTextOnePlayer, this.gameButtonOnePlayer);
 
        this.gameButtonOnePlayer.on('pointerdown', function (pointer) {
            this.scene.start('sceneGame');
        }.bind(this));
 
        this.input.on('pointerover', function (event, gameObjects) {
        gameObjects[0].setTexture('star');
        });
 
        this.input.on('pointerout', function (event, gameObjects) {
        gameObjects[0].setTexture('star');
        });


        //BOTON MULTIJUGADOR
        this.gameButtonMulti = this.add.sprite(100, 200, 'star').setInteractive();
        this.centerButton(this.gameButtonMulti, 2,4);
 
        this.gameTextMulti = this.add.text(0, 0, 'MULTIJUGADOR', { fontSize: '32px', fill: '#fff' });
        this.centerButtonText(this.gameTextMulti, this.gameButtonMulti);
 
        this.gameButtonMulti.on('pointerdown', function (pointer) {
            this.scene.start('sceneGame');
        }.bind(this));
 
        this.input.on('pointerover', function (event, gameObjects) {
        gameObjects[0].setTexture('star');
        });
 
        this.input.on('pointerout', function (event, gameObjects) {
        gameObjects[0].setTexture('star');
        });

        //BOTON CONFIGURACIÓN

        this.gameButtonConf = this.add.sprite(100, 200, 'star').setInteractive();
        this.centerButton(this.gameButtonConf, 3,-3.5);
 
        this.gameTextConf = this.add.text(0, 0, 'CONFIGURACION', { fontSize: '32px', fill: '#fff' });
        this.centerButtonText(this.gameTextConf, this.gameButtonConf);
 
        this.gameButtonConf.on('pointerdown', function (pointer) {
            this.scene.start('sceneGame');
        }.bind(this));
 
        this.input.on('pointerover', function (event, gameObjects) {
        gameObjects[0].setTexture('star');
        });
 
        this.input.on('pointerout', function (event, gameObjects) {
        gameObjects[0].setTexture('star');
        })




        //BOTON CREDITOS


        this.gameButtonCred = this.add.sprite(100, 200, 'star').setInteractive();
        this.centerButton(this.gameButtonCred, 3,-3.5);
 
        this.gameTextCred = this.add.text(0, 0, 'CREDITOS', { fontSize: '32px', fill: '#fff' });
        this.centerButtonText(this.gameTextCred, this.gameButtonCred);
 
        this.gameButtonCred.on('pointerdown', function (pointer) {
            this.scene.start('sceneGame');
        }.bind(this));
 
        this.input.on('pointerover', function (event, gameObjects) {
        gameObjects[0].setTexture('star');
        });
 
        this.input.on('pointerout', function (event, gameObjects) {
        gameObjects[0].setTexture('star');
        })


         //BOTON CONTROLES



         this.gameButtonControl = this.add.sprite(100, 200, 'star').setInteractive();
         this.centerButton(this.gameButtonControl, 3,-3.5);
  
         this.gameTextControl = this.add.text(0, 0, 'CONTROLES',{ fontSize: '32px', fill: '#fff' });
         this.centerButtonText(this.gameTextControl, this.gameButtonControl);
  
         this.gameButtonControl.on('pointerdown', function (pointer) {
             this.scene.start('sceneGame');
         }.bind(this));
  
         this.input.on('pointerover', function (event, gameObjects) {
         gameObjects[0].setTexture('star');
         });
  
         this.input.on('pointerout', function (event, gameObjects) {
         gameObjects[0].setTexture('star');
         })




        
    
      
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
