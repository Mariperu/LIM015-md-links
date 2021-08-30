//FUNCIONES PARA EXTRAER INFORMACION DE LINKS en array

//TERMINAL: node ./src/api/filesLinks.js ./test/directory


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
  readFileMd,
} = require('./path');
const {
  searchFilesMd, //array
} = require('./filesMd');

//const myPath = process.argv[2];


//VERIFICA SI archivo.md TIENE LINKS, Y GUARDANDO SUS PROPIEDADES {href, text, file} EN ARRAY***
const linksOfFileMd = (myPath) => {
  const arrayFilesMd = searchFilesMd(myPath);
  const arrayLinksProperties = [];
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
      arrayLinksProperties.push({ //Ejm: <a href="https://example.com">text</a>
        href: link.href,
        text: link.text,
        file: fileMd,
      });
    });
  });
  return arrayLinksProperties;
};
//console.log(linksOfFileMd(myPath));


//ALMACENANDO STATUS DE LINKS {href, text, file, status, statusText} EN ARRAY***
const linksStatus = (arrayLinks) => {
  const arrayLinksStatus = [];
  arrayLinks.forEach((link) => {
    //fetch(url) devuelve una promesa, promesa devuelve un objeto con datos del link
    arrayLinksStatus.push(fetch(link.href)
      .then((response) => { //Cuando promesa es resuelta, response es un callback
        //console.log(response);
        if (response.status >= 200 && response.status < 400) {
          return {
            file: link.file,
            href: link.href,
            text: link.text,
            status: response.status,
            statusText: 'ok',
          }
        } else {
          return {
            file: link.file,
            href: link.href,
            text: link.text,
            status: response.status,
            statusText: 'fail',
          }
        }
      })
      .catch(() => { //Cuando promesa es rechazada //Rejected
        return {
          file: link.file,
          href: link.href,
          text: link.text,
          status: 404,
          statusText: 'fail',
        }
      }));
  });
  //Promise.all: método estático.
  //Cuando se hayan ejecutado todas las peticiones se cumplirá la promesa.
  return Promise.all(arrayLinksStatus);
}
//linksStatus(linksOfFileMd(myPath)).then((resp) => console.log((resp)));


module.exports = {
  linksOfFileMd, //array
  linksStatus, //array de promesas
};
