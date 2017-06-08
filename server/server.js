const http = require('http');
const express = require('express');
const endpoints = require('./endpoints');

const app = express();
const port = 8080;
const server = http.createServer(app);

// Add headers
app.use((req, res, next) => {

  // Website you wish to allow to connect
  res.setHeader('Access-Control-Allow-Origin', '*');

  // Request methods you wish to allow
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

  // Request headers you wish to allow
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader('Access-Control-Allow-Credentials', true);

  // Pass to next layer of middleware
  next();
});

endpoints(app);

server.listen(port, (err) => {
  if (err) {
    console.error('Unable to listen for connections', err);
    process.exit(1);
  }
  console.log('running on port', port);
});
