class Scene3 extends Phaser.Scene {
  
    constructor(){

        super({ key: "sceneGame" });
       
        
    }
  
    
    preload(){
       
/*

        this.load.image('sueloMapa','assets/sueloMapa.png')
        this.load.image('suelo','assets/suelo.png')
        this.load.image('sueloMedio','assets/sueloMedio.png')
        this.load.image('sueloMedio2','assets/sueloMedio2.png')
        this.load.image('fondo','assets/Nivel 1.png')
        this.load.image('sky', 'assets/sky.png');
        this.load.image('ground', 'assets/platform.png');
        this.load.image('star', 'assets/star.png');
        this.load.image('bomb', 'assets/bomb.png');
        this.load.image('bullet', 'assets/star.png');
        this.load.spritesheet('dude', 'assets/dude.png', { frameWidth: 32, frameHeight: 48 });
        this.load.spritesheet('mainch', 'assets/mainchAK-47.png', { frameWidth: 100, frameHeight: 100 });
        this.load.spritesheet('mainchizq', 'assets/mainchAK-47Izq.png', { frameWidth: 100, frameHeight: 100 });
*/
    }
    create(){//  A simple background for our game
    this.bg=this.add.image(960, 540, 'fondo');

    //  The platforms group contains the ground and the 2 ledges we can jump on
    platforms = this.physics.add.staticGroup();

    //  Here we create the ground.
    //  Scale it to fit the width of the game (the original sprite is 400x32 in size)
    platforms.create(960, 917, 'sueloMapa');
    platforms.create(925, 910, 'suelo');
    platforms.create(840, 650, 'sueloMedio');
    platforms.create(1462, 650, 'sueloMedio2');

    //  Now let's create some ledges
    platforms.create(160, 890, 'escalera1');
    platforms.create(250, 845, 'escaleradefault');
    platforms.create(305, 800, 'escaleradefault');
    platforms.create(355, 755, 'escaleradefault');
    platforms.create(410, 710, 'escaleradefault');
    platforms.create(470, 665, 'escaleradefault');

    
    platforms.create(1062, 890, 'escaleradefault');
    platforms.create(1125, 843, 'escaleradefault');
    platforms.create(1185, 798, 'escaleradefault');
    platforms.create(1237, 753, 'escaleradefault');
    platforms.create(1297, 708, 'escaleradefault');

    // The player and its settings
    player = this.physics.add.sprite(160, 100, 'dude');

    //  Player physics properties. Give the little guy a slight bounce.
    player.setBounce(0.2);
    player.setCollideWorldBounds(true);
    




    var Bullet = new Phaser.Class({

        Extends: Phaser.GameObjects.Image,

        initialize:

        function Bullet (scene)
        {
            Phaser.GameObjects.Image.call(this, scene, 0, 0, 'bullet');
            this.speed = Phaser.Math.GetSpeed(400, 1);
           
        },

        fire: function (x, y)
        {

            if(estado == 0)
            this.setPosition(x-25, y);
            

            if(estado == 1)
            this.setPosition(x+25, y);


            this.setActive(true);
            this.setVisible(true);
        
        },
        update: function (time, delta)
        {
                
            if(estado == 0){
              /*  this.setActive(false);  ///ESTO HAY QUE CAMBIARLO WACHO
                this.setVisible(false);
*/
                
            this.x -= this.speed * delta;  // Velocidad a la izquierda en X
            
            if (this.x < player.x-200)   //Rango de la bala para la izquierda
            {
                this.setActive(false);
                this.setVisible(false); 
            }


            }
            if(estado==1)
            {

            this.x += this.speed * delta;  // velocidad a la derecha en X
            
            if (this.x > player.x+200)  //rango de bala para la derecha
            {
                this.setActive(false);
                this.setVisible(false); 
            }

         }


        }
           
            
        


        });


        bullets = this.add.group({
        classType: Bullet,
        maxSize: 2,
        runChildUpdate: true
        
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

    //  Collide the player and the stars with the platforms
    this.physics.add.collider(player, platforms);
    this.physics.add.collider(stars, platforms);
    this.physics.add.collider(bombs, platforms);

    //  Checks to see if the player overlaps with any of the stars, if he does call the collectStar function
    this.physics.add.overlap(player, stars, this.collectStar, null, this);
    this.physics.add.collider(player, bombs, this.hitBomb, null, this);
    }

    update(time,delta){
        if (gameOver)
        {
            return;
        }
        if (cursors.left.isDown)
        {
            player.setVelocityX(-160);
    
            player.anims.play('left', true);
    
            estado=0;
        }
        else if (cursors.right.isDown)
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
    
        if (cursors.up.isDown && player.body.touching.down)
        {
            player.setVelocityY(-200);
        }
    
        if (cursors.space.isDown && time > lastFired)
        {
            var bullet = bullets.get();
    
            if (bullet)
            {
                bullet.fire(player.x, player.y);
    
                lastFired = time + 50;
            }
        }
    
    
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


}


