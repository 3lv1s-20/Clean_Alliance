package com.example.demo.dto;

public class UserPostDTO {
	String name;
	String email;
	String location;
	Integer points;
	String password;
	
	public UserPostDTO(String name, String email, String location, Integer points ,String password) {
		this.name = name;
		this.email = email;
		this.location = location;
		this.points = points;
		this.password = password;
	}
	




	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}
	
	public String getLocation() {
		return location;
	}

	public void setLocation(String location) {
		this.location = location;
	}
	
	public Integer getPoints() {
		return points;
	}

	public void setPoints(Integer points) {
		this.points = points;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

}
