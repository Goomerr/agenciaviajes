import { Testimonios } from '../models/Testimonios.js'
const guardarTestimonios = async (req, res) => {

    //Validar formulario
    const { nombre, correo, mensaje } = req.body;
    const errores = [];

    if (nombre.trim() === '') {
        errores.push({ mensaje: 'Escribe tu Nombre' });
    }
    if (correo.trim() === '') {
        errores.push({ mensaje: 'Escribe tu E-mail' });
    }
    if (mensaje.trim() === '') {
        errores.push({ mensaje: 'Escribe tu Mensaje' });
    }
    
    if (errores.length > 0) {
       
        //Consultar los testimonios existentes
        const testimonios = await Testimonios.findAll();

        //Mostrar la vista de errores
        res.render('testimonios', {
            pagina: 'testimonios',
            errores,
            nombre,
            correo,
            mensaje,
            testimonios
        })
    } else {
        //Almacenar en la base de datos
        try {
            await Testimonios.create({
                nombre,
                correo,
                mensaje
            });
            res.redirect('/testimonios');
        } catch (error) {
            console.log(error);
        }
    }
}

export {
    guardarTestimonios
}