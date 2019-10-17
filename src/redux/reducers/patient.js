/**
 * Estado inicual del paciente
 */
const initialState = {
    patient:''
};

/**
 * Maneja el estado del storage.
 * @param {*} state 
 * @param {*} action 
 */
const reducer =(state = initialState, action)=>{
    switch(action.type){
        case 'getActualPatient':
        state.loggedDoctor = action.payload;
        break;
    }
    return state;
};

export default reducer;