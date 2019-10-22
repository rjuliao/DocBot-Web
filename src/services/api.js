/**
 * Inicio de sesión del usuario
 * @param {*} email 
 * @param {*} password 
 */
export function signIn(email,password){ 
    return fetch(`http://api-rest-botic.herokuapp.com/api/doctors/login`,{ 
        method: 'POST', 
        body: JSON.stringify({ email, password }), 
        headers: { 'Content-Type':'application/json', } 
    });
}

/**
 * Registro del medico
 * @param {*} name 
 * @param {*} lastName 
 * @param {*} email 
 * @param {*} password 
 */
export function singUp(name, lastName, medicalCenter,  email, password){
    return fetch('http://api-rest-botic.herokuapp.com/api/doctors',{
        method: 'POST',
        body: JSON.stringify({name, lastName, email, medicalCenter, password}),
        headers: {'Content-Type':'application/json',}
    });
}

/**
 * Registar un paciente
 * @param {*} name 
 * @param {*} lastName 
 * @param {*} birthdate 
 * @param {*} age
 * @param {*} documentType 
 * @param {*} documentNumber 
 * @param {*} weight 
 * @param {*} height 
 * @param {*} sex 
 * @param {*} password 
 * @param {*} clinicalContext 
 * @param {*} medicalCenter 
 * @param {*} doc
 */
export function regPaciente(name, lastName, birthdate, age, documentType, documentNumber, weight, height,
     sex, password, clinicalContext, medicalCenter, doc){
    
    return fetch('http://api-rest-botic.herokuapp.com/api/patients/',{
        method: 'POST',
        body: JSON.stringify({name, lastName, birthdate, age, documentType, documentNumber, weight, height, 
            sex, password, clinicalContext, medicalCenter, doc}),
        headers: {'Content-Type':'application/json',}
    });
    
}

/**
 * Obtengo una lista de pacientes a partir del id de doctor
 * @param {*} doc 
 */
export function getPatients(doc){
    return fetch('http://api-rest-botic.herokuapp.com/api/patients/buscar',{
        method: 'POST',
        body: JSON.stringify({doc}),
        headers: {'Content-Type':'application/json',}
    });
}


/**
 * Añadir un paraclinico
 * @param {*} type 
 * @param {*} value 
 * @param {*} comment 
 * @param {*} file 
 * @param {*} patient 
 */
export function setParaclinico(type, value, comment,  patient){
    console.log(JSON.stringify({type, value, comment,  patient}))

    return fetch('http://api-rest-botic.herokuapp.com/api/paraclinicals/',{
        method: 'POST',
        body: JSON.stringify({type, value, comment,  patient}),
        headers: {'Content-Type':'application/json',}
    });
}


/**
 * Obtengo el paraclinico
 * @param {*} patient 
 */
export function getParaclinico(patient){
    return fetch('http://api-rest-botic.herokuapp.com/api/paraclinicals/buscar',{
        headers: {'Content-Type':patient,}
    });
}

/**
 * Guardo una meta
 * @param {*} description 
 * @param {*} state 
 * @param {*} quantity 
 * @param {*} typeFrequency 
 * @param {*} frequency 
 * @param {*} intesityLevel 
 * @param {*} typeMessage 
 * @param {*} pat 
 */
export function setGoal(description, state, quantity, typeFrequency, frequency, intesityLevel, typeMessage, pat){
    return fetch('http://api-rest-botic.herokuapp.com/api/goals/',{
        method: 'POST',
        body: JSON.stringify({description, state, quantity, typeFrequency, frequency, intesityLevel, typeMessage, pat}),
        headers: {'Content-Type':'application/json',}
    });
}