import React from 'react';


// Creo un contexto que será pasado a todos los componentes
export const UserContext = React.createContext({
    login : false
});


/**
 * Provider -> Encierra el componente al cual le pasamos datos
 * Consumer -> Permite consumir datos en cualquiero componente 
 */