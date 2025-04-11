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

// 404 handler middleware - add this before the error handler
app.use((req, res, next) => {
    res.status(404).json({
        status: 'fail',
        message: `Route ${req.originalUrl} not found on this server`
    });
});

// Global error handling middleware
app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    res.status(statusCode).json({
        status: 'error',
        message: err.message || 'Internal Server Error',
        error: process.env.NODE_ENV === 'development' ? err : {}
    });
});

app.listen(process.env.PORT || 3000, () => {
    console.log(`server has started at http://localhost:${process.env.PORT || 3000}`);
})
