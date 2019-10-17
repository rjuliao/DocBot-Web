export const type = 'getActualPatient';

const getActualPatient = (object) =>{
    return{
        type,
        payload: object,
    }
};

export default getActualPatient;