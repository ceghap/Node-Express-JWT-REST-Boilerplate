// import express
const express = require('express');
// create express app
const app = express();
// import dotenv
const dotenv = require('dotenv');
// enable .env from process.env
dotenv.config();
// port
const port = process.env.PORT || 3000;

// import mongoose lib
const mongoose = require('mongoose');

// import routes
const authRoute = require('./routes/auth');
const postRoute = require('./routes/privateroute');

// connect to DB
mongoose.connect(
  process.env.DB_CONNECT,
  { useNewUrlParser: true, useUnifiedTopology: true },
  () => {
    console.log('connected to db');
  },
);

app.use(express.json()); // bodyparser
// route middlewares
app.use('/api/user', authRoute); // prefix of authRoutes
app.use('/api/post', postRoute); // prefix for postRoutes
// default landing route
app.get('/', (req, res) => {
  res.send('hello world!');
});

// app listening on port 3000 when started
app.listen(port, () => {
  console.log('running on port ' + port + ' of the docker container.');
});
