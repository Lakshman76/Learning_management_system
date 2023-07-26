import {config}  from 'dotenv';
import express from'express';
import cookieParser from'cookie-parser';
import cors from'cors';
import dbConnect from'./config/dbConnection.js';
import userRoutes from'./routes/user.route.js';
import errorMiddleware from'./middlewares/error.middleware.js';
import morgan from 'morgan';

const app = express();
config();
dbConnect();

app.use(express.json());

app.use(cors());

app.use(cookieParser());

app.use(morgan('dev'));

app.use('/ping', (req, res)=>{
    res.send('pong');
})

app.use('/api/v1/user', userRoutes);

app.all('*', (req, res)=>{
    res.status(404).send('OOPS!! 404 page not found');
})

app.use(errorMiddleware);

export default app;