package hola;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class ControladorEstadoJuego {
	
	
	@RequestMapping(value = "/juego", method = RequestMethod.GET)

	public ResponseEntity<Boolean> getEstado(){
		
		return new ResponseEntity<Boolean>(true, HttpStatus.OK);

	}
	
	
}
