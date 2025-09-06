import 'dotenv/config'
import express from 'express'
import { connectDB } from './src/config/database.js';
import cookieParser from 'cookie-parser';
import cors from "express";
import { UserRouter } from './src/routes/user.routes.js';

const app = express() 
const port = process.env.DB_PORT || 3000;

app.use(cookieParser())
app.use(cors({
  origin: "http://localhost:3000",
credentials: true
}))

app.use(express.json())

///Pruebas para la sincronizacion y creacion de tablas.
    app.use('/api', UserRouter);

    // app.get('/', (req,res)=>{
    //     const profile = ProfileModel.findAll();
    //     res.status(200).json(profile)
    // });

    // app.get('/', (req,res)=>{
    //     const article = articleModel.findAll();
    //     res.status(200).json(article)
    // });

    // app.get('/', (req,res)=>{
    //     const tag = tagModel.findAll();
    //     res.status(200).json(tag)
    // });

connectDB()
  app.listen(port, async() => {    
    console.log(`Servidor corriendo en http://localhost:${port}`)
  })
