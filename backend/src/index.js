const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const routes = require('./routes.js');

const mongoParams = require('../mongo-params.json');

mongoose.connect(mongoParams.stringConnection,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
  });

const app = express();

app.use(cors());
app.use(express.json());
app.use(routes);


app.listen('3333');