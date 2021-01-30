class Scene7 extends Phaser.Scene {
  
    constructor(){

        super({ key: "sceneGame2" });
       
        
    }
  
    
    preload(){


    }
    create(){//  A simple background for our game
        that2 = this;
        
        
        //se añade a la lista de jugadores
        $.ajax({
            method: "PUT",
            url:"http://localhost:8080/conectado",
            data: JSON.stringify({usuario : nombreUsuario,contrasena: "auxContraseña"}),
            processData: false,
            headers: {
            "Content-type":"application/json"
            }
            }).done(function(data, textStatus, jqXHR) {

                if(data == 1){//entra como el jugador 1
                    jugadorRepresentado = 1;
                }else{//entra como el jugador 2
                    jugadorRepresentado = 2;
                }
    
            }).fail(function(data, textStatus, jqXHR){
                alert("Servidor actualmente lleno");
                that2.scene.stop('sceneGame2');
                that2.scene.start('sceneMenu');
            });



        this.bg=this.add.image(config.width/2,config.height/2, 'fondo');
        
        //Audio 
        this.audio1 = this.sound.add('audioScene1',{volume: 0.05,loop: true});
        this.disparoSound= this.sound.add('disparoSound',{volume: 0.02});
        this.gameOverSound= this.sound.add('gameOverSound',{volume: 0.09});
        this.perderUnaVidaSound= this.sound.add('perderUnaVidaSound',{volume: 0.02});
       
        if(estadoMusica === true){
            audio1.play();
            audio1.resume();
           
        }else{
            audio1.stop();
            
        }


        this.add.image(250,50,'icono2');
        this.add.image(250,125,'icono1');



      // this.sueloMapa =this.physics.add.staticImage(config.width/2, config.height/1.02, 'sueloMapa');
      this.sueloMapa =this.physics.add.staticGroup();
      this.sueloMapa.create(config.width/2.35, config.height/1.08, 'suelo')
      this.sueloMapa.create(config.width/2.35, config.height/1.075, 'suelo')
      this.sueloMapa.create(config.width/2.35, config.height/1.070, 'suelo')
    
      this.sueloMapa.create(config.width/1.6, config.height/1.08, 'suelo')
      this.sueloMapa.create(config.width/1.1, config.height/1.05, 'suelo')
      this.sueloMapa.create(config.width/2, config.height/0.99, 'sueloMapa')
      this.sueloMapa.create(config.width/2, config.height/0.98, 'sueloMapa')
      this.sueloMapa.create(config.width/2, config.height/0.97, 'sueloMapa')
      this.sueloMapa.create(config.width/2, config.height/0.96, 'sueloMapa')
      this.sueloMapa.create(config.width/2, config.height/0.95, 'sueloMapa')

        //( The platforms group contains the ground and the 2 ledges we can jump on

        platforms = this.physics.add.staticGroup();
        
        //  Here we create the ground.
        //  Scale it to fit the width of the game (the original sprite is 400x32 in size)
     
        
        //platforms.create(config.width/2.07, config.height/1.09, 'suelo');
          //SUELO DEL MEDIO
        platforms.create(config.width/1.48, config.height/1.60, 'sueloMedio2');
        platforms.create(config.width/2.97, config.height/1.535, 'sueloMedio');
        platforms.create(config.width/1.22,config.height/2.72,'sueloTejado');
        platforms.create(config.width/0.97, config.height/1.525, 'sueloMedio2');
        platforms.create(config.width/18, config.height/1.9, 'sueloMedio2');


        platforms.create(config.width/6,config.height/3.8,'sueloTejado');
        platforms.create(config.width/4,config.height/3.8,'sueloTejado');



        //GRUPO DE LAS PRIMERAS ESCALERAS
        escaleras = this.physics.add.staticGroup({ key: 'tejado', frameQuantity: 300 });
        //Phaser.Actions.PlaceOnLine(escaleras.getChildren(), new Phaser.Geom.Line(config.width/8.34, config.height/1.13,config.width/4.04,config.height/1.550));
        Phaser.Actions.PlaceOnLine(escaleras.getChildren(), new Phaser.Geom.Line(config.width/20, config.height/1.06,config.width/3.6,config.height/1.54));
        escaleras.refresh();
        
        //GRUPO ESCALERAS A LA PLANTA SUPERIOR
        escaleras1= this.physics.add.staticGroup({ key: 'tejado', frameQuantity: 500 });
        Phaser.Actions.PlaceOnLine(escaleras1.getChildren(), new Phaser.Geom.Line(config.width/2.7, config.height/1.54,config.width/1.7,config.height/2.7));
        escaleras1.refresh();
        
        //GRUPO ESCALERAS PLANTA DE ABAJO
        escaleras2= this.physics.add.staticGroup({ key: 'tejado', frameQuantity: 400 });
        Phaser.Actions.PlaceOnLine(escaleras2.getChildren(), new Phaser.Geom.Line(config.width/1.4, config.height/1.08,config.width/1.07,config.height/1.525));
        escaleras2.refresh();
        

        // JUGADORES
        player = this.physics.add.sprite(config.width/2.1, 700, 'dude');
        player2 = this.physics.add.sprite(config.width/2.1, 700, 'dude');

        //jugador1
        player.setBounce(0.2);
        player.setCollideWorldBounds(true);
        player.vidas = 3;
        player.vivo = true;
        player.inmortalidad = false;
        //jugador2
        player2.setBounce(0.2);
        player2.setCollideWorldBounds(true);
        player2.vidas = 3;
        player2.vivo = true;
        player2.inmortalidad = false;
        

        //BOTON PAUSE 
        this.gameButtonPause = this.add.sprite(config.width - (config.height*0.06), config.height*0.05, 'botonPausa').setInteractive();
           

            this.gameButtonPause.on('pointerdown', function (pointer) {
                
                this.scene.pause('sceneGame2');
                this.scene.launch('scenePause2');
                if( listaJugAbierta== true){
                    this.scene.stop('listaJugadores');
                    listaJugAbierta= false;
                    
                }
                
            }.bind(this));


        

        speed = Phaser.Math.GetSpeed(300, 1);
        

        //  Our player animations, turning, walking left and walking right.
        this.anims.create({
            key: 'left',
            frames: this.anims.generateFrameNumbers('mainchizq', { start: 0, end: 16 }),
            frameRate: 27,
            repeat: -1
            
        });


        this.anims.create({
            key: 'right',
            frames: this.anims.generateFrameNumbers('mainch', { start: 0, end: 16 }),
            frameRate: 27,
            repeat: -1
            

        });
        player.anims.play("right");

        this.anims.create({
            key: 'left2',
            frames: this.anims.generateFrameNumbers('mainchizq2', { start: 0, end: 16 }),
            frameRate: 27,
            repeat: -1
            
        });


        this.anims.create({
            key: 'right2',
            frames: this.anims.generateFrameNumbers('mainch2', { start: 0, end: 16 }),
            frameRate: 27,
            repeat: -1
            

        });
        player2.anims.play("right2");

        this.anims.create({
            key: 'Enemigoleft',
            frames: this.anims.generateFrameNumbers("zombieLeft"),
            frameRate: 5,
            repeat: -1
            
        });
    
        this.anims.create({
            key: 'Enemigoright',
            frames: this.anims.generateFrameNumbers("zombieRight"),
            frameRate: 5,
            repeat: -1
    
        });
        
        this.anims.create({
            key: 'BalaLeft',
            frames: this.anims.generateFrameNumbers("balaLeft"),
            frameRate: 5,
            repeat: -1
            
        });
    
        this.anims.create({
            key: 'BalaRight',
            frames: this.anims.generateFrameNumbers("balaRight"),
            frameRate: 5,
            repeat: -1
    
        });
        


        //  Input Events
        cursors = this.input.keyboard.createCursorKeys();
        
        //  Some stars to collect, 12 in total, evenly spaced 70 pixels apart along the x axis

        //VIDAS
        vidasText2 = this.add.bitmapText(16, 16,'fuentes3','vidas        : ',40);
        vidasText = this.add.bitmapText(16, 76,'fuentes3','vidas        : ',40);
        
		//incluimjos el texto que contiene el estado del servidor
        textEstadoServidor = this.add.bitmapText(0,config.height - 30,'fuentes3','',15);

        //  The score
        this.ronda = 0;
        scoreText = this.add.bitmapText(config.width/2.2, 16,'fuentes3','ronda 0',40);

        //CUENTA ATRAS TEXTO
        this.ready = true;//indica que el jugador ha tenido tiempo de prepararse
        this.enemigosSpawn = false;
        cuentaAtras = this.add.bitmapText(this.sys.game.config.width/2, this.sys.game.config.height/2,'fuentes3','5',100);
        this.contadorTimeMedido = false;
        this.inicioContador = 0;
        this.contadorEnEjecucion = false;
        
        //tiempo en el que empiezan a aparecer los enemigos
        this.tiempoEnemigo = 99999999;


        //COLLIDERS DE LAS PLATAFORMAS CON EL JUGADOR 1
       this.colliderPlats= this.physics.add.collider(player, platforms);
       this.physics.add.collider(player, this.sueloMapa);
        
       this.colliderEscaleras = this.physics.add.collider(player,escaleras);
       this.colliderEscaleras1 = this.physics.add.collider(player, escaleras1);
       this.colliderEscaleras2 = this.physics.add.collider(player, escaleras2);
        this.physics.add.collider(player, tejas);
        this.physics.add.collider(player, tejas2);

          //COLLIDERS DE LAS PLATAFORMAS CON EL JUGADOR 2
       this.colliderPlats2 = this.physics.add.collider(player2, platforms);
       this.physics.add.collider(player2, this.sueloMapa);
        
       this.colliderEscaleras_2 = this.physics.add.collider(player2,escaleras);
       this.colliderEscaleras1_2 = this.physics.add.collider(player2, escaleras1);
       this.colliderEscaleras2_2 = this.physics.add.collider(player2, escaleras2);
        this.physics.add.collider(player2, tejas);
        this.physics.add.collider(player2, tejas2);
        
        


        

        //GRUPO DE LOS ENEMIGOS
        this.enemigos = this.add.group();

        //GRUPO DE LAS BALAS
        this.balas = this.add.group();
        for(var i = 0; i < 50; i++){//inicializamos 50 balas

            this.balas.getChildren()[i] = new Bala(this);

        }

                //COLLIDER DE LOS ENEMIGOS
       this.colliderEnemPlat = this.physics.add.collider(this.enemigos, platforms);
       this.physics.add.collider(this.enemigos,this.sueloMapa);
       this.colliderEnemEscaleras1 =this.physics.add.collider(this.enemigos,escaleras);
       this.colliderEnemEscaleras2 =this.physics.add.collider(this.enemigos,escaleras1);
       this.colliderEnemEscaleras3 =this.physics.add.collider(this.enemigos,escaleras2);
       this.colliderEnemTejas1 = this.physics.add.collider(this.enemigos,tejas);
       this.colliderEnemTejas2 = this.physics.add.collider(this.enemigos,tejas2);
       //  this.physics.add.collider(this.enemigos);//enemigos chocan con enemigos

       //COLLIDERS MAS GENERALES
       this.physics.add.collider(this.balas, this.enemigos, this.matarEnemigos, null, this);//balas chocan con enemigos
       this.physics.add.overlap(player, this.enemigos, this.quitarVida, null, this);//jugador choca con enemigo
       this.physics.add.overlap(player2, this.enemigos, this.quitarVida, null, this);//jugador2 choca con enemigo


        //DISPARO PLAYER 1
        this.input.keyboard.on("keydown_SHIFT",() =>{//pulsar el boton de disparo
                
            this.disparoSound.play();

            if(player.vivo){
                var i = 0;
                while(this.balas.getChildren()[i].x != -100){//encontramos la bala que usaremos

                    i++;

                }
                if(i >= 50 - 1){
                        i = 0;
                }      
                this.balas.getChildren()[i].x = player.x;
                this.balas.getChildren()[i].y = player.y+25;
                this.balas.getChildren()[i].setVisible(true);


                if(estado == 0){
                    this.balas.getChildren()[i].anims.play("BalaLeft", true);
                    this.balas.getChildren()[i].body.setVelocityX(-1000);
                }
                else{
                    this.balas.getChildren()[i].anims.play("BalaRight", true);
                    this.balas.getChildren()[i].body.setVelocityX(1000);
                }
            }
            
        })
        
        
      //DISPARO JUGADOR 2
        
        this.input.keyboard.on("keydown_SPACE",() => {//pulsar el boton de disparo
                
            this.disparoSound.play();

            if(player2.vivo){
                var i = 0;
                while(this.balas.getChildren()[i].x != -100){//encontramos la bala que usaremos

                    i++;

                }
                if(i >= 50 - 1){
                        i = 0;
                }      
                this.balas.getChildren()[i].x = player2.x;
                this.balas.getChildren()[i].y = player2.y+25;
                this.balas.getChildren()[i].setVisible(true);

                if(estado2 == 0){
                    this.balas.getChildren()[i].anims.play("BalaLeft", true);
                    this.balas.getChildren()[i].body.setVelocityX(-1000);
                }
                else{
                    this.balas.getChildren()[i].anims.play("BalaRight", true);
                    this.balas.getChildren()[i].body.setVelocityX(1000);
                }
            }
            
        })
        



        //Deteccion de teclas del movimiento del jugador 2
        this.w = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
        this.a = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        this.s = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
        this.d = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
        var esp = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

        




        //TOCAR TAB PARA ABRIR LISTAJUGADORES
        
        this.input.keyboard.on("keydown_CTRL",() =>{

            if(listaJugAbierta == false){

        this.scene.launch('listaJugadores');
         listaJugAbierta = true;



            }else if( listaJugAbierta== true){
                this.scene.stop('listaJugadores');
                listaJugAbierta= false;
                
            }



        })

        





        
        //TOCAR ESC PARA ABRIR EL CHAT
       
        this.input.keyboard.on("keydown_ESC",() =>{

            if(chatAbierto == false){
                this.scene.launch('chatScene');
                chatAbierto = true;
             
                this.input.keyboard.removeKey(Phaser.Input.Keyboard.KeyCodes.W)
                this.input.keyboard.removeKey(Phaser.Input.Keyboard.KeyCodes.A)
                this.input.keyboard.removeKey(Phaser.Input.Keyboard.KeyCodes.S)
                this.input.keyboard.removeKey(Phaser.Input.Keyboard.KeyCodes.D)
                this.input.keyboard.removeKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
               
        
            }else if(chatAbierto == true){
                this.scene.stop('chatScene');
                chatAbierto= false;
                this.w = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
                this.a = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
                this.s = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
                this.d = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
                this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

                

                
            }


        })






/*
         //enviar la ubicacion jugador 1 al servidor
         $.ajax({
            method: "POST",
            url:"http://localhost:8080/jugador/0",
            data: JSON.stringify({posicionx: player.x, posiciony: player.y, vida: player.vidas}),
            processData: false,
            headers: {
            "Content-type":"application/json"
            }
            }).done(function(data, textStatus, jqXHR) {
            console.log(textStatus+" "+jqXHR.statusCode());
            }).fail(function(data, textStatus, jqXHR){
            console.log(textStatus+" "+jqXHR.statusCode());
            });



        //enviar la ubicacion jugador 2 al servidor
        $.ajax({
            method: "POST",
            url:"http://localhost:8080/jugador/1",
            data: JSON.stringify({posicionx: player2.x, posiciony: player2.y, vida: player2.vidas}),
            processData: false,
            headers: {
            "Content-type":"application/json"
            }
            }).done(function(data, textStatus, jqXHR) {
            console.log(textStatus+" "+jqXHR.statusCode());
            }).fail(function(data, textStatus, jqXHR){
            console.log(textStatus+" "+jqXHR.statusCode());
            });
*/

this.servidorEstado = false;

    }
    

    update(time,delta){
    
    	//GET PARA LOS MENSAJES++++++++++++++++++++++++++++++++++++++++++++
$.ajax({

    url: "http://localhost:8080/conectado"
}).then(function(data) {
 

 
    //EL JUGADOR1 EXISTE
    if(data[0] != null){

        estaConectadoPlayer1 = true;
   
        if(estaConectadoPlayer1 != estaConectadoPlayer1aux){
    
            alert("Se ha conectado Jugador 1: " + data[0].usuario);
    
        }
        estaConectadoPlayer1aux = true;


        
    //EL JUGADOR1 NO EXISTE
    }else{

        estaConectadoPlayer1 = false;
   
        if(estaConectadoPlayer1 != estaConectadoPlayer1aux){
    
            alert("Se ha desconectado Jugador 1: " );
    
        }
        estaConectadoPlayer1aux = false;


      

    }

    
    //EL JUGADOR2 EXISTE
    
 
    
    if(data[1] != null){

        estaConectadoPlayer2 = true;
   
        if(estaConectadoPlayer2 != estaConectadoPlayer2aux){
    
            alert("Se ha conectado Jugador 2: " + data[1].usuario);
    
        }
        estaConectadoPlayer2aux = true;






    //EL JUGADOR2 NO EXISTE
    }else{

        estaConectadoPlayer2 = false;
        if(estaConectadoPlayer2 != estaConectadoPlayer2aux){
    
            alert("Se ha desconectado Jugador 2: ");
    
        }
        estaConectadoPlayer2aux = false;



    }

    
   
 
 
	})//FIN GETT+++++++++++++++++++++++++++++++++++++++++++++++++++++++++
    
    
    
        

		//Actualiza el estado del servidor
		 $.ajax({

		            url: "http://localhost:8080/juego"
		        }).then(function(data) {
		        	
		            if(data == true){
		           
		                textEstadoServidor.setText("Servidor conectado");
		                //that2.textoEstadoServidor.addColor("008F39",20);
		                that2.servidorEstado = true;
		                
		                
		 
		                
		            }

	
		}).fail(function(data, textStatus, jqXHR){
		
			               		
		        	textEstadoServidor.setText("Servidor desconectado");
		        	//that2.textoEstadoServidor.addColor("FF000",20);
		        

        });
	
 

        //ACTUALIZAR VIDAS
        vidasText.setText('vidas   : '+player.vidas);
        vidasText2.setText('vidas   : '+player2.vidas);

        //CONDICION DE DERROTA
        if(!player.vivo && !player2.vivo){
	    this.sound.removeByKey('audioScene1');
            rondaFinal = this.ronda;
            game.scene.stop('chatScene');
            game.scene.stop('sceneGame2');
            var element = document.getElementById("divChat");
            element.style.display = "none";
            if( listaJugAbierta== true){
                this.scene.stop('listaJugadores');
                listaJugAbierta= false;
                
            }
            game.scene.start('sceneGameOver');
        }
        
        //AJUSTAR CUENTA ATRAS
        //ajustamos el tiempo del temporizador para reiniciarse si viene del menu de pausa
        if(vueltaAlJuego == true && this.contadorEnEjecucion){
            this.reiniciarContador(this);
            vueltaAlJuego = false;
        }
        if(!this.contadorTimeMedido && this.ready){//ajusta el momento en el que empieza la escena
            this.inicioContador = time;
            this.contadorTimeMedido = true;
        }
        if(!this.enemigosSpawn && this.ready){
            this.contadorEnEjecucion = true;
            this.cuentaAtrasFunc(5, cuentaAtras, time, this.inicioContador, delta, this);//crea la cuenta atras que empieza en el numero 5 introducido en la funcion
        }
        if( (((time - this.tiempoEnemigo) >= 15000) && ((time - this.tiempoEnemigo) <= 15000 + delta)) && this.enemigosSpawn){//la ronda ha acabado
            this.enemigosSpawn = false;
            setTimeout(this.reiniciarContador, 4000, this);
        }

        //UPDATE BALAS
        for(var i = 0; i < this.balas.getChildren().length; i++){
            var balita = this.balas.getChildren()[i];
            balita.update();
        }

        //UPDATE ENEMIGOS
        for(var i = 0; i < this.enemigos.getChildren().length; i++){
            var enem = this.enemigos.getChildren()[i];
            enem.update(player.x, player2.x, player.vivo, player2.vivo);
        }
        
        //ENEMIGOS BAJAN PLATAFORMAS
        var probabilidadBajarEscaleras = 0.0017;
        var bajanEscaleras = Math.random() * (1 - 0) + 0;//numero aleatorio del 0 al 1

        if(bajanEscaleras < probabilidadBajarEscaleras && colliderEnemigosEliminado == 0){
            this.physics.world.removeCollider(this.colliderEnemPlat);
            this.physics.world.removeCollider(this.colliderEnemEscaleras1);
            this.physics.world.removeCollider(this.colliderEnemEscaleras2);
            this.physics.world.removeCollider(this.colliderEnemEscaleras3);
            colliderEnemigosEliminado = 1;
            //console.log("colliderEscalerasElimnado");
            //console.log("colliderElimnado");
            this.time.delayedCall(1300, this.zombiesPlatF, [], this);       
            
        }
        //APARICION ENEMIGOS 
        var tiempoEntreZombies = 5000/this.ronda;  
        if(this.enemigosSpawn && (((time - this.tiempoEnemigo)%tiempoEntreZombies >= 0) && ((time - this.tiempoEnemigo)%tiempoEntreZombies < delta) )){
            new Enemigo(this,this.sys.game.config.width,0);
            new Enemigo(this,0,0);
        }
        
        
        //CONTROLES JUGADOR 1
        //Pulsar tecla izquierda
        if (cursors.left.isDown && player.vivo)
        {
            player.setVelocityX(-260);
    
            player.anims.play('left', true);
    
            estado=0;
        }
        //Pulsar tecla derecha
        else if (cursors.right.isDown && player.vivo)
        {
            player.setVelocityX(260);
    
            player.anims.play('right', true);
    
            estado = 1;
    
        }
        //Pulsar ninguna tecla
        else if(player.vivo || player2.vivo)
        {
          player.setVelocityX(0);
          player.anims.play('turn', true);
            
        }

        
        

        
        if(player.vivo){

            //Pulsar tecla arriba
            if (cursors.up.isDown && player.body.touching.down)
            {
                player.setVelocityY(-400);
                player.anims.stop();
            }


            //Pulsar tecla abajo(eliminar collider)
            if (cursors.down.isDown && player.body.touching.down) 
            {
                this.physics.world.removeCollider(this.colliderPlats);
                this.physics.world.removeCollider(this.colliderEscaleras);
                this.physics.world.removeCollider(this.colliderEscaleras1);
                this.physics.world.removeCollider(this.colliderEscaleras2);
         
                colliderEliminado = 1;
                colliderEscalerasEliminado = 1;
                this.time.delayedCall(800, this.encimaDePlat, [], this);
    
            }

        }
        // EScLERAS POR LA DERECHA JUGADOR 1
        this.colliderEscalerasEliminadoAux = 0;
        for(var i = 0; i < escaleras.getChildren().length; i++){
            var enem = escaleras.getChildren()[i];

            if (enem.body.touching.right && player.body.touching.left && player.vivo
                || (enem.body.touching.right && player.body.touching.top && player.vivo))
            {
               
                this.colliderEscalerasEliminadoAux = 1
                
               
            }

        }
        if(this.colliderEscalerasEliminadoAux==1){
            this.physics.world.removeCollider(this.colliderEscaleras1);
            this.physics.world.removeCollider(this.colliderEscaleras2);
            this.physics.world.removeCollider(this.colliderEscaleras);
            colliderEscalerasEliminado = 1;
            this.time.delayedCall(400, this.escalerasDcha, [], this);
        }
        // EScLERAS1 POR LA DERECHA JUGADOR 1
        this.colliderEscalerasEliminadoAux = 0;
        for(var i = 0; i < escaleras1.getChildren().length; i++){
            var enem = escaleras1.getChildren()[i];

            if (enem.body.touching.right && player.body.touching.left && player.vivo
                || (enem.body.touching.right && player.body.touching.top && player.vivo))
            {
               
                this.colliderEscalerasEliminadoAux = 1;
             
                //console.log("colliderElimnado");
               
            }
         

        }
        if(this.colliderEscalerasEliminadoAux==1){
            this.physics.world.removeCollider(this.colliderEscaleras1);
            this.physics.world.removeCollider(this.colliderEscaleras2);
            this.physics.world.removeCollider(this.colliderEscaleras);
            colliderEscalerasEliminado = 1;
            this.time.delayedCall(400, this.escalerasDcha, [], this);
        }

        // EScLERAS2 POR LA DERECHA JUGADOR 1
        this.colliderEscalerasEliminadoAux = 0;
        for(var i = 0; i < escaleras2.getChildren().length; i++){
            var enem = escaleras2.getChildren()[i];

            if (enem.body.touching.right && player.body.touching.left && player.vivo
                || (enem.body.touching.right && player.body.touching.top && player.vivo))
            {
           
                this.colliderEscalerasEliminadoAux = 1;
              
                //console.log("colliderElimnado");
                         
            
            }

        }
        if(this.colliderEscalerasEliminadoAux ===1){
            this.physics.world.removeCollider(this.colliderEscaleras1);
            this.physics.world.removeCollider(this.colliderEscaleras2);
            this.physics.world.removeCollider(this.colliderEscaleras);
            colliderEscalerasEliminado = 1;
            this.time.delayedCall(400, this.escalerasDcha, [], this);
        }


        //CONTROLES JUGADOR 2
        //Pulsar tecla izquierda
        if (Phaser.Input.Keyboard.DownDuration(this.a)  && player2.vivo)
        {
            player2.setVelocityX(-260);
    
            player2.anims.play('left2', true);
    
            estado2=0;
        }
        //Pulsar tecla derecha
        else if (Phaser.Input.Keyboard.DownDuration(this.d) && player2.vivo)
        {

            player2.setVelocityX(260);
    
            player2.anims.play('right2', true);
    
            estado2 = 1;
    
        }
        //Pulsar ninguna tecla
        else if(player.vivo || player2.vivo)
        {
            player2.setVelocityX(0);
            player2.anims.play('turn2', true);

        }


        if(player2.vivo){

          

            //Pulsar tecla arriba
            if (Phaser.Input.Keyboard.DownDuration(this.w) && player2.body.touching.down)
            {
                player2.setVelocityY(-400);
                player.anims.stop();
            }

            //Pulsar tecla abajo(eliminar collider)
            if ((Phaser.Input.Keyboard.DownDuration(this.s)) && player2.body.touching.down)
            {
            
                this.physics.world.removeCollider(this.colliderPlats2);
                this.physics.world.removeCollider(this.colliderEscaleras_2);
                this.physics.world.removeCollider(this.colliderEscaleras1_2);
                this.physics.world.removeCollider(this.colliderEscaleras2_2);
                // console.log("colliderEscalerasEliminado2");
                //console.log("colliderEliminado2");
                colliderEliminado2 = 1;
                colliderEscalerasEliminado2 = 1;
                this.time.delayedCall(800, this.encimaDePlat2, [], this);

            }





        }
        
        

 
        // EScLERAS POR LA DERECHA  JUGADOR 2
        this.colliderEscalerasEliminadoAux2 = 0;
        for(var i = 0; i < escaleras.getChildren().length; i++){
            var enem = escaleras.getChildren()[i];

            if (enem.body.touching.right && player2.body.touching.left && player2.vivo
                || (enem.body.touching.right && player2.body.touching.top && player2.vivo))
            {
               
                this.colliderEscalerasEliminadoAux2 = 1
               // console.log("colliderEscalerasElimnado");
               
            }

        }
        if(this.colliderEscalerasEliminadoAux2==1){
            this.physics.world.removeCollider(this.colliderEscaleras1_2);
            this.physics.world.removeCollider(this.colliderEscaleras2_2);
            this.physics.world.removeCollider(this.colliderEscaleras_2);
            colliderEscalerasEliminado2 = 1;
            this.time.delayedCall(400, this.escalerasDcha2, [], this);
        }
        // EScLERAS1 POR LA DERECHA JUGADOR 2
        this.colliderEscalerasEliminadoAux2 = 0;
        for(var i = 0; i < escaleras1.getChildren().length; i++){
            var enem = escaleras1.getChildren()[i];

            if (enem.body.touching.right && player2.body.touching.left && player2.vivo
                || (enem.body.touching.right && player2.body.touching.top && player2.vivo))
            {
               
                this.colliderEscalerasEliminadoAux2 = 1;
                
                //console.log("colliderElimnado");
               
            }
         

        }
        if(this.colliderEscalerasEliminadoAux2==1){
            this.physics.world.removeCollider(this.colliderEscaleras1_2);
            this.physics.world.removeCollider(this.colliderEscaleras2_2);
            this.physics.world.removeCollider(this.colliderEscaleras_2);
            colliderEscalerasEliminado2 = 1;
            this.time.delayedCall(400, this.escalerasDcha2, [], this);
        }

        // EScLERAS2 POR LA DERECHA JUGADOR2
        this.colliderEscalerasEliminadoAux2 = 0;
        for(var i = 0; i < escaleras2.getChildren().length; i++){
            var enem = escaleras2.getChildren()[i];

            if (enem.body.touching.right && player2.body.touching.left && player2.vivo
                || (enem.body.touching.right && player2.body.touching.top && player2.vivo))
            {
           
                this.colliderEscalerasEliminadoAux2 = 1;
              //  console.log("colliderEscalerasElimnado");
                //console.log("colliderElimnado");
                         
            
            }

        }
        if(this.colliderEscalerasEliminadoAux2==1){
            this.physics.world.removeCollider(this.colliderEscaleras1_2);
            this.physics.world.removeCollider(this.colliderEscaleras2_2);
            this.physics.world.removeCollider(this.colliderEscaleras_2);
            colliderEscalerasEliminado2 = 1;
            this.time.delayedCall(400, this.escalerasDcha2, [], this);
        }


        

    
    }



matarEnemigos(bala,enemigo){

    enemigo.destroy();
    bala.matarBala();

}
quitarVida(player){
    

    if(!player.inmortalidad){//si no es considerado inmortal (conrol realizado para respetetar un tiempo entre daño y daño)
        //console.log(player.vidas);

        if(player.vidas == 1){
            player.setTint(0xff0000);
            player.vivo = false;
            this.gameOverSound.play();
            player.vidas--;
        }else if(player.vidas <= 0){
            
        }else{
            this.perderUnaVidaSound.play();
            player.vidas--;
            player.inmortalidad = true;
        }
        setTimeout(function(){player.inmortalidad = false;}, 2000)
        
        //console.log(player.vidas);
    }
    
}

cuentaAtrasFunc(num, cuentaAtras, time, inicioContador, delta, scene){

    //  console.log("tiempoInicial " + inicioContador);
    //  console.log("tiempoActual " + time);

    num++;

    for(var i = 0; i <= num; i++){

        if(time > (((i * 1000) + inicioContador) - delta) &&  time < (((i * 1000) + inicioContador) + delta)){
            
            if(i == num){//la cuenta atras ya ha terminado
                cuentaAtras.setText("");
                scene.enemigosSpawn = true;//se activa que emiecen a aparecer enemigos
                scene.tiempoEnemigo = time;//se guarda el tiempo en el que se activa su aparicion
                scene.ready = false; //El jugador al incio de la siguiente ronda no estara preparado
                scene.ronda++;                            //actualiza la ronda
                scoreText.setText('ronda ' + this.ronda);
                this.contadorEnEjecucion = false;//finaliza la cuenta atras

            }else{

                cuentaAtras.setText(num - i - 1);

            }


        }

    }

}

reiniciarContador(scene){
    scene.contadorTimeMedido = false;
    scene.ready = true;
    //console.log("despues " + scene.ready);
}


encimaDePlat(){

    if(colliderEliminado === 1){
    this.colliderPlats = this.physics.add.collider(player, platforms);
    
    colliderEliminado = 0;

    
    }
    if(colliderEscalerasEliminado === 1){
        this.physics.world.removeCollider(this.colliderEscaleras);
        this.physics.world.removeCollider(this.colliderEscaleras1);
        this.physics.world.removeCollider(this.colliderEscaleras2);
        this.colliderEscaleras = this.physics.add.collider(player,escaleras);
    this.colliderEscaleras1 = this.physics.add.collider(player, escaleras1);
    this.colliderEscaleras2 = this.physics.add.collider(player, escaleras2);
    colliderEscalerasEliminado = 0;
    }
   
}


encimaDePlat2(){


   

    if(colliderEliminado2 === 1){
        this.colliderPlats2 = this.physics.add.collider(player2, platforms);
        
        colliderEliminado2 = 0;
    
        //console.log("colliderEscalerasAñadido");
       // console.log("colliderAñadido");
        }
        if(colliderEscalerasEliminado2 === 1){
            this.physics.world.removeCollider(this.colliderEscaleras_2);
            this.physics.world.removeCollider(this.colliderEscaleras1_2);
            this.physics.world.removeCollider(this.colliderEscaleras2_2);
            this.colliderEscaleras_2 = this.physics.add.collider(player2,escaleras);
        this.colliderEscaleras1_2 = this.physics.add.collider(player2, escaleras1);
        this.colliderEscaleras2_2 = this.physics.add.collider(player2, escaleras2);
        colliderEscalerasEliminado2 = 0;
        }
}
escalerasDcha(){

    if(colliderEscalerasEliminado === 1){
     
        this.colliderEscaleras = this.physics.add.collider(player,escaleras);
        this.colliderEscaleras1 = this.physics.add.collider(player, escaleras1);
        this.colliderEscaleras2 = this.physics.add.collider(player, escaleras2);
        //console.log("colliderEscalerasAñadido");
        colliderEscalerasEliminado = 0;


    }
}



 
escalerasDcha2(){

    
if(colliderEscalerasEliminado2 === 1){
     
    this.colliderEscaleras_2 = this.physics.add.collider(player2,escaleras);
    this.colliderEscaleras1_2 = this.physics.add.collider(player2, escaleras1);
    this.colliderEscaleras2_2 = this.physics.add.collider(player2, escaleras2);
    //console.log("colliderEscalerasAñadido");
    colliderEscalerasEliminado2 = 0;


}
}

zombiesPlatF(){


    if(colliderEnemigosEliminado === 1){
        this.colliderEnemPlat = this.physics.add.collider(this.enemigos,platforms);
        this.physics.world.removeCollider(this.colliderEnemEscaleras1);
        this.physics.world.removeCollider(this.colliderEnemEscaleras2);
        this.physics.world.removeCollider(this.colliderEnemEscaleras3);
        this.colliderEnemEscaleras1 =this.physics.add.collider(this.enemigos,escaleras);
        this.colliderEnemEscaleras2 =this.physics.add.collider(this.enemigos,escaleras1);
        this.colliderEnemEscaleras3 =this.physics.add.collider(this.enemigos,escaleras2);
    
       // console.log("colliderEscalerasAñadido");
        colliderEnemigosEliminado = 0;
    }

}


centerButton (gameObject, offsetw = 0, offseth = 0) {
    Phaser.Display.Align.In.Center(
      gameObject,
      this.add.zone(config.width/2 - offsetw * 100, config.height/2 - offseth * 100, config.width, config.height)
    );
  }
   
centerButtonText (gameText, gameButton){
    Phaser.Display.Align.In.Center(
      gameText,
      gameButton
    );
  }


        
}
