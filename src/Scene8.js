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

      this.text = this.add.bitmapText(config.width/3.15, config.height/1.5,'fuentes3',('Llegaste a la ronda: '+ rondaFinal),32);
     
    
      

     

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