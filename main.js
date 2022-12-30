//aquí codigo identificado
//doget prueba
// function doGet() {
//     var template = HtmlService.createTemplateFromFile('index')
//     let output = template.evaluate();
//     let mobil = HtmlService.createHtmlOutput(output);
//     mobil.addMetaTag('viewport', 'width=device-width, initial-scale=1');  
//     return mobil;
// }
//==============================


// Rama Cliente JP
function doGet() {
  var template = HtmlService.createTemplateFromFile('index_cliente')
  let output = template.evaluate();
  let mobil = HtmlService.createHtmlOutput(output);
  mobil.addMetaTag('viewport', 'width=device-width, initial-scale=1');
  return mobil;
}

function include(filename) {
  return HtmlService.createHtmlOutputFromFile(filename).getContent();
}

function dataFood() {
 
  var id = "16i_ZO2y0K4umabI3bJDPFm01RilUpwjlu1pT3hCdwZU";
  var ss = SpreadsheetApp.openById(id);
  var hojaUsuarios = ss.getSheetByName("Comidas");
  var datos = hojaUsuarios.getDataRange().getValues();
  datos.shift();
  var obj = {}
  var datoe = []
    // const valor1 = '95b9f5f3f74dc330b57a9bfbc74be654'

  //========================
  //con foreach
   datos.map((dato) => {
    
       const proyectos = 
         {nomb: dato[1],
         img: dato[2],
         dec: dato[3],
         prec:dato[4],
         id:dato[0]
       }
       
        datoe.push(proyectos)
          obj = { status: "200", proyectos: datoe  }
  })
   

return obj
}

//==========================================================================