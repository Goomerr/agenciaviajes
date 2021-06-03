//npm run dev para arrancar el servidor

import express from 'express'
import router from './routes/index.js';//archivo con la extensión
import db from './config/db.js';//archivo con la extensión
import dotenv from 'dotenv';
dotenv.config({path:"variables.env"});

const app = express();

//Conectar la base de datos
db.authenticate()
    .then(()=> console.log('Base de datos Conectada'))
    .catch(error => console.log(error));

//Habilitar PUG
app.set('view engine', 'pug');

//Obtener el año actual
app.use((req, res, next) => {
    const year = new Date();
    res.locals.actualYear = year.getFullYear();
    res.locals.nombresitio = 'Agencia de Viajes'
    return next();
});

//Agregar body parser para leer los datos del formulario
app.use(express.urlencoded({extended: true}));

//Definir la carpeta publica
app.use(express.static('public'));

//Agregar router
app.use('/', router);

//Definir Puerto y host para la app
const host = process.env.HOST || '0.0.0.0';
const port = process.env.PORT || 4000;

app.listen(port, host, () => {
    console.log(`El servidor esta funcionando`)
});