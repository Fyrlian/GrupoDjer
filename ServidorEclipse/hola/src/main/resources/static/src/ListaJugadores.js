class ListaJugadores extends Phaser.Scene {

    constructor(){

        super({ key: "listaJugadores" });
    }

    
    preload(){

        
    }
    create(){
        that3 = this;
        this.add.image(config.width/2,config.height/3,'chat');
        this.add.image(config.width/2,config.height/1.5,'chat');
        this.add.image(config.width/2,config.height/3,'chat');
        this.add.image(config.width/2,config.height/1.5,'chat');
        this.add.image(config.width/2,config.height/3,'chat');
        this.add.image(config.width/2,config.height/1.5,'chat');
        this.add.image(config.width/2,config.height/3,'chat');
        this.add.image(config.width/2,config.height/1.5,'chat');

        this.textPlayer1 = this.add.bitmapText(config.width/2.17,config.height/2.5,'fuentes2',("Player 1: "),30);
        this.textPlayer2 = this.add.bitmapText(config.width/2.17,config.height/1.38,'fuentes2',("Player 2: "),30);
        this.caraPlayer1=this.add.image(config.width/2,config.height/3, 'icono2');
        this.caraPlayer2=this.add.image(config.width/2,config.height/1.5, 'icono1');
        this.equisPlayer1=this.add.image(config.width/1.97,config.height/3, 'equis');
        this.equisPlayer2=this.add.image(config.width/1.97,config.height/1.5, 'equis');
 

    }
    update(){
       


//GET PARA LOS MENSAJES++++++++++++++++++++++++++++++++++++++++++++
$.ajax({

    url: "http://localhost:8080/conectado"
}).then(function(data) {

   
    //EL JUGADOR1 EXISTE
    if(data[0] != null){
        that3.textPlayer1.setText("Player 1: "+ data[0].usuario);
        that3.equisPlayer1.setVisible(false);

        
    //EL JUGADOR1 NO EXISTE
    }else{
        that3.equisPlayer1.setVisible(true);
    }

    
    //EL JUGADOR2 EXISTE
    
    if(data[1] != null){
        that3.textPlayer2.setText("Player 2: "+ data[1].usuario);
        that3.equisPlayer2.setVisible(false);


    //EL JUGADOR2 NO EXISTE
    }else{
        that3.equisPlayer2.setVisible(true);
    }

    
   
 
 
})//FIN GETT+++++++++++++++++++++++++++++++++++++++++++++++++++++++++






    }
}

