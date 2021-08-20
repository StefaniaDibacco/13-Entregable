import socket from 'socket.io';
import { Productos } from '../models/claseProductos';
import { formatMessages } from '../models/claseMensaje';

export const init = (app) => {
  const io = socket(app);
  const productController = new Productos();
  const messages = []

  io.on('connection', (socket) => {
      console.log('conectado');
      socket.on('producto-nuevo', async(product) => {
          const {title,price,thumbnail} = product;
          console.log('producto nuevo', product);
          let resultado = await productController.guardar(title,(price),thumbnail);
          console.log('guardé producto nuevo', resultado);
          if (resultado) {
              io.emit('producto-update', [product]);
            }
      });
      socket.on('inicio-productos', async() => {
          console.log('inicio lista de productos productos');
          const productos = await productController.leer();
          if (productos.length > 0) {
            socket.emit('producto-update', productos);
            }
      });

      socket.on('inicio-messages', (data) => {
        console.log('ME LLEGO DATA inicio de messages');
        console.log(data);
        socket.emit('message-update', messages);
      });
          
      socket.on('new-message', (data) => {
        const formatdata = formatMessages(data);
        messages.push(formatdata);
        io.emit('message-update', [formatdata]);
      });
      
    });

  return io;
};