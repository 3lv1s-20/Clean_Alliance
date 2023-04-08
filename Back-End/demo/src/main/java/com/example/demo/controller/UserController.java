package com.example.demo.controller;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.dto.UserPostDTO;
import com.example.demo.model.User;
import com.example.demo.service.UserService;


@RestController 
@CrossOrigin("http://localhost:3000")
public class UserController {
	
	@Autowired
	UserService userService;


	// Get All Users
    @GetMapping("/user")
    public List<User> getUsers() {
        return userService.getUsers();
    }
    
    @PostMapping("/user")
    public ResponseEntity<Optional<User>> addUser(@RequestBody UserPostDTO newUserDTO) {
    	
    	if (newUserDTO.getName()==null || 
    		newUserDTO.getEmail()==null ||
    		newUserDTO.getLocation()==null ||
    		newUserDTO.getPoints()==null ||
    		newUserDTO.getPassword()==null) {
            return new ResponseEntity<>(Optional.ofNullable(null), HttpStatus.BAD_REQUEST);
        }
    	
    	User newUser = new User(newUserDTO.getName(), newUserDTO.getEmail(), newUserDTO.getLocation(), newUserDTO.getPoints(),    			
    	newUserDTO.getPassword());
    	userService.addUser(newUser);
    	return new ResponseEntity<>(Optional.ofNullable(newUser),HttpStatus.CREATED);

    }
	 
    
    // Get User by ID
    @GetMapping("/user/{id}")
    public Optional<User> getUserById(@PathVariable(value = "id") long Id) {
        return userService.findByID(Id);
    }
    
    
    //Delete a User by ID
    @DeleteMapping("/user/{id}")
    public String deleteUser(@PathVariable(value = "id") long Id) {
        userService.deleteUser(Id);
        return "User Deleted"; 
    }
    
    //Get User by Email
    @GetMapping("/user/findByEmail")
    public Optional<User> getUserByEmail(@RequestParam String email) {
    	return Optional.ofNullable(userService.findByEmail(email));
    }
    
    @PutMapping("/user/{id}")
    public ResponseEntity<User> updateUserById(@RequestBody User newUser, @PathVariable Long id) {
        Optional<User> optionalUser = userService.findByID(id);
        if (optionalUser.isPresent()) {
            User existingUser = optionalUser.get();
            existingUser.setName(newUser.getName());
            existingUser.setEmail(newUser.getEmail());
            existingUser.setLocation(newUser.getLocation());
            existingUser.setPoints(newUser.getPoints());
            existingUser.setPassword(newUser.getPassword());
            userService.addUser(existingUser);
            return new ResponseEntity<>(existingUser, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

//    User updateUser(@RequestBody User newUser, @PathVariable Long id) {
//        return userRepository.findById(id)
//                .map(user -> {
//                    user.setUsername(newUser.getUsername());
//                    user.setName(newUser.getName());
//                    user.setEmail(newUser.getEmail());
//                    return userRepository.save(user);
//                }).orElseThrow(() -> new UserNotFoundException(id));
//    }

}
