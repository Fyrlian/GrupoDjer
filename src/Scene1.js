class Scene1 extends Phaser.Scene {

    constructor(){

        super({ key: "sceneLogoCarga" });
    }
    preload(){
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
    }
    create(){
        this.background=this.add.image(960, 540, 'logoHWK');

        /*
    var progressBar = this.add.graphics();
  var progressBox = this.add.graphics();
  progressBox.fillStyle(0x222222, 0.8);
  progressBox.fillRect(240, 270, 320, 50);
 
  var width = this.cameras.main.width;
  var height = this.cameras.main.height;
  var loadingText = this.make.text({
    x: width / 2,
    y: height / 2 - 50,
    text: 'Loading...',
    style: {
      font: '20px monospace',
      fill: '#ffffff'
    }
  });
  loadingText.setOrigin(0.5, 0.5);
 
  var percentText = this.make.text({
    x: width / 2,
    y: height / 2 - 5,
    text: '0%',
    style: {
      font: '18px monospace',
      fill: '#ffffff'
    }
  });
  percentText.setOrigin(0.5, 0.5);
 
  var assetText = this.make.text({
    x: width / 2,
    y: height / 2 + 50,
    text: '',
    style: {
      font: '18px monospace',
      fill: '#ffffff'
    }
  });
  assetText.setOrigin(0.5, 0.5);
 
  // update progress bar
  this.load.on('progress', function (value) {
    percentText.setText(parseInt(value * 100) + '%');
    progressBar.clear();
    progressBar.fillStyle(0xffffff, 1);
    progressBar.fillRect(250, 280, 300 * value, 30);
  });
 
  // update file progress text
  this.load.on('fileprogress', function (file) {
    assetText.setText('Loading asset: ' + file.key);
  });
 
  // remove progress bar when complete
  this.load.on('complete', function () {
    progressBar.destroy();
    progressBox.destroy();
    loadingText.destroy();
    percentText.destroy();
    assetText.destroy();
  });
  */
 //this.scene.start('sceneGame');
 this.ready();
 this.timedEvent = this.time.delayedCall(3000, this.ready, [], this);  
       
    }
    update(){}

    //NO SE SI FUNCIONA2
init () {
  this.readyCount = 0;
}
 
ready () {
  this.readyCount++;
  if (this.readyCount === 2) {
    this.scene.start('sceneMenu');
  }
}




}//FIN CLASE

        //
