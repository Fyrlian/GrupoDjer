package hola;

import java.io.BufferedReader;
import java.io.BufferedWriter;
import java.io.File;
import java.io.FileReader;
import java.io.FileWriter;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class ControladorCuentas {

	File archivo = new File("usuarios.txt");
//private File archivo = new File ("/hola/src/main/resources/usuarios.txt");

	
	@RequestMapping(value = "/cuenta", method = RequestMethod.PUT)
	
	public ResponseEntity<Boolean> introucirCuenta(@RequestBody Cuenta cuenta){
		
		 try {
			 
			 FileWriter fw = new FileWriter (archivo,true);
			 BufferedWriter bw = new BufferedWriter(fw);
			 
			 FileReader fr = new FileReader (archivo);
			BufferedReader br = new BufferedReader(fr);

			boolean contraCorrecta = false; //ha introducido la contraseña correctamente
			int numLinea = 0;//sirve para comprobar tan solo las contraseñas (que se encuentran en los numeros impares)	
			 //antes de escribir compruebo que no esté creado ya el usuario
			boolean yaEsta = false;
			String aux = br.readLine();
			while(aux != null) {
				numLinea++;
				if(aux.equals(cuenta.usuario) && ((numLinea % 2) != 0)) {
					yaEsta = true;
					
					aux = br.readLine();
					
					if(aux != null && aux.equals(cuenta.contrasena)) {
						contraCorrecta = true;
					}
					
				};
				 
				aux = br.readLine();
			 }
			 
			if(!yaEsta) {//no estaba registrado y por tanto se registra y conmienza el juego (devuelve true) 
		         bw.write(cuenta.usuario + "\n");
		         bw.write(cuenta.contrasena + "\n");
		         
		         bw.close();
		         br.close();
		         return new ResponseEntity<Boolean>(true, HttpStatus.CREATED);
			}else {//estaba registrado, por tanto comienza el juego (devuelve true) en caso de haber 
																	//introducido correctamente la contrasena
				bw.close();
				br.close();
				
				if(contraCorrecta)//ha introcido bien la contrasena
				{
					return new ResponseEntity<Boolean>(true, HttpStatus.ACCEPTED);
				}else {
				
					return new ResponseEntity<Boolean>(false, HttpStatus.ACCEPTED);
					
				}

			}
	         
	         
	      }
	      catch(Exception e){
	         e.printStackTrace();
	         return new ResponseEntity<Boolean>(false, HttpStatus.NOT_IMPLEMENTED);
	      }
		

		
	}
	
	
	
	
}
