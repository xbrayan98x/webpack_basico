
// este archivo css solo será aplicado a este componente js.

import '../css/componente.css';

export const saludar = ( nombre ) => {
  const h1 = document.createElement('h1');
  h1.innerText = `Hola, ${ nombre } Crack.`;
  document.body.append( h1 );
};
