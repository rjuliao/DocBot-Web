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
 * @param {*} documentType 
 * @param {*} documentNumber 
 * @param {*} weight 
 * @param {*} height 
 * @param {*} sex 
 * @param {*} password 
 * @param {*} clinicalContext 
 * @param {*} medicalCenter 
 * @param {*} dateAssociation 
 * @param {*} idDoctor
 */
export function regPaciente(name, lastName, birthdate, documentType, documentNumber, weight, height,
     sex, password, clinicalContext, medicalCenter, dateAssociation, idDoctor){
    
    return fetch('http://api-rest-botic.herokuapp.com/api/patients/',{
        method: 'POST',
        body: JSON.stringify({name, lastName, birthdate, documentType, documentNumber, weight, height, 
            sex, password, clinicalContext, dateAssociation, medicalCenter, idDoctor}),
        headers: {'Content-Type':'application/json',}
    });
    
}

/**
 * Obtengo una lista de pacientes a partir del id de doctor
 * @param {*} idDoctor 
 */
export function getPatients(idDoctor){
    return fetch('http://api-rest-botic.herokuapp.com/api/patients/buscar',{
        method: 'POST',
        body: JSON.stringify({idDoctor}),
        headers: {'Content-Type':'application/json',}
    });
}