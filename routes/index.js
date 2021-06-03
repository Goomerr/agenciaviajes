import express from 'express';
import {
    paginaInicio,
    paginaNosotros,
    paginaViajes,
    paginaTestimonios,
    paginaDetalleViaje
}
    from '../controllers/paginasControllers.js';
import {
    guardarTestimonios
} from '../controllers/testimoniosController.js';


const router = express.Router();

router.get('/', paginaInicio);

router.get('/nosotros', paginaNosotros);

router.get('/viajes', paginaViajes);

router.get('/viajes/:slug', paginaDetalleViaje);// /: comodín que carga una método diferente del controlador para cada ruta que queremos ver  

router.get('/testimonios', paginaTestimonios);
router.post('/testimonios', guardarTestimonios);

export default router;