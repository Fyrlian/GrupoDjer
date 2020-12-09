class Scene7 extends Phaser.Scene {
  
    constructor(){

        super({ key: "sceneGame2" });
       
        
    }
  
    
    preload(){
       

    }
    create(){//  A simple background for our game
        this.bg=this.add.image(config.width/2,config.height/2, 'fondo');
        
        //Audio 
        var audio1 = this.sound.add('audioScene1',{volume: 0.09,loop: true});
        audio1.play();

        //( The platforms group contains the ground and the 2 ledges we can jump on
        platforms = this.physics.add.staticGroup();
        //  Here we create the ground.
        //  Scale it to fit the width of the game (the original sprite is 400x32 in size)
        platforms.create(config.width/2, config.height/1.114, 'sueloMapa');
        platforms.create(config.width/2.07, config.height/1.12, 'suelo');
        platforms.create(config.width/2.5, config.height/1.628, 'sueloMedio');
        //platforms.create(config.width/2, config.height/1.55, 'sueloMedio2');

        //  Now let's create some ledges
        
        //PRIMER ESCALON GOOORDO
        platforms.create((config.width/2)/6,(config.height/2)/0.575, 'escalonGrande');
        //ESCALONES NORMALES
        platforms.create((config.width/2)/3.9, (config.height/2)/0.608, 'escalon');
        platforms.create((config.width/2)/3.12,(config.height/2)/0.646, 'escalon');
        platforms.create((config.width/2)/2.68,(config.height/2)/0.688, 'escalon');
        platforms.create((config.width/2)/2.33,(config.height/2)/0.734, 'escalon');
        

        
        platforms.create(1062, 890, 'escalon');
        platforms.create(1125, 843, 'escalon');
        platforms.create(1185, 798, 'escalon');
        platforms.create(1237, 753, 'escalon');
        platforms.create(1297, 708, 'escalon');
        
        

        // The player and its settings
        player = this.physics.add.sprite(160, 100, 'dude');
        player2 = this.physics.add.sprite(160, 100, 'dude');


        //  Player physics properties. Give the little guy a slight bounce.
        player.setBounce(0.2);
        player.setCollideWorldBounds(true);
        player.vidas = 3;
        player.vivo = true;
        player.inmortalidad = false;

        player2.setBounce(0.2);
        player2.setCollideWorldBounds(true);
        player2.vidas = 3;
        player2.vivo = true;
        player2.inmortalidad = false;
        
        

        this.physics.add.collider(
            player,
            platforms,
            function (_player, _platforms)
            {
                if (_player.body.touching.down && _platforms.body.touching.up)
                {
                    game.encimaDePlat = 1;
                }else{
                    game.encimaDePlat= 0;
                }
                
            });


    

        speed = Phaser.Math.GetSpeed(300, 1);
        

        //  Our player animations, turning, walking left and walking right.
        this.anims.create({
            key: 'left',
            frames: this.anims.generateFrameNumbers('mainchizq', { start: 0, end: 3 }),
            frameRate: 5,
            repeat: -1
            
        });

        this.anims.create({
            key: 'turn',
            frames: [ { key: 'mainch', frame: 1 } ],
            frameRate: 5,
            
        });

        this.anims.create({
            key: 'right',
            frames: this.anims.generateFrameNumbers('mainch', { start: 0, end: 3 }),
            frameRate: 5,
            repeat: -1
            

        });

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

        //  Input Events
        cursors = this.input.keyboard.createCursorKeys();
        
        //  Some stars to collect, 12 in total, evenly spaced 70 pixels apart along the x axis
        stars = this.physics.add.group({
            key: 'star',
            repeat: 11,
            setXY: { x: 12, y: 0, stepX: 70 }
        });

        stars.children.iterate(function (child) {

            //  Give each star a slightly different bounce
            child.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8));

        });

        bombs = this.physics.add.group();

        //  The score
        scoreText = this.add.text(16, 16, 'score: 0', { fontSize: '32px', fill: '#000' });

        //CUENTA ATRAS TEXTO
        this.enemigosSpawn = false;
        cuentaAtras = this.add.text(this.sys.game.config.width/2, this.sys.game.config.height/2, '5', { fontSize: '200px', fill: '#000' });
        this.pimerTimeMedido = false;
        this.primerTiempo = 0;

        //tiempo aparicion enemigos
        this.tiempoEnemigo = 0;

        //  Collide the player and the stars with the platforms
        this.physics.add.collider(player, platforms);
        this.physics.add.collider(player2, platforms);
        this.physics.add.collider(stars, platforms);
        this.physics.add.collider(bombs, platforms);

        //  Checks to see if the player overlaps with any of the stars, if he does call the collectStar function
        this.physics.add.overlap(player, stars, this.collectStar, null, this);
        this.physics.add.collider(player, bombs, this.hitBomb, null, this);
        this.physics.add.overlap(player2, stars, this.collectStar, null, this);
        this.physics.add.collider(player2, bombs, this.hitBomb, null, this);


        //GRUPO DE LOS ENEMIGOS
        this.enemigos = this.add.group();

        this.physics.add.collider(this.enemigos, platforms);



        //GRUPO DE LAS BALAS
        this.balas = this.add.group();
        for(var i = 0; i < 50; i++){//inicializamos 50 balas

            this.balas.getChildren()[i] = new Bala(this);

        }

        //DISPARO PLAYER 1
        this.input.keyboard.on("keydown_SPACE",() => {//pulsar el boton de disparo
            if(player.vivo){
                    var i = 0;
                    while(this.balas.getChildren()[i].x != -1){//encontramos la bala que usaremos

                        i++;

                    }
                    if(i >= 50 - 1){
                            i = 0;
                    }      
                this.balas.getChildren()[i].x = player.x;
                this.balas.getChildren()[i].y = player.y;

                if(estado == 0){
                    this.balas.getChildren()[i].body.setVelocityX(-1000);
                }
                else{
                    this.balas.getChildren()[i].body.setVelocityX(1000);
                }
            }
            
        })

        //DISPARO PLAYER 2
        this.input.keyboard.on("keydown_SHIFT",() => {//pulsar el boton de disparo
                if(player2.vivo){
                    var i = 0;
                    while(this.balas.getChildren()[i].x != -1){//encontramos la bala que usaremos

                        i++;

                    }
                    if(i >= 50 - 1){
                            i = 0;
                    }      
                this.balas.getChildren()[i].x = player2.x;
                this.balas.getChildren()[i].y = player2.y;

                if(estado2 == 0){
                    this.balas.getChildren()[i].body.setVelocityX(-1000);
                }
                else{
                    this.balas.getChildren()[i].body.setVelocityX(1000);
                }
            }
        })

        
        this.physics.add.collider(this.balas, this.enemigos, this.matarEnemigos, null, this);
        this.physics.add.collider(player, this.enemigos, this.quitarVida, null, this);
        this.physics.add.collider(player2, this.enemigos, this.quitarVida, null, this);
        this.physics.add.collider(this.enemigos, this.enemigos);


        this.w = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
        this.a = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        this.s = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
        this.d = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);

    }
    

    update(time,delta){

        if(!player.vivo && !player2.vivo){
            //introducir nueva escena
        }

        //AJUSTAR CUENTA ATRAS
        if(!this.pimerTimeMedido){
            this.primerTiempo = time;
            this.pimerTimeMedido = true;
        }
        if(!this.enemigosSpawn){
            this.cuentaAtrasFunc(5, cuentaAtras, time, this.primerTiempo, delta, this);
        }

        

        //UPDATE ENEMIGOS
        for(var i = 0; i < this.enemigos.getChildren().length; i++){
            var enem = this.enemigos.getChildren()[i];
            enem.update(player.x,player2.x, player.vivo, player2.vivo);
        }
        //APARICION ENEMIGOS    
        if(this.enemigosSpawn && (((time - this.tiempoEnemigo)%1000 >= 0) && ((time - this.tiempoEnemigo)%1000 <= 1) )){

            new Enemigo(this,this.sys.game.config.width,this.sys.game.config.height/2);
        }


        if (gameOver)
        {
            return;
        }

        if (cursors.left.isDown && player.vivo)
        {
            player.setVelocityX(-160);
    
            player.anims.play('left', true);
    
            estado=0;
        }
        else if (cursors.right.isDown && player.vivo)
        {
            player.setVelocityX(160);
    
            player.anims.play('right', true);
    
            estado = 1;
    
        }
        else
        {
            player.setVelocityX(0);
            player.anims.play('turn', true);
        }
    
        if (cursors.up.isDown && player.body.touching.down  && player.vivo)
        {
            player.setVelocityY(-200);
        }

        


        if (Phaser.Input.Keyboard.DownDuration(this.a)  && player2.vivo)
        {
            player2.setVelocityX(-160);
    
            player2.anims.play('left', true);
    
            estado2=0;
        }
        else if (Phaser.Input.Keyboard.DownDuration(this.d) && player2.vivo)
        {
            player2.setVelocityX(160);
    
            player2.anims.play('right', true);
    
            estado2 = 1;
    
        }
        else
        {
            player2.setVelocityX(0);
            player2.anims.play('turn', true);
        }
    
        if (Phaser.Input.Keyboard.DownDuration(this.w) && player2.body.touching.down && player2.vivo)
        {
            player2.setVelocityY(-200);
        }
    
    
    }

    createStar(x, y, vx, vy)
{
    var star = stars.get();

    if (!star) return;

    star
        .enableBody(true, x, y, true, true)
        .setVelocity(vx, vy);
}
collectStar (player, star){
        star.disableBody(true, true);
    
        //  Add and update the score
        score += 10;
        scoreText.setText('Score: ' + score);
    
        if (stars.countActive(true) === 0)
        {
            //  A new batch of stars to collect
            stars.children.iterate(function (child) {
    
                child.enableBody(true, child.x, 0, true, true);
    
            });
    
            var x = (player.x < 400) ? Phaser.Math.Between(400, 800) : Phaser.Math.Between(0, 400);
    
            var bomb = bombs.create(x, 16, 'bomb');
            bomb.setBounce(1);
            bomb.setCollideWorldBounds(true);
            bomb.setVelocity(Phaser.Math.Between(-200, 200), 20);
            bomb.allowGravity = false;
    
        }
    }
hitBomb (player, bomb)
{
    this.physics.pause();

    player.setTint(0xff0000);

    player.anims.play('turn');

    gameOver = true;
}
matarEnemigos(bala,enemigo){

    enemigo.destroy();
    bala.x = -1;
    bala.y = -1;
    bala.body.setVelocityX(0);

}
quitarVida(player){

    if(!player.inmortalidad){//si no es considerado inmortal (conrol realizado para respetetar un tiempo entre daño y daño)
        //console.log(player.vidas);
        player.vidas--;
        player.inmortalidad = true;
        setTimeout(function(){player.inmortalidad = false;}, 2000)
        if(player.vidas < 0){
            player.setTint(0xff0000);
            player.vivo = false;
        }
        //console.log(player.vidas);
    }



    
}

cuentaAtrasFunc(num, cuentaAtras, time, primerTiempo, delta, scene){

    //  console.log("tiempoInicial " + primerTiempo);
    //  console.log("tiempoActual " + time);

    num++;

    for(var i = 0; i <= num; i++){

        if(time > (((i * 1000) + primerTiempo) - delta) &&  time < (((i * 1000) + primerTiempo) + delta)){
            
            if(i == num){//la cuenta atras ya ha terminado
                cuentaAtras.setText("");
                scene.enemigosSpawn = true;//se activa que emiecen a aparecer enemigos
                scene.tiempoEnemigo = time;//se guarda el tiempo en el que se activa su aparicion

            }else{

                cuentaAtras.setText(num - i - 1);

            }


        }


    }

}

}


