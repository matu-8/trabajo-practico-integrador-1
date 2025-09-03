import 'dotenv/config'
import express from 'express'
import { connectDB } from './src/config/database.js';
import { ProfileModel } from './src/models/profile.model.js';
import { UserModel } from './src/models/user.model.js';
import { tagModel } from './src/models/tag.model.js';
import { articleModel } from './src/models/article.model.js';
import cookieParser from 'cookie-parser';

const app = express() 
const port = process.env.DB_PORT || 3000;

app.use(cookieParser())
app.use(express.json())

///Pruebas para la sincronizacion y creacion de tablas.
    app.get('/', (req, res) => {
        const users = UserModel.findAll()
      res.status(200).json(users)
    });

    app.get('/', (req,res)=>{
        const profile = ProfileModel.findAll();
        res.status(200).json(profile)
    });

    app.get('/', (req,res)=>{
        const article = articleModel.findAll();
        res.status(200).json(article)
    });

    app.get('/', (req,res)=>{
        const tag = tagModel.findAll();
        res.status(200).json(tag)
    });

connectDB().then(()=>{
  app.listen(port, async() => {    
    console.log(`Servidor corriendo en http://localhost:${port}`)
  })
})