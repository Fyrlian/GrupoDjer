package hola;

import java.io.BufferedReader;
import java.io.BufferedWriter;
import java.io.FileReader;
import java.io.FileWriter;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class ControladorConectados {

	Cuenta[] conectadas = new Cuenta[2];
	
	
	
@RequestMapping(value = "/conectado", method = RequestMethod.PUT)
	
	public ResponseEntity<Boolean> addCuenta(@RequestBody Cuenta cuenta){
		
		if(conectadas[0] == null) {
			conectadas[0] = cuenta; 
			return new ResponseEntity<Boolean>(true, HttpStatus.CREATED);
		}else if(conectadas[1] == null) {
			conectadas[1] = cuenta; 
			return new ResponseEntity<Boolean>(true, HttpStatus.CREATED);
		}else
			return new ResponseEntity<Boolean>(false, HttpStatus.NOT_IMPLEMENTED);
		
	}
	
@RequestMapping(value = "/conectados", method = RequestMethod.GET)

public Cuenta[] getConectadas(){
	
	return conectadas;

}
	
}
