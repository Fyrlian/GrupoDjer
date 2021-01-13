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



 var auxPlayers = new Array(2); 
 JSON.stringify(data);
         
 data.toString().replace("[","");
 data.toString().replace("]","");

    
    auxPlayers[i] = data.toString().split(",")[i];

    //EL JUGADOR1 EXISTE
    if(auxPlayers[0] != null){
        that.textPlayer1.setText("Player 1: "+ auxPlayers[0]);
        this.equisPlayer1.setVisible(false);

        
    //EL JUGADOR1 NO EXISTE
    }else{
        this.equisPlayer1.setVisible(true);
    }

    
    //EL JUGADOR2 EXISTE
    if(auxPlayers[1] != null){
        that.textPlayer2.setText("Player 2: "+ auxPlayers[1]);
        this.equisPlayer2.setVisible(false);


    //EL JUGADOR2 NO EXISTE
    }else{
        this.equisPlayer1.setVisible(true);
    }

    
   
 
 
})//FIN GETT+++++++++++++++++++++++++++++++++++++++++++++++++++++++++






    }
}

