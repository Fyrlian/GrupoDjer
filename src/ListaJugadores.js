class ListaJugadores extends Phaser.Scene {

    constructor(){

        super({ key: "listaJugadores" });
    }

    
    preload(){

        
    }
    create(){
        this.add.image(config.width/2,config.height/3,'chat');
        this.add.image(config.width/2,config.height/1.5,'chat');
        this.add.image(config.width/2,config.height/3,'chat');
        this.add.image(config.width/2,config.height/1.5,'chat');
        this.add.image(config.width/2,config.height/3,'chat');
        this.add.image(config.width/2,config.height/1.5,'chat');
        this.add.image(config.width/2,config.height/3,'chat');
        this.add.image(config.width/2,config.height/1.5,'chat');

        this.textPlayer1 = this.add.bitmapText(config.width/2.17,config.height/2.5,'fuentes3',("Player 1: "),15);
        this.textPlayer2 = this.add.bitmapText(config.width/2.17,config.height/1.38,'fuentes3',("Player 2: "),15);
        this.caraPlayer1=this.add.image(config.width/2,config.height/3, 'icono2');
        this.caraPlayer2=this.add.image(config.width/2,config.height/1.5, 'icono1');

 
        

    }
    update(){
       
        /*
//CERRAMOS LISTA TOCANDO ALT
        this.input.keyboard.on("keydown_ALT",() =>{
        if( listaJugAbierta== true){
            console.log("adasdasdasd")
            this.scene.stop('listaJugadores');
            listaJugAbierta= false;
        }

    })
    */
    




    }
}

