class Scene5 extends Phaser.Scene {

    constructor(){

        super({ key: "sceneCreditos" });
    }
    preload(){

   
    }
    create(){


      this.creditsText = this.add.text(0, 0, 'Credits: ', { fontSize: '82px', fill: '#fff' });

      this.Fuentes1 = this.add.text(0, 0, 'Menu font: https://www.dafont.com/es/inheritance.font. ', { fontSize: '32px', fill: '#fff' });
      this.Fuentes2 = this.add.text(0, 0, 'Numbers Font: https://www.dafont.com/es/digital-7.font. ', { fontSize: '32px', fill: '#fff' });
      this.Fuentes3= this.add.text(0, 0, 'Sprite zombies: https://www.gameart2d.com/the-zombies-free-sprites.html ', { fontSize: '32px', fill: '#fff' });
      this.Fuentes4 = this.add.text(0, 0, 'Phaser examples code', { fontSize: '32px', fill: '#fff' });
      this.Fuentes5 = this.add.text(0, 0, 'Sounds: http://recursostic.educacion.es/bancoimagenes/web/. ', { fontSize: '32px', fill: '#fff' });
      this.Fuentes6 = this.add.text(0, 0, 'Level Background : https://opengameart.org/content/free-graveyard-platformer-tileset. ', { fontSize: '32px', fill: '#fff' });

      this.hechoPor = this.add.text(0, 0, 'Created by:', { fontSize: '26px', fill: '#fff' });
      this.Jorge = this.add.text(0, 0, 'Jorge Galiano García', { fontSize: '76px', fill: '#fff' });
      this.Pablo = this.add.text(0, 0, 'Pablo Romero Hernández', { fontSize: '76px', fill: '#fff' });
      this.Dani = this.add.text(0, 0, 'Daniel Romero Hernández', { fontSize: '76px', fill: '#fff' });
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
        this.Fuentes1,
        this.zone
      );
      Phaser.Display.Align.In.Center(
        this.Fuentes2,
        this.zone
      );
      Phaser.Display.Align.In.Center(
        this.Fuentes3,
        this.zone
      );
      Phaser.Display.Align.In.Center(
        this.Fuentes4,
        this.zone
      );
      Phaser.Display.Align.In.Center(
        this.Fuentes5,
        this.zone
      );
      Phaser.Display.Align.In.Center(
        this.Fuentes6,
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
      this.Fuentes1.setY(1100);
      this.Fuentes2.setY(1200);
      this.Fuentes3.setY(1300);
      this.Fuentes4.setY(1400);
      this.Fuentes5.setY(1500);
      this.Fuentes6.setY(1600);
      this.Pablo.setY(2000);
      this.Jorge.setY(3000);
      this.Dani.setY(4000);


      
      this.creditsTween = this.tweens.add({
          targets: this.creditsText,
          y: -300,
          ease: 'Power1',
          duration: 3000,
          delay: 1000,
          onComplete: function () {
            this.destroy;
          }
        });
         
        this.hechoPorTween = this.tweens.add({
          targets: this.hechoPor,
          y: -700,
          ease: 'Power1',
          duration: 8000,
          delay: 1000,
          onComplete: function () {
            this.hechoPorTween.destroy;

          }.bind(this)
        });
        this.fuentes1Tween = this.tweens.add({
          targets: this.Fuentes1,
          y: -600,
          ease: 'Power1',
          duration: 8000,
          delay: 1000,
          onComplete: function () {
            this.fuentes1Tween.destroy;

          }.bind(this)
        });
        this.fuentes2Tween = this.tweens.add({
          targets: this.Fuentes2,
          y: -500,
          ease: 'Power1',
          duration: 8000,
          delay: 1000,
          onComplete: function () {
            this.fuentes2Tween.destroy;

          }.bind(this)
        });

        this.fuentes3Tween = this.tweens.add({
          targets: this.Fuentes3,
          y: -400,
          ease: 'Power1',
          duration: 8000,
          delay: 1000,
          onComplete: function () {
            this.fuentes3Tween.destroy;

          }.bind(this)
        });
        this.fuentes4Tween = this.tweens.add({
          targets: this.Fuentes4,
          y: -300,
          ease: 'Power1',
          duration: 8000,
          delay: 1000,
          onComplete: function () {
            this.fuentes4Tween.destroy;

          }.bind(this)
        });
        this.fuentes5Tween = this.tweens.add({
          targets: this.Fuentes5,
          y: -200,
          ease: 'Power1',
          duration: 8000,
          delay: 1000,
          onComplete: function () {
            this.fuentes5Tween.destroy;

          }.bind(this)
        });
        this.fuentes6Tween = this.tweens.add({
          targets: this.Fuentes6,
          y: -100,
          ease: 'Power1',
          duration: 8000,
          delay: 1000,
          onComplete: function () {
            this.fuentes6Tween.destroy;

          }.bind(this)
        });

       
         
        this.hechoPorTween = this.tweens.add({
          targets: this.hechoPor,
          y: -700,
          ease: 'Power1',
          duration: 8000,
          delay: 1000,
          onComplete: function () {
            this.hechoPorTween.destroy;
          }.bind(this)
        });
        this.fuentes1Tween = this.tweens.add({
          targets: this.Fuentes1,
          y: -600,
          ease: 'Power1',
          duration: 8000,
          delay: 1000,
          onComplete: function () {
            this.fuentes1Tween.destroy;

          }.bind(this)
        });
        this.fuentes2Tween = this.tweens.add({
          targets: this.Fuentes2,
          y: -500,
          ease: 'Power1',
          duration: 8000,
          delay: 1000,
          onComplete: function () {
            this.fuentes2Tween.destroy;

          }.bind(this)
        });

        this.fuentes3Tween = this.tweens.add({
          targets: this.Fuentes3,
          y: -400,
          ease: 'Power1',
          duration: 8000,
          delay: 1000,
          onComplete: function () {
            this.fuentes3Tween.destroy;

          }.bind(this)
        });
        this.fuentes4Tween = this.tweens.add({
          targets: this.Fuentes4,
          y: -300,
          ease: 'Power1',
          duration: 8000,
          delay: 1000,
          onComplete: function () {
            this.fuentes4Tween.destroy;

          }.bind(this)
        });
        this.fuentes5Tween = this.tweens.add({
          targets: this.Fuentes5,
          y: -200,
          ease: 'Power1',
          duration: 8000,
          delay: 1000,
          onComplete: function () {
            this.fuentes5Tween.destroy;

          }.bind(this)
        });
        this.fuentes6Tween = this.tweens.add({
          targets: this.Fuentes6,
          y: -100,
          ease: 'Power1',
          duration: 8000,
          delay: 1000,
          onComplete: function () {
            this.fuentes6Tween.destroy;

          }.bind(this)
        });

        
         
        this.hechoPorTween = this.tweens.add({
          targets: this.hechoPor,
          y: -700,
          ease: 'Power1',
          duration: 8000,
          delay: 1000,
          onComplete: function () {
            this.hechoPorTween.destroy;

          }.bind(this)
        });
        this.fuentes1Tween = this.tweens.add({
          targets: this.Fuentes1,
          y: -600,
          ease: 'Power1',
          duration: 8000,
          delay: 1000,
          onComplete: function () {
            this.fuentes1Tween.destroy;

          }.bind(this)
        });
        this.fuentes2Tween = this.tweens.add({
          targets: this.Fuentes2,
          y: -500,
          ease: 'Power1',
          duration: 8000,
          delay: 1000,
          onComplete: function () {
            this.fuentes2Tween.destroy;

          }.bind(this)
        });

        this.fuentes3Tween = this.tweens.add({
          targets: this.Fuentes3,
          y: -400,
          ease: 'Power1',
          duration: 8000,
          delay: 1000,
          onComplete: function () {
            this.fuentes3Tween.destroy;

          }.bind(this)
        });
        this.fuentes4Tween = this.tweens.add({
          targets: this.Fuentes4,
          y: -300,
          ease: 'Power1',
          duration: 8000,
          delay: 1000,
          onComplete: function () {
            this.fuentes4Tween.destroy;

          }.bind(this)
        });
        this.fuentes5Tween = this.tweens.add({
          targets: this.Fuentes5,
          y: -200,
          ease: 'Power1',
          duration: 8000,
          delay: 1000,
          onComplete: function () {
            this.fuentes5Tween.destroy;

          }.bind(this)
        });
        this.fuentes6Tween = this.tweens.add({
          targets: this.Fuentes6,
          y: -100,
          ease: 'Power1',
          duration: 8000,
          delay: 1000,
          onComplete: function () {
            this.fuentes6Tween.destroy;

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