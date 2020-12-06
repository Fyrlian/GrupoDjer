class Bala extends Phaser.GameObjects.Sprite{

    constructor(scene){
        
        super(scene,-1,-1,"bullet");
        scene.add.existing(this);
        scene.physics.world.enableBody(this);
        this.body.allowGravity = false;

        scene.balas.add(this);
        
    }
    

    matarBala(){

        this.x = -1;
        this.y = -1;
        this.balas.getChildren()[i].body.setVelocityX(0);


    }


    
}