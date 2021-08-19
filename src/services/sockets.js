import socket from 'socket.io';
import { Productos } from '../models/claseProductos';
import { formatMessages } from '../models/claseMensaje';

export const init = (app) => {
  const io = socket(app);
  const productController = new Productos();
  const messages = []
  /*const data= {
    username: undefined,
    text: undefined,
  };*/
  

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
          //console.log(productos);
          if (productos.length > 0) {
            socket.emit('producto-update', productos);
            }
      });

        

      socket.on('new-message', function (data) {
        const formatdata = formatMessages(data);
        messages.push(formatdata);
        socket.emit('message-update', [formatdata]);//envia mensaje a todos (corregir)
      });
      
      socket.on('inicio-messages', (author) => {
        console.log('ME LLEGO DATA inicio de messages');
        console.log(messages);
        if (messages.length > 0 ) {
          let filterMessage = messages;       
          if (author !== 'admin') {
            filterMessage = messages.filter(m => m.author === author);       
          }
          socket.emit('message-update', filterMessage);
        }
        
      });




      });

  return io;
};