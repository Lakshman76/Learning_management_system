require('dotenv').config();
const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const dbConnect = require('./config/dbConnection');
const userRoutes = require('./routes/user.route');
const errorMiddleware = require('./middlewares/error.middleware');

const app = express();

dbConnect();

app.use(express.json());

app.use(cors());

app.use(cookieParser());

app.use('/ping', (req, res)=>{
    res.send('pong');
})

app.use('/api/v1/user', userRoutes);

app.all('*', (req, res)=>{
    res.status(404).send('OOPS!! 404 page not found');
})

app.use(errorMiddleware);

module.exports = app;