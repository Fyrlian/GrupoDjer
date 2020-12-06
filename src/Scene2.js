class Scene2 extends Phaser.Scene {

    constructor(){

        super({ key: "sceneMenu" });
    }
    preload(){

        
        


    }
    create(){


        this.background = this.add.image(config.width/2,config.height/2,"fondoMenu");
       //MUSICA DE FONDO DEL MENU
       var audio = this.sound.add('audioMenu',{volume: 0.11,loop: true});
        audio.play();
        audio.resume();
       

        
        var bJugador = this.add.graphics('botonUnJugador').setInteractive();
        var mJugador = this.add.graphics('botonMultijugador').setInteractive();
        var bConfig = this.add.graphics('botonConfiguracion').setInteractive();
        var bControl = this.add.graphics('botonControles').setInteractive();
        var bCredit = this.add.graphics('botonCreditos').setInteractive();

        

        //BOTON PARA JUGAR 1 JUGADOR
        this.gameButtonOnePlayer = this.add.sprite(100, 200, 'botonGrande').setInteractive();
        this.centerButton(this.gameButtonOnePlayer, -4.4,-1); //Posicion inicial 
 
        this.gameTextOnePlayer = this.add.text(0, 0, 'UN JUGADOR', { fontSize: '32px', fill: '#fff' });
        this.centerButtonText(this.gameTextOnePlayer, this.gameButtonOnePlayer);
 
        bJugador.fillStyle(0x222222, 0.8);
        bJugador.fillRect(this.gameButtonOnePlayer.x-200,this.gameButtonOnePlayer.y-35,400,300);
        var bJugadorX = this.gameButtonOnePlayer.x-200;
        var bJugadorY = this.gameButtonOnePlayer.y-35;


        this.gameButtonOnePlayer.on('pointerdown', function (pointer) {
            audio.pause();
            this.scene.start('sceneGame');
            
        }.bind(this));
 
        this.gameButtonOnePlayer.on('pointerover', function (event) {
            bJugador.clear()
            bJugador.fillStyle(0xFFFFFF,0.8);
            bJugador.fillRect(bJugadorX,bJugadorY,400,300);
        
        });
 
        this.input.on('pointerout', function (event) {
            bJugador.clear()
            bJugador.fillStyle(0x222222,0.8);
            bJugador.fillRect(bJugadorX,bJugadorY,400,300);
        
        });


        //BOTON MULTIJUGADOR
        this.gameButtonMulti = this.add.sprite(100, 200, 'botonGrande').setInteractive();
        this.centerButton(this.gameButtonMulti, -4.4,2.4);
 
        this.gameTextMulti = this.add.text(0, 0, 'MULTIJUGADOR', { fontSize: '32px', fill: '#fff' });
        this.centerButtonText(this.gameTextMulti, this.gameButtonMulti);
 
        mJugador.fillStyle(0x222222, 0.8);
        mJugador.fillRect(this.gameButtonMulti.x-200,this.gameButtonMulti.y-50,400,300);


        var mJugadorX = this.gameButtonMulti.x-200;
        var mJugadorY = this.gameButtonMulti.y-50;

        this.gameButtonMulti.on('pointerdown', function (pointer) {
            audio.pause();
            this.scene.start('sceneGame');
        }.bind(this));
 
        this.gameButtonMulti.on('pointerover', function (event) {
            mJugador.clear();
            mJugador.fillStyle(0xFFFFFF,0.8);
            mJugador.fillRect(mJugadorX,mJugadorY,400,300);
        });
 
        this.input.on('pointerout', function (event) {
            mJugador.clear();
            mJugador.fillStyle(0x222222,0.8);
            mJugador.fillRect(mJugadorX,mJugadorY,400,300);
        });

        //BOTON CONFIGURACIÓN

        this.gameButtonConf = this.add.sprite(100, 200,'botonPeque').setInteractive();
        this.centerButton(this.gameButtonConf, 4,0.6);
 
        this.gameTextConf = this.add.text(0, 0, 'CONFIGURACION', { fontSize: '32px', fill: '#fff' });
        this.centerButtonText(this.gameTextConf, this.gameButtonConf);
 
        bConfig.fillStyle(0x222222, 0.8);
        bConfig.fillRect(this.gameButtonConf.x-200,this.gameButtonConf.y-35,400,70);
        var xConfig = this.gameButtonConf.x-200;
        var yConfig = this.gameButtonConf.y-35;


        this.gameButtonConf.on('pointerdown', function (pointer) {
            this.scene.start('sceneOptions');
        }.bind(this));
 
        this.gameButtonConf.on('pointerover', function (event) {
            bConfig.clear();
            bConfig.fillStyle(0xFFFFFF, 0.8)
            bConfig.fillRect(xConfig,yConfig,400,70);
        });
 
        this.input.on('pointerout', function (event) {
            
            bConfig.clear();
            bConfig.fillStyle(0x222222, 0.8)
            bConfig.fillRect(xConfig,yConfig,400,70);
        })




        //BOTON CREDITOS


        this.gameButtonCred = this.add.sprite(100, 200, 'botonPeque').setInteractive();
        this.centerButton(this.gameButtonCred, 4,-1);
 
        this.gameTextCred = this.add.text(0, 0, 'CREDITOS', { fontSize: '32px', fill: '#fff' });
        this.centerButtonText(this.gameTextCred, this.gameButtonCred);
 
        bCredit.fillStyle(0x222222, 0.8);
        bCredit.fillRect(this.gameButtonCred.x-200,this.gameButtonCred.y-35,400,70);
        var xCred = this.gameButtonCred.x-200;
        var yCred = this.gameButtonCred.y-35;

        this.gameButtonCred.on('pointerdown', function (pointer) {
            
            this.scene.start('sceneCreditos');

        }.bind(this));
 
        this.gameButtonCred.on('pointerover', function (event) {
         
            bCredit.clear();
            bCredit.fillStyle(0xFFFFFF, 0.8);
            bCredit.fillRect(xCred,yCred,400,70);
            
        });
      
 
        this.input.on('pointerout', function (event) {
            bCredit.clear();
            bCredit.fillStyle(0x222222, 0.8)
            bCredit.fillRect(xCred,yCred,400,70);
        })


         //BOTON CONTROLES
         this.gameButtonControl = this.add.sprite(100, 200, 'botonPeque').setInteractive();
         this.centerButton(this.gameButtonControl, 4,-2.4);
  
         this.gameTextControl = this.add.text(0, 0, 'CONTROLES',{ fontSize: '32px', fill: '#fff' });
         this.centerButtonText(this.gameTextControl, this.gameButtonControl);
        
         bControl.fillStyle(0x222222, 0.8);
         bControl.fillRect(this.gameButtonControl.x-200,this.gameButtonControl.y-35,400,70);
         var bControlX = this.gameButtonControl.x-200;
         var bControlY = this.gameButtonControl.y-35;

         this.gameButtonControl.on('pointerdown', function (pointer) {

             this.scene.start('sceneGame');
         
         }.bind(this));
  
         this.gameButtonControl.on('pointerover', function (event) {
            bControl.clear();
            bControl.fillStyle(0xFFFFFF, 0.8);
            bControl.fillRect(bControlX,bControlY,400,70);

         });
  
         this.input.on('pointerout', function (event) {
            bControl.clear();
            bControl.fillStyle(0x222222, 0.8);
            bControl.fillRect(bControlX,bControlY,400,70);
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
