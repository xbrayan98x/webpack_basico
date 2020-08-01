// punto entrada de la app.

// esta linea siempre busca un archivo js, por eso no le coloco extensión.
import { saludar } from './js/componente';
import './estilos.css';
// error: no puede usar imporaciones fuera de un módulo. <- SIN WebPack

const nombre = 'Brayan';

saludar( nombre );
