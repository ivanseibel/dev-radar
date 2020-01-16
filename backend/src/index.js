const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const routes = require('./routes.js');

const mongoUser = 'ivan';
const mongoPass = 'XxWNCijCqLSPU3Jy';

mongoose.connect(`mongodb+srv://${mongoUser}:${mongoPass}@cluster0-bwckm.gcp.mongodb.net/test?retryWrites=true&w=majority`,
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