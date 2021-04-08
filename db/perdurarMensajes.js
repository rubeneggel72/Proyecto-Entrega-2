
const Mensaje = require('../models/mensajes');
const create=(mensaje)=>{
    console.log('mensaje chat guardado');
    let item = new Mensaje(mensaje);
    item.save();
  }

module.exports = create
