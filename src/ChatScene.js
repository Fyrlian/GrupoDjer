class ChatScene extends Phaser.Scene {

    constructor(){

        super({ key: "chatScene" });
    }

    
    preload(){}
    create(){
        this.add.image(config.width/8.12,config.height/1.5,'chat');
        contenidoChat = 1;
        var element = document.getElementById("divChat");
        
        //element.style.position = "absolute";

        this.text = this.add.bitmapText(config.width/3.15, config.height/1.5,'fuentes3',('Chat: '+ contenidoChat),32);

        this.formUtil = new FormUtil({scene:this,rows:35,cols:20});
        //this.formUtil.showNumbers();

        this.formUtil.placeElementAt(500, "divChat", true, false);
      

 //ENVIAR MENSAJE
        
            //AQUI ENVIAMOS AL SERVIDOR
           // that.scene.start("sceneMenu"); 
            //element.style.display = "none";
        
            document.getElementById('divChat').onkeydown = function(e){
                if(e.keyCode == 13){
                  console.log("ENVIO MENSAJE");


                  var auxValorChat = document.getElementById("chatButton").value = (""); //guardamos el texto que se desea enviar
                  document.getElementById("chatButton").value = ("");  //booramos el contenido del chat

                }
     


                
             };
             //cerrar el caht
             this.input.keyboard.on("keydown_T",() =>{

                element.style.display = "none";

             })



        
        //this.formUtil.setStyle('
        element.style.display = "inline-block";
       // this.text = this.add.bitmapText(config.width/3.15, config.height/1.5,'fuentes3',('Chat: '+ contenidoChat),32);
    }
    update(){
contenidoChat++;

//ACTUALIZAMOS EL CHAT
      this.text.setText('Chat: '+ contenidoChat);

    }

}