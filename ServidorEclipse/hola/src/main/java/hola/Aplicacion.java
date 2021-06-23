package hola;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.web.socket.config.annotation.EnableWebSocket;
import org.springframework.web.socket.config.annotation.WebSocketConfigurer;
import org.springframework.web.socket.config.annotation.WebSocketHandlerRegistry;







@SpringBootApplication
@ComponentScan({"hola"})
@EnableWebSocket
public class Aplicacion implements WebSocketConfigurer {


	@Override
	public void registerWebSocketHandlers(WebSocketHandlerRegistry registry) 
	{
		registry.addHandler(createHandlerController(), "/LastNightFall").setAllowedOrigins("*");
	}


	 @Bean
	 public WebsocketLastNightfallHandler createHandlerController() 
	 {
	       return new  WebsocketLastNightfallHandler();
	 }
	 
	 
	 public static void main(String[] args) 
	 {
	 SpringApplication.run(Aplicacion.class, args);
 
	 }
	 
	
	 
	 
 
}