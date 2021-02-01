package hola;


import java.util.ArrayList;
import java.util.List;

import org.apache.catalina.connector.Response;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class ControladorJugador {
	
	private Jugador[] jugadores = new Jugador[2];

	
	
	//get
	@RequestMapping(value = "/jugador/{id}", method = RequestMethod.GET) 
	
	public Jugador getJugador(@PathVariable ("id")int id){
		
		return jugadores[id];
		
	}
	
	//put
	@RequestMapping(value = "/jugador/{id}", method = RequestMethod.PUT)
	
	public ResponseEntity<Jugador> actualizarJugador(@RequestBody Jugador jugador, @PathVariable ("id")int id){
		
		if(jugadores[id] != null) {
			
			jugadores[id] = jugador;
			return new ResponseEntity<Jugador>(jugador, HttpStatus.OK);
			
		}
		
		else {return new ResponseEntity<Jugador>(HttpStatus.NOT_FOUND);}
				
		
	}
	
	//post
	@RequestMapping(value = "/jugador/{id}", method = RequestMethod.POST)
	
	public ResponseEntity<Jugador> introducirJugador(@RequestBody Jugador jugador, @PathVariable ("id")int id){
		
		jugadores[id] = jugador;
		
		return new ResponseEntity<Jugador>(jugador, HttpStatus.CREATED);
		
		
	}
	
	
}


	 

