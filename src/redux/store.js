import { createStore, combineReducers } from 'redux';
import doctor from './reducers/doctor';
import patient from './reducers/patient';

/**
 * Reducers que se van a pasar al store
 */
const reducers = combineReducers({
    doctor,
    patient,
});


const store = createStore(reducers);

export default store;