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
//-------------------------------------------------
// function doGet() {
//   var template = HtmlService.createTemplateFromFile('index_cliente')
//   let output = template.evaluate();
//   let mobil = HtmlService.createHtmlOutput(output);
//   mobil.addMetaTag('viewport', 'width=device-width, initial-scale=1');
//   return mobil;
// }

function doGet(e) {
  if(e.parameter.page){
    var pageName = e.parameter.page.trim().toLowerCase();
    if (pageName !== "loginComida"){
      var template = HtmlService.createTemplateFromFile(pageName);
      template.url = getPageUrl();
      var output = template.evaluate();
      var htmlOutput = HtmlService.createHtmlOutput(output);   
     htmlOutput.addMetaTag('viewport', 'width=device-width, initial-scale=1');   
      return htmlOutput;
    }else{
      return homePage();
    }
  }else{
    return homePage();
  }
}


function homePage(){
  var pages = ['indexcliente' , 'indexcarrito','interfaz','pizarra','pedidoadmin','index_login'];
var urls = pages.map(function(name){
 return getPageUrl(name);
});
var template = HtmlService.createTemplateFromFile("loginComida");
template.test = urls;
var output = template.evaluate();
var htmlOutput = HtmlService.createHtmlOutput(output);   
  htmlOutput.addMetaTag('viewport', 'width=device-width, initial-scale=1');   

return htmlOutput;
}


function getPageUrl(name){
  if (name){
    var url = ScriptApp.getService().getUrl();
    return url + "?page=" + name;
  }else{
    return ScriptApp.getService().getUrl();
  }
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
    {
      nomb: dato[1],
      img: dato[2],
      dec: dato[3],
      prec: dato[4],
      id: dato[0],
      cat: dato[5]
    }

    datoe.push(proyectos)
    obj = { status: "200", proyectos: datoe }
  })


  return obj
}

//CRUD DE COMIDAS
function registrarPlato(contacto,archivoimg) {  
  var id = "16i_ZO2y0K4umabI3bJDPFm01RilUpwjlu1pT3hCdwZU";
  var SS = SpreadsheetApp.openById(id);
  var ws = SS.getSheetByName("Comidas");
  var rp='';
  var head_url="http://drive.google.com/uc?export=view&id=";
  

    // Funcion Imagen 
    //  var x= uploadFiles(archivoimg)
    // if(archivoimg){
      let blob=Utilities.newBlob(archivoimg.bytes, archivoimg.mimeType,archivoimg.filename);
      let archivo=DriveApp.getFolderById('1iFGJMeJrqACG3FGHZCgKOIB-wit44wY_');
      var createFile = archivo.createFile(blob);
      // return createFile.getId();
    // }

    const imgplato=head_url+createFile.getId();

    //================================================
      rp='false';
      ws.appendRow([`f${contacto.id_pe}`,contacto.nom_pe,imgplato,contacto.dec_pe,contacto.prec_pe,contacto.cat_pe]);

    return rp;
}

function actualizar_plato(val) {
  var id = "16i_ZO2y0K4umabI3bJDPFm01RilUpwjlu1pT3hCdwZU";
  var ss = SpreadsheetApp.openById(id);
  var colUser = ss.getSheetByName("Comidas");
  var userDates = colUser.getDataRange().getValues();
  
  var obj={}

   for (var fila = 1; fila < userDates.length; fila++){

     if (val.toString() === userDates[fila][0].toString()){
      var id_p1 = userDates[fila][0];
       var nom_p1= userDates[fila][1];     
       var link_p1= userDates[fila][2];  
       var dec_p1= userDates[fila][3];  
       var pre_p1= userDates[fila][4];
       var cat_p1= userDates[fila][5];  

       obj={id_p1:id_p1,nom_p1:nom_p1,link_p1:link_p1,dec_p1:dec_p1,pre_p1:pre_p1,cat_p1,cat_p1}
     } 
   }

   return obj; 
}

function actualizar(contacto,archivoimg){
  var id = "16i_ZO2y0K4umabI3bJDPFm01RilUpwjlu1pT3hCdwZU";
  var SS = SpreadsheetApp.openById(id);
  var ws = SS.getSheetByName("Comidas");
  var cantFila = ws.getDataRange().getValues();
  var cantFila1 = ws.getMaxRows();

   var head_url="http://drive.google.com/uc?export=view&id=";
  
  if(archivoimg){
    // Funcion Imagen 
      var blob=Utilities.newBlob(archivoimg.bytes, archivoimg.mimeType,archivoimg.filename);
      let archivo=DriveApp.getFolderById('1iFGJMeJrqACG3FGHZCgKOIB-wit44wY_');
      var createFile = archivo.createFile(blob);

    const imgplato=head_url+createFile.getId();

    contacto.img_pe=imgplato;

  }
  
    for (var fila = 2; fila <= cantFila1; fila++){
      
      if (contacto.id_pe === cantFila[fila-1][0].toString()){

          ws.getRange("B"+(fila).toString()).setValue(contacto.nom_pe);
          ws.getRange("C"+(fila).toString()).setValue(contacto.img_pe);
          ws.getRange("D"+(fila).toString()).setValue(contacto.dec_pe);
          ws.getRange("E"+(fila).toString()).setValue(contacto.prec_pe);
          ws.getRange("F"+(fila).toString()).setValue(contacto.cat_pe);
          
          break;
      }
    }


    
}


function eliminar_plato(val){

  var id = "16i_ZO2y0K4umabI3bJDPFm01RilUpwjlu1pT3hCdwZU";
  var ss = SpreadsheetApp.openById(id);
  var colUser = ss.getSheetByName("Comidas");
  var userDates = colUser.getDataRange().getValues();
  

   for (var fila = 1; fila < userDates.length; fila++){
     var id = userDates[fila][0];
      console.log(id)
     if (val.toString() === id.toString()){
       colUser.deleteRow(fila+1);
        SpreadsheetApp.flush();
     } 
   }
}


//============================================================================

function postPedido(id,nombre,apellido,distrito,direccion,referencia,telefono,comentario,comida,cantidad,precio_unidad,precio_unidad_total,precio_total,metodoPago,montoPago){
  var idsheet = "16i_ZO2y0K4umabI3bJDPFm01RilUpwjlu1pT3hCdwZU";
  var ss = SpreadsheetApp.openById(idsheet);
  var hojaUsuarios = ss.getSheetByName("Comandas");

  const tiempo = new Date();
  const fecha =tiempo.getDate() + "/" + (tiempo.getMonth()+1) + "/" + tiempo.getFullYear()
  const hora =tiempo.getHours() + ":" + tiempo.getMinutes() + ":" + tiempo.getSeconds() 
  
  hojaUsuarios.appendRow([id.toString(),nombre,apellido,distrito,direccion,referencia,telefono,comentario,comida,cantidad,`'${fecha}`,`'${hora}`,precio_unidad,precio_unidad_total,precio_total,metodoPago,montoPago]);
  obj = { status: "200"}
  return obj;
}

//==========================================================================

//rama william

//comandas
function dataCom() {

  var id = "16i_ZO2y0K4umabI3bJDPFm01RilUpwjlu1pT3hCdwZU";
  var ss = SpreadsheetApp.openById(id);
  var hojaUsuarios = ss.getSheetByName("PedidosConfirmados");
  var datos = hojaUsuarios.getDataRange().getValues();
  datos.shift();
  var obj = {}
  var datoe = []
  // const valor1 = '95b9f5f3f74dc330b57a9bfbc74be654'
  //========================
  //con foreach
  datos.map((dato) => {

      const proyectos =
      {   id: dato[0].toString(),
          nombre: dato[1].toString(),
          apellido: dato[2].toString(),
          distrito: dato[3].toString(),
          direccion: dato[4].toString(),
          referencia: dato[5].toString(),
          telefono: dato[6].toString(),
          comentario: dato[7].toString(),
          pedidos: dato[8].toString(),
          cantidad: dato[9].toString(),
          fecha: dato[10].toString(),
          hora: dato[11].toString(),
          preciounidad: dato[12].toString(),
          preciot: dato[14].toString(),
          metodoPago: dato[15].toString(),
      }

      datoe.push(proyectos)
      obj = { status: "200", proyectos: datoe }
  })


  return obj
}


function pedidoComAd() {

  var id = "16i_ZO2y0K4umabI3bJDPFm01RilUpwjlu1pT3hCdwZU";
  var ss = SpreadsheetApp.openById(id);
  var hojaUsuarios = ss.getSheetByName("Pedidos");
  var datos = hojaUsuarios.getDataRange().getValues();
  datos.shift();
  var obj = {}
  var datoe = []
  // const valor1 = '95b9f5f3f74dc330b57a9bfbc74be654'
  //========================
  //con foreach
  datos.map((dato) => {

      const proyectos =
      {   id: dato[0].toString(),
          nombre: dato[1].toString(),
          apellido: dato[2].toString(),
          distrito: dato[3].toString(),
          direccion: dato[4].toString(),
          referencia: dato[5].toString(),
          telefono: dato[6].toString(),
          comentario: dato[7].toString(),
          pedidos: dato[8].toString(),
          cantidad: dato[9].toString(),
          fecha: dato[10].toString(),
          hora: dato[11].toString(),
          preciounidad: dato[12].toString(),
          preciot: dato[14].toString(),
          metodoPago: dato[15].toString(),
      }

      datoe.push(proyectos)
      obj = { status: "200", proyectos: datoe }
  })


  return obj
}

function ingresar(correo, contraseña) {
  var id = "16i_ZO2y0K4umabI3bJDPFm01RilUpwjlu1pT3hCdwZU";
  var ss = SpreadsheetApp.openById(id);
  var hojaUsuarios = ss.getSheetByName("Administrador");
  var datos = hojaUsuarios.getDataRange().getValues();
  //datos.shift();
  var obj = {}
  datos.forEach((dato) => {
      if (dato[2] === correo && dato[4] === contraseña) {
          obj = { status: "200", nombrecompleto: `${dato[0]} ${dato[1]}` }
      }

      if (dato[2] === correo && dato[4] !== contraseña) {
          obj = { status: "401" }
      }

      if (Object.entries(obj).length === 0) {
          obj = { status: "404" }
      }
  })


  return obj
}


function onEdit(data) {

  var archivo = SpreadsheetApp.openById('16i_ZO2y0K4umabI3bJDPFm01RilUpwjlu1pT3hCdwZU')
  var holadatos = archivo.getSheetByName('PedidosConfirmados');
  var holadatos2 = archivo.getSheetByName('Pedidos');
  var datos = holadatos.getDataRange().getValues()
  // let val1 = data.getRange("A2").getValue();
  datos.shift()
  // var id = 'co7i7QU'
  datos.map((dato, index) => {

    if (dato[0] === data) {
        holadatos2.appendRow(dato)
        holadatos.deleteRow(index + 2)
        console.log("listo")
    
    }
  })
  
}
//=========================

//geteamil


 function getemail(email,nombre,val3,val4,val5,val6){


var bodyem = HtmlService.createHtmlOutputFromFile("bodyemail").getContent();
// var date = new Date(year,month,day);
bodyem= bodyem.replace("{{nombre}}",nombre);
bodyem= bodyem.replace("{{compras}}",val3);
bodyem= bodyem.replace("{{cantidades}}",val4);
bodyem= bodyem.replace("{{prec_uni}}",val5);
bodyem= bodyem.replace("{{total}}",val6);




 MailApp.sendEmail (
   {
     to: email ,
     subject: "Excelente",
    htmlBody:bodyem,
     name: "Pedido restaurante.",
   }
 )

return 'enviado'
 }


 function getemailAd(nombre,val3,val4,val5,val6,val7,val8){


  var bodyemcom = HtmlService.createHtmlOutputFromFile("bodyemailcom").getContent();
  // var date = new Date(year,month,day);
  bodyemcom= bodyemcom.replace("{{nombre}}",nombre);
  bodyemcom= bodyemcom.replace("{{compras}}",val3);
  bodyemcom= bodyemcom.replace("{{cantidades}}",val4);
  bodyemcom= bodyemcom.replace("{{prec_uni}}",val5);
  bodyemcom= bodyemcom.replace("{{total}}",val6);
  bodyemcom= bodyemcom.replace("{{met_pago}}",val7);
  bodyemcom= bodyemcom.replace("{{efectivo}}",val8);


  
  
  
  
   MailApp.sendEmail (
     {
       to: 'rriveroa@hyfconsult.com' ,
       subject: `Registro de compra del cliente ${nombre}`,
      htmlBody:bodyemcom,
       name: `pedido realizado por ${nombre}`,
     }
   )
  
  return 'enviado'
   }



   
   //funciones nuevas 

   function checkpedido(idp) {
    var id = "16i_ZO2y0K4umabI3bJDPFm01RilUpwjlu1pT3hCdwZU";
    var ss = SpreadsheetApp.openById(id);
    var hojaUsuarios = ss.getSheetByName("Comandas");
    var datos = hojaUsuarios.getDataRange().getValues();
    //datos.shift();
    var obj = {}
    datos.forEach((dato) => {
        if (dato[0] === idp ) {
            obj = { status: "200", idped:dato[0],  nombrecompleto: `${dato[1]} ${dato[2]}` }
        }
  
      
  
        if (Object.entries(obj).length === 0) {
            obj = { status: "404" }
        }
    })
  
  
    return obj
  }


  function PedConfirmado(data) {

    var archivo = SpreadsheetApp.openById('16i_ZO2y0K4umabI3bJDPFm01RilUpwjlu1pT3hCdwZU')
    var holadatos = archivo.getSheetByName('Comandas');
    var holadatos2 = archivo.getSheetByName('PedidosConfirmados');
    var datos = holadatos.getDataRange().getValues()
    // let val1 = data.getRange("A2").getValue();
    datos.shift()
    // var id = 'co7i7QU'
    datos.map((dato, index) => {
  
      if (dato[0] === data) {
          holadatos2.appendRow([
            dato[0],
            dato[1],
            dato[2],
            dato[3],
            dato[4],
            dato[5],
            dato[6],
            dato[7],
            dato[8],
            dato[9],
            `'${dato[10]}`,
            `'${dato[11]}`,
            dato[12],
            dato[13],
            dato[14],
            dato[15],
            dato[16],
          ])
          holadatos.deleteRow(index + 2)
          console.log("listo")
      
      }
    })
    
  }