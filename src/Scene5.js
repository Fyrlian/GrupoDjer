class Scene5 extends Phaser.Scene {

    constructor(){

        super({ key: "sceneCreditos" });
    }
    preload(){

   
    }
    create(){


      this.creditsText = this.add.text(0, 0, 'Credits', { fontSize: '52px', fill: '#fff' });
      this.hechoPor = this.add.text(0, 0, 'Created by:', { fontSize: '26px', fill: '#fff' });
      this.Jorge = this.add.text(0, 0, 'Jorge Galiano García', { fontSize: '26px', fill: '#fff' });
      this.Pablo = this.add.text(0, 0, 'Pablo Romero Hernández', { fontSize: '26px', fill: '#fff' });
      this.Dani = this.add.text(0, 0, 'Daniel Romero Hernández', { fontSize: '26px', fill: '#fff' });
      this.zone = this.add.zone(config.width/2, config.height/2, config.width/2, config.height/2);
       
      Phaser.Display.Align.In.Center(
        this.creditsText,
        this.zone
      );
       
      Phaser.Display.Align.In.Center(
        this.hechoPor,
        this.zone
      );
      Phaser.Display.Align.In.Center(
          this.Dani,
          this.zone
        );
        Phaser.Display.Align.In.Center(
          this.Pablo,
          this.zone
        );
        Phaser.Display.Align.In.Center(
          this.Jorge,
          this.zone
        );
       
      this.hechoPor.setY(1000);
      this.Pablo.setY(2000);
      this.Jorge.setY(3000);
      this.Dani.setY(4000);


      
      this.creditsTween = this.tweens.add({
          targets: this.creditsText,
          y: -100,
          ease: 'Power1',
          duration: 3000,
          delay: 1000,
          onComplete: function () {
            this.destroy;
          }
        });
         
        this.hechoPorTween = this.tweens.add({
          targets: this.hechoPor,
          y: -300,
          ease: 'Power1',
          duration: 8000,
          delay: 1000,
          onComplete: function () {
            this.hechoPorTween.destroy;

          }.bind(this)
        });

        this.JorgeTween = this.tweens.add({
          targets: this.Jorge,
       y: config.height/2,
          ease: 'Power1',
          duration: 8000,
          delay: 1000,
          onComplete: function () {
            this.JorgeTween.destroy;

          }.bind(this)
        });

        this.PabloTween = this.tweens.add({
          targets: this.Pablo,
         // y: 200,
         y: config.height/4,
          ease: 'Power1',
          duration: 8000,
          delay: 1000,
          onComplete: function () {
            this.PabloTween.destroy;

          }.bind(this)
        });

        this.DaniTween = this.tweens.add({
          targets: this.Dani,
         // y: 600,
         y: config.height/1.3,
          ease: 'Power1',
          duration: 8000,
          delay: 1000,
          onComplete: function () {
            this.Pablo.destroy;
 //           this.scene.start('Title');
          }.bind(this)
        });
    

        this.ready();
        this.timedEvent = this.time.delayedCall(9900, this.ready, [], this);

  }
  update(){}
  init () {

      this.readyCount = 0;
    
    }
    
    ready () {
          this.readyCount++;
      if (this.readyCount === 2) {
          this.scene.start('sceneMenu');
      }

  }

}