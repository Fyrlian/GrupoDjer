package hola;

import java.io.BufferedReader;
import java.io.BufferedWriter;
import java.io.FileReader;
import java.io.FileWriter;
import java.io.File;

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
	
	public ResponseEntity<Integer> addCuenta(@RequestBody Cuenta cuenta){
	
	int jugadorConect = -1;
		
		if(conectadas[0] == null) {
			conectadas[0] = cuenta; 
			jugadorConect = 1;
			return new ResponseEntity<Integer>(jugadorConect, HttpStatus.CREATED);
		}else if(conectadas[1] == null) {
			conectadas[1] = cuenta; 
			jugadorConect = 2;
			return new ResponseEntity<Integer>(jugadorConect, HttpStatus.CREATED);
		}else
			return new ResponseEntity<Integer>(jugadorConect, HttpStatus.NOT_IMPLEMENTED);
		
	}
	
@RequestMapping(value = "/conectado", method = RequestMethod.GET)

public Cuenta[] getConectadas(){
	
	return conectadas;

}

@RequestMapping(value = "/conectado", method = RequestMethod.DELETE)

public ResponseEntity<Boolean> borrarConectada(@RequestBody Cuenta cuenta){
	
	if(conectadas[0]!= null && conectadas[0].usuario.equals(cuenta.usuario)) {
		
		conectadas[0] = null; 
		return new ResponseEntity<Boolean>(true, HttpStatus.ACCEPTED);

	}else if(conectadas[1]!= null && conectadas[1].usuario.equals(cuenta.usuario)) {
		conectadas[1] = null; 
		return new ResponseEntity<Boolean>(true, HttpStatus.ACCEPTED);

	}else
		return new ResponseEntity<Boolean>(false, HttpStatus.NOT_IMPLEMENTED);
	}
	
}
