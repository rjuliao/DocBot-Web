/**
 * Inicio de sesión del usuario
 * @param {*} email 
 * @param {*} password 
 */
export function signIn(email,password){ 
    return fetch(`https://api-rest-botic.herokuapp.com/api/doctors/login`,{ 
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
    return fetch('https://api-rest-botic.herokuapp.com/api/doctors',{
        method: 'POST',
        body: JSON.stringify({name, lastName, email, medicalCenter, password}),
        headers: {'Content-Type':'application/json',}
    });
}

/**
 * Cambiar contraseña del medico
 * @param {*} email 
 * @param {*} password 
 */
export function changePass(email, newpassword){
    return fetch('https://api-rest-botic.herokuapp.com/api/doctors/changepass',{
        method: 'PUT',
        headers: {'Content-Type':'application/json','email':email,'newpassword':newpassword}
    });
}

/**
 * Obtener código de verificación
 * @param {*} email 
 */
export function getCode(email){
    return fetch('https://api-rest-botic.herokuapp.com/api/doctors/codever',{
        method: 'GET',
        headers: {'Content-Type':'application/json','email': email}
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
 * @param {*} sex 
 * @param {*} password 
 * @param {*} doc
 * @param {*} avatar
 * @param {*} dateAssociation
 * @param {*} steps
 */
export function regPaciente(name, lastName, birthdate, age, documentType, documentNumber,
     sex, password,email, doc, avatar, dateAssociation, steps){
    
    return fetch('https://api-rest-botic.herokuapp.com/api/patients/',{
        method: 'POST',
        body: JSON.stringify({name, lastName, birthdate, age, documentType, documentNumber, weight, height, 
            sex, password, email, doc, avatar, dateAssociation, steps}),
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
 * @param {*} weight 
 * @param {*} height 
 * @param {*} abdominalperimeter
 * @param {*} patient 
 */
export function medicalInfos(clinicalContext, medicalCenter, testFindRisk, isDiabetic, weight, height,abdominalperimeter, patient){
    return fetch('https://api-rest-botic.herokuapp.com/api/medicalInfos',{
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

    return fetch('https://api-rest-botic.herokuapp.com/api/medicalInfos/buscar',{
        method: 'GET',
        headers: {'Content-Type':'application/json','patient':patient}
    });
}

/**
 * Actualizar peso
 * @param {*} id 
 * @param {*} weight 
 */
export function updateWeight(id, weight, date){
   
    return fetch('https://api-rest-botic.herokuapp.com/api/medicalInfos/updateweight',{
        method: 'PUT',
        body: JSON.stringify({weight, id, date}),
        headers: {'Content-Type':'application/json',}
    });
    
 }

/**
 * Obtengo el peso del paciente
 * @param {*} id 
 */
export function getWeight(id){
   
   return fetch('https://api-rest-botic.herokuapp.com/api/medicalInfos/getweight',{
       method: 'GET',
       headers: {'Content-Type':'application/json','id':id}
   });
   
}

/**
 * Obtengo una lista de pacientes a partir del id de doctor
 * @param {*} doc 
 */
export function getPatients(doc){
    return fetch('https://api-rest-botic.herokuapp.com/api/patients/buscar',{
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
    return fetch('https://api-rest-botic.herokuapp.com/api/patients/edit',{
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
    return fetch('https://api-rest-botic.herokuapp.com/api/patients/delete',{
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
 * @param {*} date
 */
export function setParaclinico(type, value, comment,  patient, date){

    return fetch('https://api-rest-botic.herokuapp.com/api/paraclinicals/',{
        method: 'POST',
        body: JSON.stringify({type, value, comment,  patient, date}),
        headers: {'Content-Type':'application/json',}
    });
}


/**
 * Obtengo el paraclinico
 * @param {*} patient 
 */
export function getParaclinico(patient){
    return fetch('https://api-rest-botic.herokuapp.com/api/paraclinicals/buscar',{
        headers: {'Content-Type':'application/json','patient':patient,}
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
export function setGoal(description, state, quantity,  frequency, 
     pat, dueDate, progress, tag, nMessages, creationDate, complianceDate){
    return fetch('https://api-rest-botic.herokuapp.com/api/goals/',{
        method: 'POST',
        body: JSON.stringify({description, state, quantity,  
            frequency, pat, dueDate, progress, tag,nMessages, creationDate, complianceDate }),
        headers: {'Content-Type':'application/json',}
    });
}

/**
 * Obtengo las metas del paciente
 * @param {*} pat 
 */
export function getGoals(pat){
    return fetch('https://api-rest-botic.herokuapp.com/api/goals/buscar',{
        method: 'POST',
        body: JSON.stringify({ pat}),
        headers: {'Content-Type':'application/json',}
    });
}

/**
 * Actualizar una meta
 * @param {*} description 
 * @param {*} quantity 
 * @param {*} frequency 
 * @param {*} dueDate 
 */
export function editGoal(description, quantity, frequency, dueDate){
    return fetch('https://api-rest-botic.herokuapp.com/api/goals/putgoal',{
        method: 'PUT',
        body: JSON.stringify({description, quantity, frequency, dueDate }),
        headers: {'Content-Type':'application/json',}
    });
}
/**
 * Obtengo TODAS las metas predefinidas
 */
export function getGoalsP(){
    return fetch('https://api-rest-botic.herokuapp.com/api/goalps',{
        method: 'GET',
        headers: {'Content-Type':'application/json',}
    });
}

/**
 * Creo una meta predefinida
 * @param {*} description 
 */
export function setGoalsP(description){
    return fetch('https://api-rest-botic.herokuapp.com/api/goalps',{
        method: 'POST',
        body: JSON.stringify({ description}),
        headers: {'Content-Type':'application/json',}
    });
}
/**
 * Borrar una meta--- ese id es el de la meta.
 * @param {*} id  
 */
export function deleteGoal(id){
    return fetch('https://api-rest-botic.herokuapp.com/api/goals/delete',{
        method: 'DELETE',
        headers: {'Content-Type':'application/json','id':id}
    });
}
/**
 * Actualizo información medica del paciente, valor del findrisk y si es diabetico
 * @param {*} testFindrisk 
 * @param {*} isDiabetic 
 * @param {*} patient 
 * @param {*} imc
 * @param {*} height
 
 */
export function setFindriskVal(testFindRisk, isDiabetic, patient, imc, height){
    return fetch('https://api-rest-botic.herokuapp.com/api/medicalInfos/',{
        method: 'PUT',
        body: JSON.stringify({testFindRisk, isDiabetic, patient, imc, height}),
        headers: {'Content-Type':'application/json',}
    });
}


/**
 * Obtener el valor del findrisk
 * @param {*} patient 
 */
export function getFindriskVal(patient){
    return fetch('https://api-rest-botic.herokuapp.com/api/medicalInfos/findTestfr',{
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
    return fetch('https://api-rest-botic.herokuapp.com/api/messagesD/',{
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
    return fetch('https://api-rest-botic.herokuapp.com/api/messagesD/findByDocandP',{
        method: 'GET',
        headers: {'Content-Type':'application/json','doctor': doctor,'patient': patient}
    });
}


/**
 * Escribir modelo bayesiano
 * @param {*} patient
 */
export function createModel(patient){
    return fetch('https://api-rest-botic.herokuapp.com/api/bayesianModel',{
        method: 'POST',
        headers: {'Content-Type':'application/json',},
        body: JSON.stringify({"r": 0, "s": 0, patient})
    });
}
