import express from 'express';
import router from './routes/index.js';
import db from './config/db.js';

const app = express();

// contectar la db
db.authenticate()
  .then( () => console.log('Base de datos conectada'))
  .catch( error => console.log(error));
 
let port = 4000;
const portArg = process.argv[2];
 
if (portArg !== undefined && !Number.isNaN(parseInt(portArg, 10))) {
  port = parseInt(portArg, 10);
}

// Habilitar pug
app.set('view engine', 'pug');

// Obtener el año actual
app.use( (req, res, next) => {

    const year = new Date();

    res.locals.ActualYear = year.getFullYear();
    res.locals.nombreSitio = "ADV";

    return next();
})

// Agregar body parse leer los datos del formulario
app.use(express.urlencoded({extended: true}));

// Definir la carpeta pública
app.use(express.static('public'));

// Agregar Router
app.use('/', router);
 
 
app.listen(port,()=>{
        console.log(`El servidor esta corriendo en ${port}`)
})
