import models from '../models/productos.model.js'
import handleError from '../utils/handleError.js'

const obtenerProductos = async (req, res) => { 
    let id = req.params.id 

    try {
        if ( id ) {
            const producto = await models.leerProducto(id)
            return res.status(200).json(producto)
        } else {
            const productos = await models.leerProductos()
            return res.status(200).json(productos)
        }
    } catch (error) {
        console.log('No se pudo acceder a los productos', error)
        res.status(500).send('[obtenerProductos]: No se pudo acceder a los productos')    
        handleError(res,`[obtenerProductos]: ${error.message} - No se pudo acceder a los productos`)
    }

    res.send('GET ALL / ONE (READ)')
}

const guardarProducto = async (req, res) => {

    try {
        const producto = req.body
        const productoGuardado = await models.guardarProducto(producto)
        res.status(201).json(productoGuardado)
    } catch (error) {
        console.log('ERROR al guardar una película', error)
        return res.status(500).send('Error al guardar una película')
        handleError(res,`[guardarProducto]: ${error.message} - No se pudo guardar los productos`)
    }
}

const actualizarProducto = async (req, res) => {

    const { id } = req.params 
    const producto = req.body

    try {
        const productoActualizado = await models.modificarProducto(id, producto)
        res.status(200).json(productoActualizado)
    } catch (error) {
        console.log('No se pudo actualizar el producto', error)
        res.status(500).send('No se pudo actualizar el producto')
        handleError(res,`[actualizarProducto]: ${error.message} - No se pudo actualizar el producto`)
    }

}

const borrarProducto = async (req, res) => {
    const { id } = req.params.id // ObjectID
    console.log(id)

    try {
        const productoBorrado = await models.eliminarProducto(id)
        res.status(200).json(productoBorrado)
    } catch (error) {
        console.log('No se pudo', error)
        res.status(500).send('No se pudo borrar el producto')
        handleError(res,`[borrarProducto]: ${error.message} - No se pudo borrar el producto`)
    }
   
}

export default {
    obtenerProductos,
    actualizarProducto,
    guardarProducto,
    borrarProducto
}