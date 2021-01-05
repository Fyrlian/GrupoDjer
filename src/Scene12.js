class Scene12 extends Phaser.Scene {

    constructor(){

        super({ key: "sceneObjetivo2" });
    }
    preload(){

   
    }
    create(){
      
   //   this.background = this.add.image(config.width/2,config.height/2,'controles');
   this.zone = this.add.zone(config.width/2, config.height/2, config.width/2, config.height/2);
   this.text = this.add.bitmapText(config.width/2,config.height/2, 'fuentes','¡Sobrevivid la mayor cantidad de rondas! ',52 );
   Phaser.Display.Align.In.Center(
    this.text,
    this.zone
    );

      this.ready();
      this.timedEvent = this.time.delayedCall(5000, this.ready, [], this);

}
  update(){}





init () {

    this.readyCount = 0;
  
  }
  
  ready () {
        this.readyCount++;
    if (this.readyCount === 2) {
        this.scene.start('sceneGame2');
    }

}



}