import express from 'express';
import handlebars from 'express-handlebars';
import * as http from 'http';
//import io from 'socket.io';
import path from 'path';
import routerProductos from './routes/productos.js';
import {init} from './sockets';



// INICIALIZACION API con EXPRESS 
const app = express();
const puerto = 8080;

//disponibilizo carpeta public
const publicPath = path.resolve(__dirname, '../public');
app.use(express.static(publicPath));

//configuracion de hbs
const layoutDirPath = path.resolve(__dirname, '../views/layouts');
const defaultLayerPth = path.resolve(__dirname, '../views/layouts/index.hbs');
const partialDirPath = path.resolve(__dirname, '../views/partials');

app.set('view engine', 'hbs');
app.engine(
  'hbs',
  handlebars({
    layoutsDir: layoutDirPath,
    defaultLayout: defaultLayerPth,
    extname: 'hbs',
    partialsDir: partialDirPath,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/productos', routerProductos);

//endpoin de socket
app.get('/', (req, res) => {
	res.render('main');
});

//creo mi configuracion para socket
const myServer = http.Server(app);
myServer.listen(puerto, () => console.log('Server up en puerto', puerto));

const myWSServer = init(myServer);

myServer.on('error', (err) => {
  console.log('ERROR ATAJADO', err);
});