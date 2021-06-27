class Scene10 extends Phaser.Scene {

    constructor(){

        super({ key: "scenePause2" });
    }
    preload(){
        
   
    }
    create(){

      that4 = this;

    
      this.time.addEvent({
        delay: 500, callback: function() {
          
         
          //GET PARA LOS MENSAJES++++++++++++++++++++++++++++++++++++++++++++
          $.ajax({
                url: "http://localhost:8080/conectado",
                //url: "https://lastnightfall-landing.herokuapp.com/conectado",
          }).then(function (data) {
           

            //EL JUGADOR2 EXISTE
      
            if (data[1] != null) {

              estaConectadoPlayer2 = true;
              if(jugadorRepresentado == 1){
                  that2.ready = true;
              }
              player2.setVisible(true);
              if (estaConectadoPlayer2 != estaConectadoPlayer2aux) {
      
                if(jugadorRepresentado == 1){
      
                  var arrayIndices= new Array();
                  var indice = 0;
      
                  for (var i = 0; i < that2.enemigos.getChildren().length; i++) {
      
                    var enem = that2.enemigos.getChildren()[i];
                
                    arrayIndices[indice] = enem.indice;
                      indice++;
                  }
      
                  var mensaje = { nombre: "conec2", numZombies: that2.enemigos.getChildren().length, viditas1: player.vidas, viditas2: player2.vidas, ronditas: that2.ronda, indicesZ:arrayIndices}
                  try {
                    if(connection.readyState === connection.OPEN){
                      connection.send(JSON.stringify(mensaje));
                    }
                  } catch (error) {
                   
                  }

                  var mensaje2 = { nombre: "pausa"}
                  try {
                    if(connection.readyState === connection.OPEN){
                      connection.send(JSON.stringify(mensaje2));
                    }
                  } catch (error) {
                   console.log("ERROR");
                                    }
                  alert("Se ha conectado Jugador 2 en pausa: " + data[1].usuario);
      
                  
                      }
               
      
      
          
              }
              estaConectadoPlayer2aux = true;
      
              //EL JUGADOR2 NO EXISTE
            } else {
              estaConectadoPlayer2 = false;
              if (estaConectadoPlayer2 != estaConectadoPlayer2aux) {
                alert("Se ha desconectado Jugador 2");
                
              }
              estaConectadoPlayer2aux = false;
            }
          }); //FIN GETT+++++++++++++++++++++++++++++++++++++++++++++++++++++++++
      
      
        }, callbackScope: this, loop: true });



      if(chatAbierto==true){
          
        chatAbierto=false;
      
      }
      
      var element = document.getElementById("divChat");

      this.scene.stop('chatScene');
      
      element.style.display = "none";


      this.background = this.add.image(config.width/2,config.height/2,'fondoPausa');
     
      audio = this.sound.add('audioMenu',{volume: 0.04,loop: true});
      audio1 = this.sound.add('audioScene1',{volume: 0.05,loop: true});

      
        if(estadoMusica===true)
        this.musicButton = this.add.image(config.width/2.5, config.height/2.4,'botonEnabled');
        else
        this.musicButton = this.add.image(config.width/2.5, config.height/2.4,'botonDisabled');
        

        this.musicText = this.add.bitmapText(config.width/2.4, config.height/2.46,'fuentes','enable/disable music ',32);
         
        
        if(estadoSonido===true)
        this.soundButton = this.add.image(config.width/2.5, config.height/1.9,'botonEnabled');
        else
        this.soundButton = this.add.image(config.width/2.5, config.height/1.9,'botonDisabled');
        

        this.musicText = this.add.bitmapText(config.width/2.4, config.height/1.94,'fuentes','enable/disable sound ',32);
         
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
        this.centerButton(this.gameButtonBack, 0,-1.5); //Posicion inicial 
 
        this.gameTextBack = this.add.bitmapText(0, 0,'fuentes',' back ',32);
        this.centerButtonText(this.gameTextBack, this.gameButtonBack); 
        
        this.gameButtonBack.on('pointerdown', function (pointer) {


          that4.scene.resume('sceneGame2');
          vueltaAlJuego = true;
          that4.scene.stop("scenePause2");

            var mensaje = { nombre: "noPausa" }
            try {
              if(connection.readyState === connection.OPEN){
                connection.send(JSON.stringify(mensaje));
              }
            } catch (error) {
            
            }

           
            
        }.bind(this));
 
        this.gameButtonBack.on('pointerover', function (event) {
            this.setTexture('botonAtrasOver');
        });
 
        this.gameButtonBack.on('pointerout', function (event) {
            this.setTexture('botonAtrasNotOver');
           
        });

        //BOTON PARA VOLVER A MENU
        this.gameButtonExit = this.add.sprite(100, 200, 'botonExitNotOver').setInteractive();
        this.centerButton(this.gameButtonExit, 0,-2.5); //Posicion inicial 
 
        this.gameTextExit = this.add.bitmapText(0, 0,'fuentes',' exit ',32);
        this.centerButtonText(this.gameTextExit, this.gameButtonExit); 
        
        this.gameButtonExit.on('pointerdown', function (pointer) {
            $.ajax({
            method: "DELETE",
                url: "http://localhost:8080/conectado",
                //url: "https://lastnightfall-landing.herokuapp.com/conectado",
            data: JSON.stringify({usuario : nombreUsuario,contrasena: "auxContraseña"}),
            processData: false,
            headers: {
            "Content-type":"application/json"
            }
            }).done(function(data, textStatus, jqXHR) {

            }).fail(function(data, textStatus, jqXHR){

            });
            this.scene.stop('sceneGame2');
            this.scene.start('sceneMenu');
            this.sound.pauseAll();
            if(estadoMusica === false)
            this.sound.removeByKey('audioScene1');
            
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
          this.sound.removeByKey('audioMenu');
          

        } else {
          
          this.musicButton.setTexture('botonDisabled');
          this.sound.pauseAll();
         
        
        }


      }
      updateAudioSonido() {

        if (estadoSonido === true) {

          this.soundButton.setTexture('botonEnabled');
          this.sound.resumeAll();
          this.sound.removeByKey('audioMenu');
          if(estadoMusica===false)
              this.sound.removeByKey('audioScene1');
        
          

        } else {
        
          this.soundButton.setTexture('botonDisabled');
          this.sound.pauseAll();

          if(estadoMusica===true){
            this.sound.resumeAll();
            this.sound.removeByKey('audioMenu');
          }

         
          

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
