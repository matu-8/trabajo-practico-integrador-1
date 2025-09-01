import 'dotenv/config'
import express from 'express'

const app = express()
const port = process.env.DB_PORT || 3000;

app.get('/', (req, res) => {
    res.send("Hola server")
})

app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`)
})