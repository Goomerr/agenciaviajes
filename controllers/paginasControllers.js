import { Viaje } from '../models/Viajes.js';
import { Testimonios } from '../models/Testimonios.js';


const paginaInicio = async (req, res) => {//req- lo que enviamos  : res - lo que express nos responde

    //consultar la base de datos y extraer 3 viajes y 3 testimonios
    
    //creamos un promise para ejecutar ambas consultas al mismo tiempo
    const promiseDB = [];
    promiseDB.push(Viaje.findAll({ limit: 3 }));
    promiseDB.push(Testimonios.findAll({ limit: 3 }));

    try {
        //pasamos el Promise
        const resultado = await Promise.all( promiseDB);

        res.render('inicio', {
            pagina: 'Inicio',
            clase: 'home',
            viajes: resultado[0],//leemos los resultados del Promise
            testimonios: resultado[1]//leemos los resultados del Promise
        });

    } catch (error) {
        console.log(error);
    }
}

const paginaNosotros = (req, res) => {//req- lo que enviamos  : res - lo que express nos responde
    res.render('nosotros', {
        pagina: 'Nosotros'
    });
}

const paginaViajes = async (req, res) => {//req- lo que enviamos  : res - lo que express nos responde

    //consultar base de datos
    const viajes = await Viaje.findAll();

    //console.log(viajes);

    res.render('viajes', {
        pagina: 'Próximos Viajes',
        viajes
    });
}

const paginaTestimonios = async (req, res) => {//req- lo que enviamos  : res - lo que express nos responde
    try {
        //consultar base de datos
        const testimonios = await Testimonios.findAll();

        res.render('testimonios', {
            pagina: 'Testimonios',
            testimonios
        });
    } catch (error) {
        console.log(error);
    }
}

//Muestra un viaje por su slug

const paginaDetalleViaje = async (req, res) => {

    const { slug } = req.params;

    try {
        const viaje = await Viaje.findOne({ where: { slug } });
        res.render('viaje', {
            pagina: 'Información Viaje',
            viaje
        })

    } catch (error) {
        console.log(error);
    }

}
export {
    paginaInicio,
    paginaNosotros,
    paginaViajes,
    paginaTestimonios,
    paginaDetalleViaje,
}