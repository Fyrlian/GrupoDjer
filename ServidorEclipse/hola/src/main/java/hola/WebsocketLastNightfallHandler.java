package hola;


import java.io.IOException;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

import org.springframework.web.socket.CloseStatus;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;
import org.springframework.web.socket.handler.TextWebSocketHandler;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ObjectNode;


public class WebsocketLastNightfallHandler extends TextWebSocketHandler {
		
	private ObjectMapper mapeador = new ObjectMapper();
	private Map<String, WebSocketSession> sesiones = new ConcurrentHashMap<>();
	
	
	@Override
	public void afterConnectionEstablished(WebSocketSession session) throws Exception {
		sesiones.put(session.getId(), session);
	}
	
	@Override
	public void afterConnectionClosed(WebSocketSession session, CloseStatus status) throws Exception {
		sesiones.remove(session.getId());
	}
	
	
	@Override
	protected void handleTextMessage(WebSocketSession session,TextMessage message) throws Exception 
	{
		
		
JsonNode node = mapeador.readTree(message.getPayload());
		
		if(!node.get("nombre").asText().equals("posJugador"))
		{
			System.out.println("Message received: " + message.getPayload());
		}
//System.out.println("Message received: " + message.getPayload());
		
		
		for(WebSocketSession sessionPlayer : sesiones.values()) 
		{
			if(!sessionPlayer.getId().equals(session.getId())) 
            {
			
					 
					 synchronized (sessionPlayer) {
		                    sessionPlayer.sendMessage(message);
		                }
				 

				 }
                

            }
		}
		
		
		
	
		
		
		
		
}