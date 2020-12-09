class Bala extends Phaser.GameObjects.Sprite{

    constructor(scene){
        
        super(scene,-10,-10,"bullet");
        scene.add.existing(this);
        scene.physics.world.enableBody(this);
        this.body.allowGravity = false;

        scene.balas.add(this);
        
    }
    

    matarBala(){

        this.x = -10;
        this.y = -10;
        this.body.setVelocityX(0);


    }

    update(){

        //detecta si esta fuera de los bordes
        if(this.x > config.width || this.x < 0){
            this.matarBala()
        }

    }
    
}
