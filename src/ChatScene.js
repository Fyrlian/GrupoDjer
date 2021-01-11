class ChatScene extends Phaser.Scene {

    constructor(){

        super({ key: "chatScene" });
    }

    
    preload(){}
    create(){
        that = this;

        this.add.image(config.width/8.12,config.height/1.5,'chat');
        var element = document.getElementById("divChat");
        
        //element.style.position = "absolute";

        this.text = this.add.bitmapText(config.width/1900, config.height/1.75,'fuentes3',(""),15);

        this.formUtil = new FormUtil({scene:this,rows:35,cols:20});
        //this.formUtil.showNumbers();

        this.formUtil.placeElementAt(500, "divChat", true, false);
      

 //ENVIAR MENSAJE-------------------------------------------------------------------------------------------------------------
        
            //AQUI ENVIAMOS AL SERVIDOR
           // that.scene.start("sceneMenu"); 
            //element.style.display = "none";
        

            function processForm(e) {
                if (e.preventDefault) e.preventDefault();
            
                
            
               // if(e.keyCode == 13){
                    console.log("ENVIO MENSAJE");
  
  
                    var auxValorChat = document.getElementById("chatButton").value; //guardamos el texto que se desea enviar
                    document.getElementById("chatButton").value = ("");//booramos el contenido del chat
                    
  
  
                    //ENVIAMOS MENSAJE
  
                    $.ajax({
                      method: "PUT",
                      url:"http://localhost:8080/mensaje",
                      data: JSON.stringify({texto: auxValorChat,usuario : nombreUsuario}),
                      processData: false,
                      headers: {
                      "Content-type":"application/json"
                      }
                      }).done(function(data, textStatus, jqXHR) {
                     // console.log(textStatus+" "+jqXHR.statusCode());
                      }).fail(function(data, textStatus, jqXHR){
                      //console.log(textStatus+" "+jqXHR.statusCode());
                      });
  
                 // }
       
  
  
                  
            
            
                    // You must return false to prevent the default form behavior
                    return false;
                }


                var form = document.getElementById('formularioChat');
                if (form.attachEvent) {
                    form.attachEvent("submit", processForm);
                } else {
                    form.addEventListener("submit", processForm);
            }

            

            /*
            document.getElementById('divChat').onkeydown = function(e){
                if(e.keyCode == 13){
                  console.log("ENVIO MENSAJE");


                  var auxValorChat = document.getElementById("chatButton").value; //guardamos el texto que se desea enviar
                  document.getElementById("chatButton").value;  //booramos el contenido del chat
                  


                  //ENVIAMOS MENSAJE

                  $.ajax({
                    method: "PUT",
                    url:"http://localhost:8080/mensaje",
                    data: JSON.stringify({texto: auxValorChat,usuario : nombreUsuario}),
                    processData: false,
                    headers: {
                    "Content-type":"application/json"
                    }
                    }).done(function(data, textStatus, jqXHR) {
                   // console.log(textStatus+" "+jqXHR.statusCode());
                    }).fail(function(data, textStatus, jqXHR){
                    //console.log(textStatus+" "+jqXHR.statusCode());
                    });

                }
     


                
             } */
            ;//------------------------------------------------------------------------------------------------------




             //cerrar el caht
             this.input.keyboard.on("keydown_ESC",() =>{

                element.style.display = "none";

             })



        
        //this.formUtil.setStyle('
        element.style.display = "inline-block";
       // this.text = this.add.bitmapText(config.width/3.15, config.height/1.5,'fuentes3',('Chat: '+ contenidoChat),32);
    }
    update(){

//recogemos lista de mensajes
//GET PARA LOS MENSAJES
    $.ajax({

        url: "http://localhost:8080/chat"
    }).then(function(data) {
   
    that.text.setText("");//vaciamos el chat para actualizarlo

     var auxChat = new Array(6); 
     JSON.stringify(data);
             
     data.toString().replace("[","");
     data.toString().replace("]","");
     for(var i=0;i<6;i++){
        
        auxChat[i] = data.toString().split(",")[i];


        if(auxChat[i] != null){
            that.text.setText(that.text.text + auxChat[i]  + "\n");
        }
       
    }   
    
    
        
     
   
    
    
    })//FIN GETT



    
      // this.text.setText(auxChat1  + "\n" + auxChat2 + "\n" + auxChat3 + "\n" + auxChat4 + "\n" + auxChat5 + "\n" + auxChat6);
/*
if(auxChat1 != null){
    this.text.setText(auxChat1  + "\n");
}
if(auxChat2 != null){
    this.text.setText(auxChat2  + "\n");
}
if(auxChat3 != null){
    this.text.setText(auxChat3  + "\n");
}
if(auxChat4 != null){
    this.text.setText(auxChat4  + "\n");
}
if(auxChat5 != null){
    this.text.setText(auxChat5  + "\n");
}
if(auxChat6 != null){
    this.text.setText(auxChat6);
}
      */      

/*
        var auxChat = new Array(6); 
        for(var i=0;i<6;i++){

            if(auxChat[i]!=null){
                this.text.setText(auxChat[i]  + "\n");
            }
            
        }
  */              




}

}