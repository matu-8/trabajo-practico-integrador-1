import 'dotenv/config'
import express from 'express'
import { UserModel } from './src/models/user.model.js';
import { ProfileModel } from './src/models/profile.model.js';
import { articleModel } from './src/models/article.model.js';
import { tagModel } from './src/models/tag.model.js';
import { connectDB } from './src/config/database.js';

const app = express()
const port = process.env.DB_PORT || 3000;

app.get('/', (req, res) => {
   const user = UserModel.findAll()
   res.status(200).json()

})
app.get('/', (req, res) => {
   const profile = ProfileModel.findAll()
   res.status(200).json()

})
app.get('/', (req, res) => {
   const article = articleModel.findAll()
   res.status(200).json()

})
app.get('/', (req, res) => {
   const tag = tagModel.findAll()
   res.status(200).json()

})
connectDB();

app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`)
})