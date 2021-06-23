class Enemigo extends Phaser.GameObjects.Sprite{

    constructor(scene,x,y,idx){

        super(scene,x,y,"zombieLeft");
        scene.add.existing(this);
        scene.physics.world.enableBody(this);

        scene.enemigos.add(this);

        this.indice = idx

    }



    update(x1, x2, playerVivo, player2Vivo){

        var xBuena;//x del player mas cercano

        xBuena = this.calcularPlayerCercano(x1,x2, this.x);
        if(!player2Vivo){
            xBuena = x1;
        }else if(!playerVivo){
            xBuena = x2;
        }
       
        if(xBuena < (this.x + 3) && xBuena > (this.x -3)){//se encuantra muy cerca

            this.body.setVelocityX(0);

        }else if(xBuena < this.x){

            this.anims.play("Enemigoleft", true);
            this.body.setVelocityX(-120);

        }else if(xBuena > this.x){

            this.anims.play("Enemigoright", true);
            this.body.setVelocityX(120);
        }



    }

    calcularPlayerCercano(x1, x2, xEnem){

        var xCercana;

        if(Math.abs(xEnem - x1) <  Math.abs(xEnem - x2)){
            xCercana = x1;
        }else{
            xCercana = x2;
        }

        return xCercana;

    }
}     
     