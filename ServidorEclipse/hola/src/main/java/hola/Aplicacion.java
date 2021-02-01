package hola;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.ComponentScan;


@SpringBootApplication
@ComponentScan({"hola"})
public class Aplicacion {

	
	 public static void main(String[] args) {
	 SpringApplication.run(Aplicacion.class, args);
 
 }
 
}