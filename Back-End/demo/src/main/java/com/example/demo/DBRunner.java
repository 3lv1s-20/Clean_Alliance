package com.example.demo;

import com.example.demo.model.*;
import com.example.demo.repository.*;
import java.math.BigDecimal;
import java.util.Iterator;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;


@Component
public class DBRunner implements CommandLineRunner{
	@Autowired 
	private UserRepository userRepository;

	
	@Override
	 public void run(String... args) throws Exception {
		userRepository.deleteAll();
		
		User newUser = new User("Alex", "alex@sample.com", "Essex", 120, "alex_pass");
		userRepository.save(newUser);

		
	}
}
