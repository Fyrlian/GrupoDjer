class LoginScene extends Phaser.Scene {

    constructor(){

        super({ key: "loginScene" });
    }
    preload(){

        
    }
    create(){
	    this.cameras.main.fadeIn(1000);
that = this;
        
        this.bg=this.add.image(config.width/2,config.height/2, 'fondoLogin');

        //var text = this.add.text(10, 10, 'Please login to play', { color: 'white', fontFamily: 'Arial', fontSize: '32px '});
        var text = this.add.bitmapText(config.width/2.65, config.height/2.7,'fuentes',('log  to  play'),64);
     


        //COLOCAMOS EL FORMULARIO

        //var element = this.add.dom(400, 600).createFromCache('formularioLogin');
          element = document.getElementById("div");
        //element.style.position = "absolute";
        this.formUtil = new FormUtil({scene:this,rows:12,cols:20});
        //this.formUtil.showNumbers();

        this.formUtil.placeElementAt(107.25, "div", false, false);
        //this.formUtil.addChangeCallback("div", this.textAreaChanged, this);
        //this.formUtil.setStyle('
        element.style.display = "inline-block";

//Cuando tocamos el boton-----------------------------------------------------------------------------------------
function processForm(e) {
    if (e.preventDefault) e.preventDefault();

    /* do what you want with the form */




    //guardamos el usuario
    nombreUsuario = document.getElementById("nombreUsuarioForm").value;


        element.style.display = "none";


        //Enviamos informacion de usuario
    var auxContraseña = document.getElementById("contraseñaForm").value;

    $.ajax({
        method: "PUT",
            url: "http://localhost:8080/cuenta",
            //url: "https://lastnightfall-landing.herokuapp.com/cuenta",
        data: JSON.stringify({usuario : nombreUsuario,contrasena: auxContraseña}),
        processData: false,
        headers: {
        "Content-type":"application/json"
        }
        }).done(function(data, textStatus, jqXHR) {

            if(data == true){

                that.scene.start("sceneMenu");

            }else{
            	 //COLOCAMOS EL FORMULARIO

        //var element = this.add.dom(400, 600).createFromCache('formularioLogin');
          element = document.getElementById("div");
        //element.style.position = "absolute";
        this.formUtil = new FormUtil({scene:this,rows:12,cols:20});
        //this.formUtil.showNumbers();

        this.formUtil.placeElementAt(107.25, "div", false, false);
        //this.formUtil.addChangeCallback("div", this.textAreaChanged, this);
        //this.formUtil.setStyle('
        element.style.display = "inline-block";
                alert("Contraseña incorrecta");
            }
            

        }).fail(function(data, textStatus, jqXHR){

        });

        // You must return false to prevent the default form behavior
        return false;
    }

    var form = document.getElementById('formulario');
    if (form.attachEvent) {
        form.attachEvent("submit", processForm);
    } else {
        form.addEventListener("submit", processForm);
}

//----------------------------------------------------------------------------------------------------------------
//this.boton.setAttribute("onclick", alert("blabla"));





    }

    textAreaChanged() {
        var text = this.formUtil.getTextAreaValue("area51");

    }

    update(){
	




        //this.scene.start('sceneMenu');


    }

}
