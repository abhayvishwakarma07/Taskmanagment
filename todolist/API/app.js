import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';

const app=express();

app.use(cors())

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));


import Router from './Router/Router.js';
import todoRouter from './Router/todorouter.js';

app.use('/user',Router);

app.use('/todo',todoRouter)

app.listen(3000);
console.log("server is start");