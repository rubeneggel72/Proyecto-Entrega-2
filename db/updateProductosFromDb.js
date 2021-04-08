const Producto = require('../models/productos');

const updateProductosFromDb=()=>{
    Producto.find(function (error, items) {

        if (error) {
            response.status(500).send(error);
            return;
        }
        arrayProductos = items;
    })
}
module.exports = updateProductosFromDb;