import handleObjMongoToObjJs from "./handleObjMongoToObjJs.js"

// Transformar los objetos de JS que vienen con el _id en un id
const handleMongoId = (elemento) => { //puede ser un array o un obj
    const pk = '_id'
    elemento = handleObjMongoToObjJs(elemento) // transformo un obj de mongoose a un obj de js
    if ( Array.isArray(elemento) ) { // Array.isArray => true o false
         
        // Al array le voy a sacar los _(guiones a los id de los obj)
        for (let i = 0; i < elemento.length; i++) {
            //console.log(obj[i][pk])
            elemento[i].id = elemento[i].pk // array[0].id = array[0]["_id"]
            delete elemento[i][pk]  // elimino el atributo del obj _id
            
        }
    } else {
       // solo UN obj
       elemento.id = elemento[pk]
       delete elemento[pk]
       
    }

    return elemento
    
}

export default handleMongoId