import 'dotenv/config'
import express from 'express'
import { connectDB } from './src/config/database.js';
import cookieParser from 'cookie-parser';
import cors from "express";
import { authRoute } from './src/routes/auth.routes.js';

const app = express() 
const port = process.env.DB_PORT || 3000;

//Middlewares
app.use(cookieParser())
app.use(cors({
  origin: "http://localhost:3000",
  credentials: true
}))
app.use(express.json())

//enrutamiento
app.use('/api', authRoute);

//inicio de servidor y conexion a base de datos
connectDB()
  app.listen(port, async() => {    
    console.log(`Servidor corriendo en http://localhost:${port}`)
  })
  
