package hola;

import java.io.BufferedReader;
import java.io.BufferedWriter;
import java.io.File;
import java.io.FileReader;
import java.io.FileWriter;
import java.util.Stack;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;


@RestController
public class ControladorChat {


	private File archivo = new File ("../hola/src/main/resources/chat.txt");
	
	
	@RequestMapping(value = "/mensaje", method = RequestMethod.PUT)
	
	public ResponseEntity<Boolean> introucirMensaje(@RequestBody String mensaje){
		
		 try {
			 

			 FileWriter fw = new FileWriter (archivo,true);
			 BufferedWriter bw = new BufferedWriter(fw);

	         bw.write(mensaje + "\n");
	         bw.close();
	      }
	      catch(Exception e){
	         e.printStackTrace();
	         return new ResponseEntity<Boolean>(true, HttpStatus.NOT_IMPLEMENTED);
	      }
		
		
		return new ResponseEntity<Boolean>(true, HttpStatus.CREATED);
	}
	
	
	

		@RequestMapping(value = "/mensaje", method = RequestMethod.GET)
		
		public String getMensaje(){
			
			
			try {

				FileReader fr = new FileReader (archivo);
				BufferedReader br = new BufferedReader(fr);
				
				String mensaje = "";
				String aux = br.readLine();	
				while(aux != null) {
					
					mensaje = aux;
					aux = br.readLine();
					
				}
				br.close();
				return mensaje;
		      }
		      catch(Exception e){
		         e.printStackTrace();
		         
		      }
			return null;
		
			
		}
		
	@RequestMapping(value = "/chat", method = RequestMethod.GET)
		
		public String[] getChat(){
			
			int numMensajes = 10;
			String[] chat = new String[numMensajes];
			
			//guardamos todos los mensajes del chat en una pila
			Stack<String> pilaAux = new Stack<String>();
			
			try {

				FileReader fr = new FileReader (archivo);
				BufferedReader br = new BufferedReader(fr);
				

				
				String aux = br.readLine();	
				while(aux != null) {
					
					pilaAux.add(aux);
					aux = br.readLine();
					
					
				}
				
				
				//introducimos los ultimos en nuestro array
				String mensaje = "";
				for(int i = 0; i < numMensajes; i++) {
					
					mensaje = pilaAux.pop();
					chat[numMensajes - 1 - i] = mensaje;
					
				}
				
				
				
				br.close();
				return chat;
		      }
		      catch(Exception e){
		         e.printStackTrace();
		         
		      }
			return null;
		
			
		}
	
}
