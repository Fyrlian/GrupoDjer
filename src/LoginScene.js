class LoginScene extends Phaser.Scene {

    constructor(){

        super({ key: "loginScene" });
    }
    preload(){

        //HTML
        this.load.html('formularioLogin', 'formularioLogin.html');
        
    }
    create(){
that = this;
        
        this.bg=this.add.image(config.width/2,config.height/2, 'fondoLogin');

        //var text = this.add.text(10, 10, 'Please login to play', { color: 'white', fontFamily: 'Arial', fontSize: '32px '});
        var text = this.add.bitmapText(config.width/2.65, config.height/1.8,'fuentes',('log  to  play'),64);
     


        //COLOCAMOS EL FORMULARIO

        //var element = this.add.dom(400, 600).createFromCache('formularioLogin');
          element = document.getElementById("div");
        //element.style.position = "absolute";
        this.formUtil = new FormUtil({scene:this,rows:12,cols:20});
        //this.formUtil.showNumbers();

        this.formUtil.placeElementAt(147.5, "div", false, false);
        //this.formUtil.addChangeCallback("div", this.textAreaChanged, this);
        //this.formUtil.setStyle('
        element.style.display = "inline-block";

//Cuando tocamos el boton--------------------------------------------------------------------------------
    document.getElementById("loginButton").onclick = function(){



//guardamos el usuario
nombreUsuario = document.getElementById("nombreUsuarioForm").value;
console.log(nombreUsuario);

    that.scene.start("sceneMenu");
    element.style.display = "none";
    

    //Enviamos informacion de usuario
var auxContraseña = document.getElementById("contraseñaForm").value;
    
$.ajax({
    method: "PUT",
    url:"http://localhost:8080/cuenta",
    data: JSON.stringify({usuario : nombreUsuario,contrasena: auxContraseña}),
    processData: false,
    headers: {
    "Content-type":"application/json"
    }
    }).done(function(data, textStatus, jqXHR) {
   // console.log(textStatus+" "+jqXHR.statusCode());
    }).fail(function(data, textStatus, jqXHR){
    //console.log(textStatus+" "+jqXHR.statusCode());
    });


};//----------------------------------------------------------------------------------------------------------------
//this.boton.setAttribute("onclick", alert("blabla"));





    }

    textAreaChanged() {
        var text = this.formUtil.getTextAreaValue("area51");
        console.log(text);
    }

    update(){





        //this.scene.start('sceneMenu');


    }

}