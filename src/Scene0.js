class Scene0 extends Phaser.Scene {

    constructor(){

        super({ key: "sceneBoot" });
    }
    preload(){

        
        this.load.image('logoHWK','../assets/logoHWK.png');
   
    }
    create(){
        this.scene.start("sceneLogoCarga");
    }
    update(){}
}