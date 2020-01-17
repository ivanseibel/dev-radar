const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const routes = require('./routes.js');
const http = require('http');
const { setupWebsocket } = require('./websocket');

const mongoParams = require('../mongo-params.json');

mongoose.connect(mongoParams.stringConnection,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
  });

const app = express();
const server = http.Server(app);

setupWebsocket(server);

app.use(cors());
app.use(express.json());
app.use(routes);


server.listen('3333');