import express from 'express'
import 'dotenv/config'
import cors from 'cors'
import mongoose from 'mongoose'

import routerProductos from './routers/productos.routers.js'
import routerUpload from './routers/upload.router.js'
import path from 'node:path'
import routerCarrito from './routers/carrito.router.js'
import handleConnection from './utils/handleConnection.js'


// ! Configuraciones

const app = express()
const PORT = process.env.PORT || 3000
const corsConfig = {
    origin: process.env.URL_FRONT_CORS //'http://localhost:2222' // http://127.0.0.1:2222
}

// ! CONEXION MONGODB

//handleConnection(process.env.URI_MLOCAL)
handleConnection(process.env.URI_MREMOTA)


// ! Middlewares
app.use(express.static(path.join('public'))) // Me permite hacer publicas las imagenes que suban al servidor
app.use(express.urlencoded({extended:true})) // decodifica el body enviado desde un formulario
app.use(express.json()) // decodifica el body enviado desde un json
app.use(cors(corsConfig))

// ! Rutas
app.use('/api/productos', routerProductos)
app.use('/api/upload', routerUpload)
app.use('/api/carrito', routerCarrito)

app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.all('*', (req, res) => {
    res.status(404).send(`La ruta ${req.url} utilizando el ${req.method} no está disponible!`)
})

app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`)
})

export default routerProductos