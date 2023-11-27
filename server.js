// required imports 
const http = require('http'); // http protocol used for server 
const app = require('./app'); // importing app to ensure it runs via this server

const port = process.env.PORT || 3000; // can supply port via .env file or use 3000

const server = http.createServer(app); // Pass the Express app to createServer

// confirms when server is running in the console
server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});