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
 * @param {*} avatar
 */
export function regPaciente(name, lastName, birthdate, age, documentType, documentNumber, weight, height,
     sex, password,email, doc, avatar){
    
    return fetch('http://api-rest-botic.herokuapp.com/api/patients/',{
        method: 'POST',
        body: JSON.stringify({name, lastName, birthdate, age, documentType, documentNumber, weight, height, 
            sex, password, email, doc, avatar}),
        headers: {'Content-Type':'application/json',}
    });
    
}

/**
 * Obtener id de un paciente
 * @param {*} documentnumber 
 */
export function getSinglePatient(documentnumber){
    
    return fetch('https://api-rest-botic.herokuapp.com/api/patients/buscarPaciente',{
        method: 'GET',
        headers: {'Content-Type':'application/json', 'documentnumber': documentnumber}
    });
}

/**
 * Añadir la información médica del paciente
 * @param {*} clinicalContext 
 * @param {*} medicalCenter
 * @param {*} testFindRisk
 * @param {*} isDiabetic 
 * @param {*} patient 
 */
export function medicalInfos(clinicalContext, medicalCenter, testFindRisk, isDiabetic, patient){
    return fetch('http://api-rest-botic.herokuapp.com/api/medicalInfos',{
        method: 'POST',
        body: JSON.stringify({clinicalContext, medicalCenter, testFindRisk, isDiabetic, patient}),
        headers: {'Content-Type':'application/json',}
    });
}


/**
 * Obtener información médica del paciente
 * @param {*} patient
 */
export function getMedicalInfos(patient){

    return fetch('http://api-rest-botic.herokuapp.com/api/medicalInfos/buscar',{
        method: 'GET',
        headers: {'Content-Type':'application/json','patient':patient}
    });
}

/**
 * Actualizar peso
 * @param {*} id 
 * @param {*} weight 
 */
export function updateWeight(id, weight){
   
    return fetch('http://api-rest-botic.herokuapp.com/api/patients/updateweight',{
        method: 'PUT',
        body: JSON.stringify({weight, id}),
        headers: {'Content-Type':'application/json',}
    });
    
 }

/**
 * Obtengo el peso del paciente
 * @param {*} id 
 */
export function getWeight(id){
   
   return fetch('http://api-rest-botic.herokuapp.com/api/patients/getweight',{
       method: 'GET',
       headers: {'Content-Type':'application/json','id':id}
   });
   
}

/**
 * Edito la información de peso del paciente
 * @param {*} weight 
 */
export function setWeight(weight){
    return fetch('http://api-rest-botic.herokuapp.com/api/patients/updateweight',{
        method: 'PUT',
        body: JSON.stringify({weight}),
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
 * 
 * @param {*} name 
 * @param {*} lastName 
 * @param {*} birthdate 
 * @param {*} age 
 * @param {*} documentType 
 * @param {*} documentNumber 
 */
export function editPatient(name, lastName, birthdate, age, documentType, documentNumber){
    return fetch('http://api-rest-botic.herokuapp.com/api/patients/edit',{
        method: 'PUT',
        body: JSON.stringify({name, lastName, birthdate, age, documentType, documentNumber}),
        headers: {'Content-Type':'application/json',}
    });
}


/**
 * Proceso para eliminar un paciente
 * @param {*} id 
 */
export function detelePatient(id){
    return fetch('http://api-rest-botic.herokuapp.com/api/patients/delete',{
        method: 'DELETE',
        headers: {'Content-Type':'application/json','id':id}
    });
}


/********************************PARACLINICOS*************************************************/
/**
 * Añadir un paraclinico
 * @param {*} type 
 * @param {*} value 
 * @param {*} comment 
 * @param {*} file 
 * @param {*} patient 
 */
export function setParaclinico(type, value, comment,  patient){

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


/********************************METAS*****************************************/
/**
 * Creo una meta y la guardo en la base de datos
 * @param {*} description 
 * @param {*} state 
 * @param {*} quantity 
 * @param {*} typeFrequency 
 * @param {*} frequency 
 * @param {*} intensityLevel 
 * @param {*} typeMessage 
 * @param {*} pat 
 * @param {*} dueDate 
 * @param {*} progress 
 * @param {*} tag 
 * @param {*} nMessages 
 * @param {*} complianceDate 
 */
export function setGoal(description, state, quantity, typeFrequency, frequency, 
    intensityLevel, typeMessage, pat, dueDate, progress, tag, nMessages, complianceDate){
    return fetch('http://api-rest-botic.herokuapp.com/api/goals/',{
        method: 'POST',
        body: JSON.stringify({description, state, quantity, typeFrequency, 
            frequency, intensityLevel, typeMessage, pat, dueDate, progress, tag,nMessages, complianceDate }),
        headers: {'Content-Type':'application/json',}
    });
}

/**
 * Obtengo las metas del paciente
 * @param {*} pat 
 */
export function getGoals(pat){
    return fetch('http://api-rest-botic.herokuapp.com/api/goals/buscar',{
        method: 'POST',
        body: JSON.stringify({ pat}),
        headers: {'Content-Type':'application/json',}
    });
}


/**
 * Actualizo información medica del paciente, valor del findrisk y si es diabetico
 * @param {*} testFindrisk 
 * @param {*} isDiabetic 
 * @param {*} patient 
 */
export function setFindriskVal(testFindRisk, isDiabetic, patient){
    return fetch('http://api-rest-botic.herokuapp.com/api/medicalInfos/',{
        method: 'PUT',
        body: JSON.stringify({testFindRisk, isDiabetic, patient}),
        headers: {'Content-Type':'application/json',}
    });
}


/**
 * Obtener el valor del findrisk
 * @param {*} patient 
 */
export function getFindriskVal(patient){
    return fetch('http://api-rest-botic.herokuapp.com/api/medicalInfos/findTestfr',{
        headers: {'Content-Type':'application/json','patient':patient}
    });
}


/**
 * Guardar un mensaje del doctor para el paciente
 * @param {*} description
 * @param {*} date
 * @param {*} patient
 * @param {*} doctor 
 * @param {*} doctorName
 * @param {*} subject
 */
export function setMessages(description, date, patient, doctor, doctorName, subject){
    return fetch('http://api-rest-botic.herokuapp.com/api/messagesD/',{
        method: 'POST',
        body: JSON.stringify({description, date, patient, doctor, doctorName, subject}),
        headers: {'Content-Type':'application/json',}
    });
}


/**
 * Obtener lista de mensajes por doctor
 * @param {*} doctor
 * @param {*} patient
 */
export function getMessages(doctor, patient){
    return fetch('http://api-rest-botic.herokuapp.com/api/messagesD/findByDocandP',{
        method: 'GET',
        headers: {'Content-Type':'application/json','doctor': doctor,'patient': patient}
    });
}


/**
 * Escribir modelo bayesiano
 * @param {*} patient
 */
export function createModel(patient){
    return fetch('http://api-rest-botic.herokuapp.com/api/bayesianModel',{
        method: 'POST',
        headers: {'Content-Type':'application/json',},
        body: JSON.stringify({"r": 0, "s": 0, patient})
    });
}