export const type = 'getDoctor';

/**
 * Acción
 * @param {*} object 
 */
const getDoctor = (object) =>{
    return{
        type,
        payload: object,
    }
};

export default getDoctor;