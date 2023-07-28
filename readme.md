# Krysto-go Backend API 

## 1. General information

To start this project. In this documentation, we will see the method to launch the project easily.


## 2. Project 

- [NodeJS (**version 18.14**)](https://nodejs.org/en/)
- [Npm](https://www.npmjs.com/)

If you are working with several versions of NodeJS, we recommend you install [nvm](https://github.com/nvm-sh/nvm). This tool will allow you to easily manage your NodeJS versions.

### 2.2 Launching the project

- Fork the repository
- Clone it on your computer.
- The `npm -i` command will allow you to install the dependencies.
- The `npm run dev` command will allow you to run the micro API.


## 4. Endpoints

### 4.1 Possible endpoints

This project includes five endpoints that you will be able to use: 

- `http://localhost:8080/krysto-go/api/v1/collects` 
- `http://localhost:8080/krysto-go/api/v1/auth` 
- `http://localhost:8080/krysto-go/api/v1/collectpoints`  
- `http://localhost:8080/krysto-go/api/v1/messages` 
- `http://localhost:8080/krysto-go/api/v1/collects` - should be authenticated in user by role = Admin




### 4.2 Examples of queries



### USER 1 role: Admin
	    "email": "admin@gmail.com",
		"password": "123456" 

		
### USER 2 role: PARTNER
		"email": "partner@gmail.com"
		"password": "123456"


### USER 3 role: STAFF
		"email": "staff@gmail.com",
		"password": "123456"

	
	
