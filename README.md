# Node.js MongoDB Web server

nodejs_web_service/  
A Node.js MongoDB web server that implements a REST API.
* In order to run the server against a locally installed MongoDB :
 1. Replace the db_url value in nodejs_web_service/mongodb_server.js :
 > var db_url = "mongodb://localhost:27017/";
 2. Do :
 > cd nodejs_web_service/  
 > npm start
* In order to run the server Docker container against a MongoDB Docker container :
 1. Replace the db_url value in nodejs_web_service/mongodb_server.js :
 > var db_url = "mongodb://<local_ip_address>:27017/";
 For example, if the local IP address is 192.168.0.21 :
 > var db_url = "mongodb://192.168.0.21:27017/";
 2. Do :
 > docker-compose up

unitary_test/  
Newman REST API unitary tests for the MongoDB web server.  
Once the server is running (with or without Docker), run the test with :
> cd unitary_test/  
> npm test
