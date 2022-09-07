package com.springboot;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.ComponentScan;

@ComponentScan(basePackages = {"user.*", "myworld.*", "hello.*"})
@SpringBootApplication
public class YeonsooprojectApplication {

	public static void main(String[] args) {
		SpringApplication.run(YeonsooprojectApplication.class, args);
	}

}
