class Scene3 extends Phaser.Scene {
  
    constructor(){

        super({ key: "sceneGame" });
       
        
    }
  
    
    preload(){
       

    }
    create(){//  A simple background for our game
        this.bg=this.add.image(config.width/2,config.height/2, 'fondo');
        



        
        //Audio 

       
        this.disparoSound= this.sound.add('disparoSound',{volume: 0.02});
        this.gameOverSound= this.sound.add('gameOverSound',{volume: 0.09});
        this.perderUnaVidaSound= this.sound.add('perderUnaVidaSound',{volume: 0.02});

        audio1 = this.sound.add('audioScene1',{volume: 0.05,loop: true});
        if(estadoMusica === true){
            audio1.play();
            audio1.resume();
        }else{
            audio1.stop();
        }
        

        
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
        platforms.create(config.width/1, config.height/1.48, 'sueloMedio2');
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
        Phaser.Actions.PlaceOnLine(escaleras2.getChildren(), new Phaser.Geom.Line(config.width/1.4, config.height/1.08,config.width/1.1,config.height/1.49));
        escaleras2.refresh();

       /* //TEJADO CON GRUPO DE TEJAS IZQUIERDA Y DERECHA
        tejas= this.physics.add.staticGroup({ key: 'tejado', frameQuantity: 86 });
        Phaser.Actions.PlaceOnLine(tejas.getChildren(), new Phaser.Geom.Line(config.width/2.67, config.height/3 ,config.width/1.65,config.height/50));
        tejas.refresh();
        tejas2 = this.physics.add.staticGroup({ key: 'tejado', frameQuantity: 86 });
        Phaser.Actions.PlaceOnLine(tejas2.getChildren(), new Phaser.Geom.Line(config.width/1.65,config.height/50,config.width/1.19,config.height/3));
        tejas2.refresh();
*/

        //PRIMER ESCALON GOOORDO
        //platforms.create((config.width/2)/6,(config.height/2)/0.567, 'escalonGrande');
        

        // The player and its settings
        player = this.physics.add.sprite(config.width/2, 700, 'dude');

        //  Player physics properties. Give the little guy a slight bounce.
        player.setBounce(0.2);
        player.setCollideWorldBounds(true);
        player.vidas = 3;
        player.vivo = true;
        player.inmortalidad = false;
        

    

        speed = Phaser.Math.GetSpeed(300, 1);


        //BOTON PAUSA DEL JUEGO
            //BOTON PARA VOLVER A LA ESCENA ANTERIOR 
            this.gameButtonPause = this.add.sprite(config.width - (config.height*0.06), config.height*0.05, 'botonPausa').setInteractive();
           

            this.gameButtonPause.on('pointerdown', function (pointer) {
                
                this.scene.pause('sceneGame');
                this.scene.launch('scenePause');
                
            }.bind(this));
          









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
        vidasText = this.add.bitmapText(16, 16,'fuentes3','vidas: '+ player.vidas,40);

        //  The score
        this.ronda = 0;
        scoreText = this.add.bitmapText(config.width/2.2, 16,'fuentes3','ronda '+ this.ronda,40);

        //CUENTA ATRAS
        this.ready = true;//indica que el jugador esta en tiempo de prepararse
        this.enemigosSpawn = false;//indica que pueden aparecer enemigos o no
        cuentaAtras = this.add.bitmapText(this.sys.game.config.width/2, this.sys.game.config.height/2,'fuentes3','5',100);
        this.contadorTimeMedido = false;//guarda si se ha recopilado el tiempo del inicio se la cuenta atras
        this.inicioContador = 0;//tiempo del inicio se la cuenta atras
        this.contadorEnEjecucion = false;

        //tiempo en el que empiezan a aparecer los enemigos
        this.tiempoEnemigo = 99999990;


    
       this.colliderPlats= this.physics.add.collider(player, platforms);
       this.physics.add.collider(player, this.sueloMapa);
        

       this.colliderEscaleras = this.physics.add.collider(player,escaleras);
       this.colliderEscaleras1 = this.physics.add.collider(player, escaleras1);
       this.colliderEscaleras2 = this.physics.add.collider(player, escaleras2);
       /*this.physics.add.collider(player, tejas);
       this.physics.add.collider(player, tejas2);*/
        


        

        //GRUPO DE LOS ENEMIGOS
        this.enemigos = this.add.group();

        //COLLIDER DE LOS ENEMIGOS
        this.colliderEnemPlat = this.physics.add.collider(this.enemigos, platforms);
        this.physics.add.collider(this.enemigos,this.sueloMapa);
        this.colliderEnemEscaleras1 =this.physics.add.collider(this.enemigos,escaleras);
        this.colliderEnemEscaleras2 =this.physics.add.collider(this.enemigos,escaleras1);
        this.colliderEnemEscaleras3 =this.physics.add.collider(this.enemigos,escaleras2);
        /*this.colliderEnemTejas1 = this.physics.add.collider(this.enemigos,tejas);
        this.colliderEnemTejas2 = this.physics.add.collider(this.enemigos,tejas2);*/
        this.physics.add.collider(this.enemigos);
    //    this.physics.add.collider(this.enemigos);//enemigos chocan con enemigos 
        //this.physics.add.overlap(this.enemigos, this.enemigos, function(enemigo1,enemigo2){enemigo1.body.setVelocidadX(0);}, null, this);//jugador choca con enemigo
        
        //GRUPO DE LAS BALAS
        this.balas = this.add.group();
        for(var i = 0; i < 50; i++){//inicializamos 50 balas

            this.balas.getChildren()[i] = new Bala(this);

        }

        //DISPARO PLAYER
        this.input.keyboard.on("keydown_SPACE",() =>{//pulsar el boton de disparo
            if(estadoSonido===true){
                this.disparoSound.play();
                this.disparoSound.resume();
            }
            else
            {
                this.disparoSound.pause();
            }
            

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

        
        this.physics.add.collider(this.balas, this.enemigos, this.matarEnemigos, null, this);//balas chocan con enemigos
        this.physics.add.overlap(player, this.enemigos, this.quitarVida, null, this);//jugador choca con enemigo

    







    }
    

    update(time,delta){
//aACTUALIZAR VIDAS
        vidasText.setText("vidas: " + player.vidas);

        //CONDICION DE DERROTA
        if(!player.vivo){
            this.sound.removeByKey('audioScene1');
            rondaFinal = this.ronda;
            game.scene.stop('sceneGame');
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
        if( ((time - this.tiempoEnemigo) >= 15000) && this.enemigosSpawn){//la ronda ha acabado
            this.enemigosSpawn = false;
            setTimeout(this.reiniciarContador, 4000, this);//inicia un nuevo contador
        }

        //UPDATE BALAS
        for(var i = 0; i < this.balas.getChildren().length; i++){
            var balita = this.balas.getChildren()[i];
            balita.update();
        }

        //UPDATE ENEMIGOS
        for(var i = 0; i < this.enemigos.getChildren().length; i++){
            var enem = this.enemigos.getChildren()[i];
            enem.update(player.x,-1, player.vivo, false);
        }
        //ENEMIGOS BAJAN PLATAFORMAS
        var probabilidadBajarEscaleras = 0.0017;
        var bajanEscaleras = Math.random() * (1 - 0) + 0;//numero aleatorio del 0 al 1

        if(bajanEscaleras < probabilidadBajarEscaleras && colliderEnemigosEliminado == 0){

            this.physics.world.removeCollider(this.colliderEnemPlat);
            this.physics.world.removeCollider(this.colliderEnemEscaleras1);
            this.physics.world.removeCollider(this.colliderEnemEscaleras2);
            this.physics.world.removeCollider(this.colliderEnemEscaleras3);

            /*this.physics.world.removeCollider(this.colliderEnemTejas1);
            this.physics.world.removeCollider(this.colliderEnemTejas2);*/
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
        

        if (cursors.left.isDown && player.vivo)
        {
            player.setVelocityX(-260);
    
            player.anims.play('left', true);
    
            estado=0;
        }
        else if (cursors.right.isDown && player.vivo)
        {
            player.setVelocityX(260);
    
            player.anims.play('right', true);
    
            estado = 1;
    
        }
        else
        {
            if(player.vivo){
                player.setVelocityX(0);
                player.anims.stop();
            }

        }
    if(player.vivo){
        if (cursors.up.isDown && player.body.touching.down)
        {
            player.setVelocityY(-400);
        }
    }

    
        






        //PULSAR TECLA ABAJO(eliminar collider)
        if(player.vivo){
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
        // EScLERAS POR LA DERECHA
        this.colliderEscalerasEliminadoAux = 0;
        for(var i = 0; i < escaleras.getChildren().length; i++){
            var enem = escaleras.getChildren()[i];

            if (enem.body.touching.right && player.body.touching.left && player.vivo
                || (enem.body.touching.right && player.body.touching.top && player.vivo))
            {
               
                this.colliderEscalerasEliminadoAux = 1
               
               
            }

        }
        if(this.colliderEscalerasEliminadoAux){
            this.physics.world.removeCollider(this.colliderEscaleras1);
            this.physics.world.removeCollider(this.colliderEscaleras2);
            this.physics.world.removeCollider(this.colliderEscaleras);
            colliderEscalerasEliminado = 1;
            this.time.delayedCall(400, this.escalerasDcha, [], this);
        }
        // EScLERAS1 POR LA DERECHA
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
        if(this.colliderEscalerasEliminadoAux){
            this.physics.world.removeCollider(this.colliderEscaleras1);
            this.physics.world.removeCollider(this.colliderEscaleras2);
            this.physics.world.removeCollider(this.colliderEscaleras);
            colliderEscalerasEliminado = 1;
            this.time.delayedCall(400, this.escalerasDcha, [], this);
        }

        // EScLERAS2 POR LA DERECHA
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
        if(this.colliderEscalerasEliminadoAux){
            this.physics.world.removeCollider(this.colliderEscaleras1);
            this.physics.world.removeCollider(this.colliderEscaleras2);
            this.physics.world.removeCollider(this.colliderEscaleras);
            colliderEscalerasEliminado = 1;
            this.time.delayedCall(400, this.escalerasDcha, [], this);
        }


    
    }



matarEnemigos(bala,enemigo){

    enemigo.destroy();
    bala.matarBala();

}
quitarVida(player){
    

    if(!player.inmortalidad){//si no es considerado inmortal (conrol realizado para respetetar un tiempo entre daño y daño)
        //console.log(player.vidas);
        if(estadoSonido === true){
            this.perderUnaVidaSound.play();
            this.perderUnaVidaSound.resume();
        }else{
            this.perderUnaVidaSound.pause();
        }
        

        player.vidas--;
        player.inmortalidad = true;
        if(player.vidas <= 0){

            player.setTint(0xff0000);
            player.vivo = false;
            if(estadoSonido===true){
                this.gameOverSound.play();
                this.gameOverSound.resume();
            }else{
                this.gameOverSound.pause();
            }
            
        }
        setTimeout(function(){player.inmortalidad = false;}, 2000)
        
    
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
                scoreText.setText("ronda " + this.ronda);//actualiza la ronda
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
 



escalerasDcha(){

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

zombiesPlatF(){


    if(colliderEnemigosEliminado === 1){
        this.colliderEnemPlat = this.physics.add.collider(this.enemigos,platforms);
        this.physics.world.removeCollider(this.colliderEnemEscaleras1);
        this.physics.world.removeCollider(this.colliderEnemEscaleras2);
        this.physics.world.removeCollider(this.colliderEnemEscaleras3);
        this.colliderEnemEscaleras1 =this.physics.add.collider(this.enemigos,escaleras);
        this.colliderEnemEscaleras2 =this.physics.add.collider(this.enemigos,escaleras1);
        this.colliderEnemEscaleras3 =this.physics.add.collider(this.enemigos,escaleras2);


        /*this.colliderEnemTejas1 = this.physics.add.collider(this.enemigos,tejas);
        this.colliderEnemTejas2 = this.physics.add.collider(this.enemigos,tejas2);*/
    
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
   


}

