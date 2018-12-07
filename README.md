# Node.js MongoDB Web server

## nodejs_web_service/  
A Node.js MongoDB web server that implements a REST API.
* In order to run the server against a locally installed MongoDB :
 1. Replace the db_url and port values in nodejs_web_service/mongodb_server.js :
 > var db_url = "mongodb://localhost:27017/";  
 > const port = 8080;
 2. Do :
 > cd nodejs_web_service/  
 > npm start
* In order to run the server Docker container against a MongoDB Docker container :
 1. Replace the db_url and port values in nodejs_web_service/mongodb_server.js :
 > var db_url = "mongodb://<local_ip_address>:27017/";
 > const port = 8080;  

 For example, if the local IP address is 192.168.0.21 :

 > var db_url = "mongodb://192.168.0.21:27017/";
 3. Change the docker files (docker-compose.yml and Dockerfile) accordingly (port 8080) ;  
 2. Do :
 > docker-compose up
* In order to make the Docker images for AWS, I used my EC2 instance public DNS,  
  and I used the port 80 (and changed the docker files accordingly) :
 > var db_url = "mongodb://ec2-18-220-24-81.us-east-2.compute.amazonaws.com:27017/";  
 > const port = 80;

## unitary_test/  
Newman REST API unitary tests for the MongoDB web server.  
* In order to test a locally running Web service, replace the test in unitary_test/package.json :  
 > "test": "newman run test.json"
* In order to test the AWS Web service, I replaced the test in unitary_test/package.json :  
 > "test": "newman run test-aws.json"
In any case, once the server is running , run the test with :
> cd unitary_test/  
> npm test

## Postman embedded test
[![Run in Postman](https://run.pstmn.io/button.svg)](https://app.getpostman.com/run-collection/c8affd3a389a17b0863a)

