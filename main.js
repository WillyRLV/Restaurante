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

//ramawill
function setAutomatic() {
    var id = "1e3W4zaDx8ByhuWEKyBTx9FwTQa_-jW1MnrGYRO3nol0";
    var ss = SpreadsheetApp.openById(id);
    var data = ss.getSheetByName("base");
    let val1 = data.getRange("A2").getValue();
    let val2 = data.getRange('B2').getValue();

    return [val1, val2]

}

//test
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
            prec: dato[4]
        }

        datoe.push(proyectos)
        obj = { status: "200", proyectos: datoe }
    })


    return obj
}
//comandas
function dataCom() {

    var id = "16i_ZO2y0K4umabI3bJDPFm01RilUpwjlu1pT3hCdwZU";
    var ss = SpreadsheetApp.openById(id);
    var hojaUsuarios = ss.getSheetByName("Comandas");
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

//pedidos realizados

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


function onEdit(data) {

    var archivo = SpreadsheetApp.openById('16i_ZO2y0K4umabI3bJDPFm01RilUpwjlu1pT3hCdwZU')
    var holadatos = archivo.getSheetByName('Comandas');
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

//Codigo gs JP
//------------------------
function doGet(e) {
    if (e.parameter.page) {
        var pageName = e.parameter.page.trim().toLowerCase();
        if (pageName !== "index_login") {
            var template = HtmlService.createTemplateFromFile(pageName);
            template.url = getPageUrl();
            var output = template.evaluate();
            var htmlOutput = HtmlService.createHtmlOutput(output);
            htmlOutput.addMetaTag('viewport', 'width=device-width, initial-scale=1');
            return htmlOutput;
        } else {
            return homePage();
        }
    } else {
        return homePage();
    }
}


function homePage() {
    var pages = ['interfaz', 'pizarra','pedidoadmin'];
    var urls = pages.map(function (name) {
        return getPageUrl(name);
    });
    var template = HtmlService.createTemplateFromFile("index_login");
    template.test = urls;
    var output = template.evaluate();
    var htmlOutput = HtmlService.createHtmlOutput(output);
    htmlOutput.addMetaTag('viewport', 'width=device-width, initial-scale=1');

    return htmlOutput;
}


function getPageUrl(name) {
    if (name) {
        var url = ScriptApp.getService().getUrl();
        return url + "?page=" + name;
    } else {
        return ScriptApp.getService().getUrl();
    }
}



//============

function include(filename) {
    return HtmlService.createHtmlOutputFromFile(filename).getContent();
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

