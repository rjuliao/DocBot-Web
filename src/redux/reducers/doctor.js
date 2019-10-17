import { type as getDoctorType } from '../actions/getDoctor';

const defaultState = {
    doctor: '',
};


/**
 * Cuando implementamos una acción utilizamos el type de la acción y el payload
 * para modificar el estado de la aplicación
 * @param {*} state 
 * @param {*} param1 
 */
function reducer(state = defaultState, {type, payload}){
    switch(type){
        case getDoctorType:{
            state.doctor = payload;
            break;
        }
    }
    return state;
}

export default reducer;