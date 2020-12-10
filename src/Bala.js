class Bala extends Phaser.GameObjects.Sprite{

    constructor(scene){
        
        super(scene,-100,-100,"bullet");
        scene.add.existing(this);
        scene.physics.world.enableBody(this);
        this.body.allowGravity = false;

        scene.balas.add(this);
        
    }
    

    matarBala(){

        this.x = -100;
        this.y = -100;
        this.body.setVelocityX(0);
        this.body.setVelocityY(0);
        this.setVisible(false);


    }

    update(){

        //detecta si esta fuera de los bordes
        if(this.x > config.width || this.x < 0){
            this.matarBala()
        }

    }
    
}