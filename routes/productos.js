const express = require('express');
const Producto = require('../models/productos');
const updateProductosFromDb=require('../db/updateProductosFromDb')
const productoRouter = express.Router();

productoRouter
  .route('/')
  .post(function (req, res)  {
    console.log('POST /productos');
      let permisoAdministrador = true
      if (permisoAdministrador != administrador) { res.send({ error: 'Error: -1, decripcion: ruta: producto/ metodo POST no autorizado' }); }
      else {let item = new Producto(req.body);
        item.save();
        updateProductosFromDb();
          res.send(req.body);
      }
  })
  
  .get(function (req, res)  {
     let permisoAdministrador = true
  if (permisoAdministrador != administrador) { res.send({ error: 'Error: -1, decripcion: ruta: producto/ metodo GET no autorizado' }); }
  else {
      if (arrayProductos.length > 0) {
          res.send(arrayProductos);
      }
      else {
          res.send({ error: 'No hay products cargados en lista de productos' });
      }
  }
})

productoRouter
  .route('/:id')
  .get(function (req, res) {
    let permisoAdministrador = true
    if (permisoAdministrador != administrador) { res.send({ error: 'Error: -1, decripcion: ruta: producto/:id metodo GET no autorizado' }); }
    else {
        let id = parseInt(req.params.id)
        let idx = getindex(id)
        let product = arrayProductos[idx]
        if (product != undefined) {
            res.send(product);
            return
        }
        else {
            res.send({ error: 'producto no encontrado en lista de productos' });
        }
        res.send(JSON.stringify(product));
    }
})
  .put(function (request, response) {
    console.log('PUT /productos/:id');
    let permisoAdministrador = true
    if (permisoAdministrador != administrador) { res.send({ error: 'Error: -1, decripcion: ruta: producto/:id metodo PUT no autorizado' }); }
    else {
    var itemId = request.params.id;
    Producto.findOne({ productoId: itemId }, function (error, item) {

      if (error) {
        response.status(500).send(error);
        return;
      }
      if (item) {
        item.nombre = request.body.nombre;
        item.grupo = request.body.grupo;
        item.stock = request.body.stock;
        item.precio = request.body.precio;
        item.descripcion = request.body.descripcion;
        item.foto = request.body.foto;
        item.tipo = request.body.tipo;
        item.variedad = request.body.variedad;
        item.origen = request.body.origen;
        item.save();
        response.json(item);
        updateProductosFromDb();
        return;
      }

      response.status(404).json({
        message: 'productos con id ' + itemId + ' no fue encontrado en lista de productos.'
      });
    });
  }
})

  .delete(function (request, response) {
    console.log('DELETE /productos/:id');
    var itemId = request.params.id;
    Producto.findOne({ productoId: itemId }, function (error, item) {
      if (error) {
        response.status(500).send(error);
        return;
      }
      if (item) {
        item.remove(function (error) {
          if (error) {
            response.status(500).send(error);
            return;
          }
          updateProductosFromDb();
          response.status(200).json({
            message: 'productos con id ' + itemId + ' fue borrado.'
          });
        });
      } else {
        response.status(404).json({
          message: 'productos con id ' + itemId + ' no fue encontrado.'
        });
      }
    });
  });

  productoRouter
  .route('/nombre/:nombre')
  .get(function (req, res) {let permisoAdministrador = true
    if (permisoAdministrador != administrador) { res.send({ error: 'Error: -1, decripcion: ruta: producto/:id metodo GET no autorizado' }); }
    else {
        let nombre = req.params.nombre
        const productos = arrayProductos.filter(arrayProductos => arrayProductos.nombre==nombre);
        if (productos.length>0) {
            res.send(productos);
            return
        }
        else {
            res.send({ error: 'producto no encontrado en lista de productos' });
        }
        res.send(JSON.stringify(product));
    }
})

productoRouter
  .route('/precio/:min/:max')
  .get(function (req, res) {let permisoAdministrador = true
    if (permisoAdministrador != administrador) { res.send({ error: 'Error: -1, decripcion: ruta: producto/:id metodo GET no autorizado' }); }
    else {
        let min = req.params.min
        let max = req.params.max
        const productos = arrayProductos.filter(arrayProductos => arrayProductos.precio>=min && arrayProductos.precio<=max);
        if (productos.length>0) {
            res.send(productos);
            return
        }
        else {
            res.send({ error: 'producto no encontrado en lista de productos' });
        }
        res.send(JSON.stringify(product));
    }
})

productoRouter
  .route('/stock/:min/:max')
  .get(function (req, res) {let permisoAdministrador = true
    if (permisoAdministrador != administrador) { res.send({ error: 'Error: -1, decripcion: ruta: producto/:id metodo GET no autorizado' }); }
    else {
        let min = req.params.min
        let max = req.params.max
        const productos = arrayProductos.filter(arrayProductos => arrayProductos.stock>=min && arrayProductos.stock<=max);
        if (productos.length>0) {
            res.send(productos);
            return
        }
        else {
            res.send({ error: 'producto no encontrado en lista de productos' });
        }
        res.send(JSON.stringify(product));
    }
})

function getindex(id) {
  var index = -1;
  arrayProductos.filter(function (producto, i) {
      if (producto.productoId === id) {
          index = i;
      }
  });
  return index;
}

module.exports = productoRouter;
