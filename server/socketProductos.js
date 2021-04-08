const Producto = require('../models/productos');
const updateProductosFromDb=require('../db/updateProductosFromDb')
const socketBroadcastProductos=(socket)=>{
setInterval(function () {

    updateProductosFromDb();

    socket.broadcast.emit('arrayProductos', arrayProductos);
}, 3000);
}
module.exports =socketBroadcastProductos