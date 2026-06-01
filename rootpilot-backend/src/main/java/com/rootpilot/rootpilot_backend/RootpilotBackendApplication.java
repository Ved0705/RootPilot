package com.rootpilot.rootpilot_backend;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class RootpilotBackendApplication {

	public static void main(String[] args) {

		System.out.println("TIMEZONE = " +
				java.util.TimeZone.getDefault().getID());

		SpringApplication.run(RootpilotBackendApplication.class, args);
	}

}