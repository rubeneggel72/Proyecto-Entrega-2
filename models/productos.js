
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const AutoIncrement = require('mongoose-sequence')(mongoose);

const productoSchema = new Schema({
  productoId: {
    type: Number
  },
  nombre: {
    type: String
  },
  grupo: {
    type: String
  },
  tipo: {
    type: String
  },
  variedad: {
    type: String
  },
  origen:{
    type: String
  },
  precio: {
    type: Number
  }, 
  stock: {
    type: Number
  },
  foto: {
    type: String
  },
  descripcion: {
    type: String
  },
  temperatura: {
    type: String
  },
  cosecha: {
    type: String
  },
  añejamiento: {
    type: String
  },
  alcohol: {
    type: String
  },
  date: { type: Date, default: Date.now }
}, { collection: 'productos' });

productoSchema.plugin(AutoIncrement, { id: 'productoId_seq', inc_field: 'productoId' });

module.exports = mongoose.model('productoDb', productoSchema);