//FUNCIONES PARA EXTRAER INFORMACION DE LINKS en array

//Ejecutando módulo marked, compilador de bajo nivel, liviano, sencillo
//para analizar archivos markdown, construido para brindar velocidad
//(ayuda a transformar md en html)
const marked = require('marked');
//Ejecutando módulo jsdom, para recrear el DOM en node.js
//Para ejecutar jsdom, se necesita principalmente del constructor JSDOM
const jsdom = require('jsdom');
//JSDOM es una exportación con nombre del módulo principal de jsdom
//Objeto JSDOM, tiene una serie de propiedades útiles.
const {
  JSDOM
} = jsdom;
//Ejecutando módulo "node-fetch", que habilita el uso de fetch()
//Método fecth(), para hacer http require/response asíncronas.
const fetch = require('node-fetch');


const {
  readFileMd, //Lee un archivo en terminal
} = require('./path');


//VERIFICA SI archivo.md TIENE LINKS, Y GUARDANDO SUS PROPIEDADES {href, text, file} EN ARRAY***

const linksOfFileMd = (arrayFilesMd) => {
  const arrayOfLinksProperties = [];
  arrayFilesMd.forEach((fileMd) => {

    //** Pasando texto md a html **
    //marked.lexer(), crea una serie (array) de tokens, que pasará al marked.parser()
    //tokens: objetos {} con propiedades que describen cada parte de texto .md
    const tokens = marked.lexer(readFileMd(fileMd)); //obj describe c/linea del file
    //marked.parser(), procesa cada token en la matriz de tokens (para pasarlo a html).
    const html = marked.parser(tokens);

    //** RECREANDO DOM, se utiliza propiedad "window"
    const dom = new JSDOM(html);
    //Extrayendo links, seleccionando todas las etiquetas <a></a>
    const extractingLinks = dom.window.document.querySelectorAll('a');

    //Almacenando propiedades de cada link en un array de objetos [{}]
    extractingLinks.forEach((link) => {
      arrayOfLinksProperties.push({ //Ejm: <a href="https://example.com">text</a>
        href: link.href, //URL encontrada.
        text: link.text, //Texto que aparecía dentro del link (<a>).
        file: fileMd, //Ruta del archivo donde se encontró el link.
      });
    });
  });
  return arrayOfLinksProperties;
};
//console.log("que hay en cada link?: ", linksOfFileMd([myPath]));



//*****ALMACENANDO STATUS DE LINKS {href, text, file, status, statusText} EN ARRAY***
const linksStatusOfFileMd = (arrayLinks) => {
  //console.log("esto ingresó: ", arrayLinks)
  const arrayOfLinksStatus = [];
  arrayLinks.forEach((link) => {
    //fetch(url) devuelve una promesa, promesa devuelve un objeto con datos del link
    arrayOfLinksStatus.push(fetch(link.href)
      .then((response) => { //Cuando promesa es resuelta, response es un callback //console.log("Resolve", { //Objeto
        if (response.status >= 200 && response.status < 400) {
          return `${link.href}  ${link.text}  ${link.file}  ${response.status}  'ok'`;
        } else {
          return `${link.href}  ${link.text}  ${link.file}  ${response.status}  'fail'`;
        }
      })
      .catch(() => { //Cuando promesa es rechazada //console.log("Rejected", { //Objeto
        return `${link.href}  ${link.text}  ${link.file}  'error'  'fail'`;
      }));
  });
  //Promise.all: método estático. Cuando se hayan ejecutado todas las peticiones se cumplirá la promesa.
  return Promise.all(arrayOfLinksStatus);
  //return arrayOfLinksStatus;
}
// Promise.all(linksStatusOfFileMd(linksOfFileMd([myPath]))).then((resp) => console.log((resp)));
//linksStatusOfFileMd(linksOfFileMd([myPath])).then((resp) => console.log((resp)));


module.exports = {
  linksOfFileMd, //Lee archivo.md, busca links <a> y almacena sus prop en un array
  linksStatusOfFileMd, //Recibe prop de links, retorna promesas y almacena status de cada link en array
};
