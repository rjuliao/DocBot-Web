/**
 * Inicio de sesión del usuario
 * @param {*} email 
 * @param {*} password 
 */
export function signIn(email,password){ 
    return fetch(`http://localhost:8080/api/doctors/login`,{ 
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
    return fetch('http://localhost:8080/api/doctors',{
        method: 'POST',
        body: JSON.stringify({name, lastName, email, medicalCenter, password}),
        headers: {'Content-Type':'application/json',}
    });
}