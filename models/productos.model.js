import mongoose from 'mongoose'
import handleMongoId from '../utils/handleMongoId.js'

// CREAMOS EL ESQUEMA

const productosSchema = mongoose.Schema({
    nombre: String,
    precio: Number,
    stock: Number,
    marca: String,
    categoria: String,
    detalles: String,
    foto: String,
    envio: Boolean
})

// CREAMOS MODELO

const productosModel = mongoose.model('productos', productosSchema)

/* ------------------------------------------------------------------- */
/* Métodos que nos van a servir de interfaz para interactuar con la DB */
/* ------------------------------------------------------------------- */

/* ------------------------------------------------- */
/* Obtener el producto basado en el id               */
/* ------------------------------------------------- */
 const leerProducto = async (id) => {
    try {
        const producto = await productosModel.findById(id)
        return handleMongoId(producto)
    } catch (error) {
        console.log('[leerProducto]: No se pudo leer el producto con el id', error)
    }
}

/* ------------------------------------------------- */
/* Obtener todos los productos de la base            */
/* ------------------------------------------------- */
const leerProductos = async () => {
    try {
        const productos = await productosModel.find({}) // .lean() // transformo un obj de mongoose en un obj de js
        return handleMongoId(productos)
    } catch (error) {
        console.log('[leerProductos]: Algo no salió bien...', error)
    }
}

/* --------------------------------------------------- */
/* Guardar en la base de datos el producto recibido    */
/* --------------------------------------------------- */

const guardarProducto = async (productoNuevo) => {

    try {
        const productoAlmacenado = new productosModel(productoNuevo)
    await productoAlmacenado.save()
    return handleMongoId(productoAlmacenado)
    } catch (error) {
        console.log('ERROR (Guardar productos), no se pudo guardar en la DB', error);
        
    }
}

/* ------------------------------------------------------------------ */
/* Va a actualizar el producto basado en el id y el producto a editar */
/* ------------------------------------------------------------------ */

const modificarProducto = async (id, productoAEditar) => {
    try {
        // findByIdAndUpdate es el producto con los datos que tenía
        // new:true => findByIdAndUpdate retorna el producto actualizado
        const productoModificado = await productosModel.findByIdAndUpdate(id, productoAEditar, { new: true })
        return handleMongoId(productoModificado)
    } catch (error) {
        console.log('ERROR[modificarProducto]: No se pudo actualizar el producto', error)
    }

}

/* -------------------------------------------- */
/* Va a eliminar el producto basado en el id    */
/* -------------------------------------------- */

const eliminarProducto = async (id) => {

        try {
            const productoBorrado = await productosModel.findByIdAndDelete(id)
            return handleMongoId(productoBorrado)
        } catch (error) {
            console.log('ERROR al eliminar la película en la DB', error);
        }
}

export default {
    leerProducto,
    leerProductos,
    guardarProducto,
    modificarProducto,
    eliminarProducto,
}