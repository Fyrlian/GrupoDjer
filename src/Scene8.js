class Scene8 extends Phaser.Scene {

    constructor(){

        super({ key: "sceneGameOver" });
    }
    preload(){

   
    }
    create(){

    this.score = 0;
    this.gameOver = false;
    this.lastFired = 0;
    this.encimaDePlat =0;
    this.colliderEliminado = 0;
    this.colliderEscalerasEliminado = 0;

      this.gameOverText = this.add.image(config.width/2,config.height/2,'gameOv');
 
       
      

     

        this.ready();
        this.timedEvent = this.time.delayedCall(4000, this.ready, [], this);

    }
    
  update(){}
  init () {

      this.readyCount = 0;
    
    }
    
    ready () {
          this.readyCount++;
      if (this.readyCount === 2) {
          this.scene.start('sceneCreditos');
      }

  }

}