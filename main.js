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

//Codigo gs JP
//------------------------
function doGet() {
     var template = HtmlService.createTemplateFromFile('interfaz-cartas')
     let output = template.evaluate();
     let mobil = HtmlService.createHtmlOutput(output);
     mobil.addMetaTag('viewport', 'width=device-width, initial-scale=1');  
    return mobil;
}

//============
    
function include(filename){
    return HtmlService.createHtmlOutputFromFile(filename).getContent();
}