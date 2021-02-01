package hola;

import java.io.BufferedReader;
import java.io.BufferedWriter;
import java.io.File;
import java.io.FileReader;
import java.io.FileWriter;
import java.io.InputStream;
import java.util.Stack;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;


@RestController
public class ControladorChat {

	
	File archivo = new File("chat.txt");
	//private File archivo = new File ("/hola/src/main/resources/chat.txt");
	
	
	@RequestMapping(value = "/mensaje", method = RequestMethod.PUT)
	
	public ResponseEntity<Boolean> introucirMensaje(@RequestBody Mensaje mensaje){
		
		 try {
			 

			 FileWriter fw = new FileWriter (archivo,true);
			 BufferedWriter bw = new BufferedWriter(fw);

			 bw.write(mensaje.usuario + "\n");
	         bw.write(mensaje.texto + "\n");
	         bw.close();
	      }
	      catch(Exception e){
	         e.printStackTrace();
	         return new ResponseEntity<Boolean>(false, HttpStatus.NOT_IMPLEMENTED);
	      }
		
		
		return new ResponseEntity<Boolean>(true, HttpStatus.CREATED);
	}
	
	
	

		@RequestMapping(value = "/mensaje", method = RequestMethod.GET)
		
		public String getMensaje(){
			
			//guardamos todos los mensajes y sus emisores del chat en una pila
			Stack<String> pilaAux = new Stack<String>();
			
			try {

				FileReader fr = new FileReader (archivo);
				BufferedReader br = new BufferedReader(fr);
				
				String aux = br.readLine();	
				while(aux != null) {
					
					pilaAux.add(aux);
					aux = br.readLine();
					
					
				}
				
				aux = pilaAux.pop();
				String mensaje = "";
				if(!pilaAux.isEmpty())
					mensaje = pilaAux.pop() + ": " + aux;
				
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
			
			int numMensajes = 6;
			String[] chat = new String[numMensajes];
			
			//guardamos todos los mensajes del chat en una pila
			Stack<String> pilaTexto = new Stack<String>();
			//guardamos todos los jugadores del chat en una pila
			Stack<String> pilaUsuario = new Stack<String>();
			
		
			try {

				FileReader fr = new FileReader (archivo);
				BufferedReader br = new BufferedReader(fr);
				
				int numLinea = 0;//para controlar si nos encontramos en una linea par o impar
				
				//usamos un bucle para guardar toda la conversacion en las pilas
				String aux = br.readLine();	
				while(aux != null) {
					numLinea++;
					if(numLinea % 2 == 0) {
						pilaTexto.add(aux);
					}else {
						pilaUsuario.add(aux);
					}
				
					
					aux = br.readLine();
				}
				
				//tratamos las pilas para ordenarlas correctamente en el array final
				boolean masDeNum = false;
				int numPequeno = 0;
				if(pilaTexto.size() < numMensajes) {//considera la opcion de que halla menos mensajes en el chat de los que consideramos
					masDeNum = true;
					numPequeno = pilaTexto.size();
					
				}
				//introducimos los ultimos en nuestro array
				String mensaje = "";
				for(int i = 0; i < numMensajes; i++) {
					
					if(masDeNum) {
						if(numPequeno > i) {
							mensaje = pilaUsuario.pop()+ ": " + pilaTexto.pop();
							chat[numMensajes - 1 - i] = mensaje;
						}
						
					}else {
						mensaje = pilaUsuario.pop()+ ": " + pilaTexto.pop();
						chat[numMensajes - 1 - i] = mensaje;
					}
					
					
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
