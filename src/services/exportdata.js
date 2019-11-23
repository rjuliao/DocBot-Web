/*
import Excel from 'exceljs';
/**
 * Creación del file
 * 
 
export function getFile(ids){ 
    var baseUrl= `https://api-rest-botic.herokuapp.com/api/`;
    var method= 'POST';
    var body= ids;
    //var headers= { 'Content-Type':'application/json', };
    // A new Excel Work Book
    var workbook = new Excel.Workbook();
    // Some information about the Excel Work Book.
    workbook.creator = 'DocBot';
    // Create a sheet
    var sheet1 = workbook.addWorksheet('Info_Personal_Pacientes');
    var sheet2 = workbook.addWorksheet('Info_Medica_Pacientes');
    var sheet3 = workbook.addWorksheet('Pesos_Pacientes');
    var sheet4 = workbook.addWorksheet('Metas_Pacientes');
    var sheet5 = workbook.addWorksheet('Paraclinicos_Pacientes');
    // A table header
    sheet1.columns = [
        { header: 'Id', key: 'id' },
        { header: 'Nombre completo', key: 'fullname' },
        { header: 'Fecha de nacimiento', key: 'birthdate' },
        { header: 'Edad', key: 'age' },
        { header: 'Tipo de documento', key: 'documentType' },
        { header: 'Número de documento', key: 'documentNumber' },
        { header: 'sexo', key: 'sex' },
        { header: 'correo', key: 'email' },
        { header: 'Estado civil', key: 'statusc' },
        { header: 'Estrato socioeconómico', key: 'socioeconomic' },
        { header: 'Nivel Educativo', key: 'educaLevel' },
        { header: 'Tabaquismo', key: 'smoking' },
        { header: 'Id_doctor', key: 'doc' }
    ]
    // A table header info medica
    sheet2.columns = [
        { header: 'Id_Paciente', key: 'idPat' },
        { header: 'Contexto clinico', key: 'clinicalContext' },
        { header: 'Test Findrisc', key: 'testFindRisk' },
        { header: 'Centro médico', key: 'medicalCenter' },
        { header: 'Es diabetico?', key: 'isDiabetic' },
        { header: 'Perímetro abdominal', key: 'abdominalperimeter' },
        { header: 'IMC', key: 'imc' },
        { header: 'Altura', key: 'height' }
    ]
    // A table header pesos
    sheet3.columns = [
        { header: 'IdPaciente', key: 'idP' },
        { header: 'Valor', key: 'value' },
        { header: 'Fecha', key: 'date' }
    ]
    // A table header metas
    sheet4.columns = [
        { header: 'IdPaciente', key: 'idP' },
        { header: 'Fecha de inicio', key: 'creationDate' },
        { header: 'Fecha de vencimiento', key: 'dueDate' },
        { header: 'Fecha de cumplimiento', key: 'complianceDate' },
        { header: 'Descripción', key: 'description' },
        { header: 'Cantidad', key: 'quantity' },
        { header: 'Medida', key: 'quantityType' },
        { header: 'Frecuencia', key: 'frequency' },
        { header: 'Estado', key: 'state' },
        { header: 'Progreso', key: 'progress' },
        { header: 'Número_Mensajes', key: 'nMessages' }
    ]
    // A table header paraclinicos
    sheet5.columns = [
        { header: 'IdPaciente', key: 'idP' },
        { header: 'Fecha', key: 'date' },
        { header: 'Tipo', key: 'type' },
        { header: 'Valor', key: 'value' },
        { header: 'Comentario', key: 'comment' }
    ]
    request(baseUrl+`patients/exportData`, method,ids).then(response => {
        console.log(response)
        return response.json();
    }).then(users => {
      for(var i in user){
        var user = users[i];
        sheet1.addRow({id: user.id, fullname: user.name +' '+user.lastName, birthdate: user.birthdate, age: user.age,
                documentType: user.documentType, documentNumber: user.documentNumber, sex: user.sex, email:user.email,
                doc: user.doc, statusc: user.civilStatus, socioeconomic: user.socioeconomic,educaLevel: user.educationLevel,
                smoking: user.smoking });
      }
    
    }).catch(error => {
        console.log(error.message);
    });
    request(baseUrl+`medicalInfos/exportData`, method,ids).then(response => {
        console.log(response)
        return response.json();
    }).then(infoms => {
      for(var i in infoms){
        var infom = infoms[i];
        sheet2.addRow({idPat: infom.patient, clinicalContext: infom.clinicalContext , testFindRisk: infom.testFindRisk,
        medicalCenter: infom.medicalCenter, isDiabetic:infom.isDiabetic , abdominalperimeter: infom.abdominalperimeter,
        imc: infom.imc, height: infom.height});
        const pesos = infom.weight;
        for(var j in pesos){
           sheet3.addRow({id: infom.patient, value: pesos[i].value, date: pesos[j].date,});
        } 
      }
    
    }).catch(error => {
        console.log(error.message);
     });
    request(baseUrl+`goals/`, 'GET',).then(response => {
        console.log(response)
        return response.json();
      }).then(goals => {
      for(var j in ids){
          for(var i in goals){
            var goal = goals[i];
            if(ids[j].id == goal.patient){
                sheet4.addRow({idP: goal.patient, creationDate: goal.creationDate, dueDate: goal.dueDate, complianceDate: goal.complianceDate,
                description: goal.description, quantity: goal.quantity, quantityType: '', frequency: goal.frequency, state:goal.state,
                progress: goal.progress, nMessages: goal.nMessages }); 
            }
          }
      }
    }).catch(error => {
        console.log(error.message);
     });
  
    request(baseUrl+`paraclinicals/`, 'GET',).then(response => {
        console.log(response)
        return response.json();
      }).then(pcs => {
      for(var j in ids){
          for(var i in pcs){
            var pc = pcs[i];
             if(ids[j].id == pc.patient){
                sheet5.addRow({idP: pc.patient, date: pc.date, type: pc.type, value: pc.value, comment: pc.comment});
            }
          }
      }
    
    }).catch(error => {
        console.log(error.message);
     });
    // Save Excel on Hard Disk
    workbook.xlsx.writeFile("Datos_Pacientes.xlsx")
    .then(function() {
        // Success Message
        alert("File Saved");
    });
    
}

export function request(url, method, body){
    console.log(url)
    console.log(method)
    console.log(body)
    return fetch(url,{ 
        method: method, 
        body: body, 
        headers:  { 'Content-Type':'application/json', }
    });
}


*/