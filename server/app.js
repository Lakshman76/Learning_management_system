const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const dbConnect = require('./config/dbConnection');

const app = express();

dbConnect();

app.use(express.json());

app.use(cors());

app.use(cookieParser());

app.use('/ping', (req, res)=>{
    res.send('pong');
})

app.all('*', (req, res)=>{
    res.status(404).send('OOPS!! 404 page not found');
})

module.exports = app;