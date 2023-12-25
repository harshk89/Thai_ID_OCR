Clone the repository in you system
Then in terminal goto ./client/thai_id_ocr directory
run 'npm install' command in terminal to install all dependecies
Nor run the client with command 'npm start'

Now goto directory ./server
run npm install to install all dependencies
now run 'node index.js' command to start the server

Now both server and client are running
client is running on localhost on port 3000 and server is running on port 5000
In your browser goto 'localhost:3000' to access the web app
All requests from client will be handled by server running on port 5000.


Also create a .env file in './server' directory containing
PRIVATE_KEY = <your vision api private key>
CLIENT_EMAIL = <client email generated while generating vision api key>
CONNECTION_URL = <your mongoDB connection url>