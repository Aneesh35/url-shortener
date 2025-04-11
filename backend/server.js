import { configDotenv } from 'dotenv';
import express from 'express'
import morgan from 'morgan';
import {config} from 'dotenv';
import UserRouter from './routes/user.routes.js';
import { connectDatabase } from './db/dbConnection.js';
import urlRouter from './routes/url.routes.js';
import cors from 'cors'

config();
const app=express();
connectDatabase();
app.use(cors({
    origin: process.env.FRONTEND_URL.split(',')
}))
app.use(morgan('dev'));
app.use(express.json());
app.use('/user',UserRouter);
app.use('/u',urlRouter)
app.get('/',(req,res)=>{
    res.send("hello, You just connected to server!!");
})

app.listen(`${process.env.port}`,()=>{
    console.log("server has started at http://localhost:3000");
})
