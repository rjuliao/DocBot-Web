
/**
 * Creo un estado inicial que va a tener mi storage
 */
const initialState = {
    loggedDoctor:''
};

/**
 * Maneja el estado del storage.
 * @param {*} state 
 * @param {*} action 
 */
const reducer =(state = initialState, action)=>{
switch(action.type){
    case 'save_patient':
    state.loggedDoctor = action.payload;
    break;
}
return state;
};

export default reducer;