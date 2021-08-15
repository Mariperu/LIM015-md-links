//Ejecutando módulo FileSystem, para interactuar con el sist. de archivos (viene implicito en package.json)
const fs = require('fs');
//Ejecutando módulo chalk, para colocar colores en líneas de comando
const chalk = require('chalk');
//Ejecutando módulo path, contiene utilidades para trabajar con rutas de fichero
const path = require('path');
//Ejecutando módulo marked, compilador de bajo nivel, liviano, sencillo
//para analizar archivos markdown, construido para brindar velocidad
//(ayuda a transformar md en html)
const marked = require('marked');
//Ejecutando módulo jsdom, para recrear el DOM en node.js
//Para ejecutar jsdom, se necesita principalmente del constructor JSDOM
const jsdom = require('jsdom');
//JSDOM es una exportación con nombre del módulo principal de jsdom
//Objeto JSDOM, tiene una serie de propiedades útiles
const {
  JSDOM
} = jsdom;

const fetch = require('node-fetch');

const myPath = process.argv[2];
//*****C:\\Users\\Teo\\Documents\\GitHub\\LIM015-md-links\\fixedPathFiles
//***** ./fixedPathFiles/tips.md
//*** ./fixedPathFiles/tips.txt


//VERIFICANDO SI EXISTE LA RUTA**
// método fs.existsSync(), verifica si existe o no la ruta, **devuelve un booleano**
const isPath = (myPath) => fs.existsSync(myPath);
//console.log("Existe la ruta?: ", isPath(myPath));


//VERIFICANDO SI RUTA ES ABSOLUTA**, de lo contrario, **TRANSFORMAR RELATIVA EN ABSOLUTA**
//método path.isAbsolute, determina si path es ruta absoluta, **devuelve un booleano**
//método path.resolve(), resuelve una secuencia o segmentos de ruta en una **ruta absoluta**
const isPathAbsolute = (myPath) => (path.isAbsolute(myPath)) ?
  myPath : path.resolve(myPath);
//console.log("La ruta absoluta es: ", isPathAbsolute(myPath));


//*VERIFICANDO SI RUTA ABSOLUTA ES ARCHIVO**
//método fs.statSync(),devuelve información de ruta del archivo
//isFile(),verifica si es archivo, **devuelve booleano**
const isPathFile = (pathAbs) => {
  const stat = fs.statSync(pathAbs);
  return stat.isFile();
}
//console.log("ruta es archivo?: ", isPathFile(myPath));


//*****VERIFICANDO SI RUTA ABSOLUTA ES DIRECTORIO**
//método fs.statSync(),devuelve información de ruta del archivo
//isDirectory(),verifica si es directorio, **devuelve booleano**
const isPathDirectory = (pathAbs) => {
  const stat = fs.statSync(pathAbs);
  return stat.isDirectory();
}
//console.log("ruta es Directorio?: ", isPathDirectory(myPath))


//*****MOSTRANDO EXTENSION DE ARCHIVO**
//método path.extname() **devuelve extensión del path** (verifica última aparición de .(punto))
const showingFileExt = (file) => (path.extname(file));
//console.log("extension de archivo es?: ", showingFileExt(myPath))


//*****VERIFICANDO SI ARCHIVO ES .md, luego ALMACENAR en un array**
const isFileMd = (file) => {
  const arrayFileMd = [];
  //Aplicando función para MOSTRAR EXTENSION DE ARCHIVO
  if (showingFileExt(file) === '.md') {
    arrayFileMd.push(file);
  }
  return arrayFileMd;
};
//console.log("Mostrar archivo .md en array: ", isFileMd(myPath))


//*****BUSCANDO ARCHIVOS CON EXTENCION .md en DIRECTORIOS/SUBDIRECTORIOS, y almacenarlos en un array**
const searchFilesMdInDirectory = (pathAbs) => {
  //fs.readdirSync(path[,option]), LEE contenido de un directorio.
  //**devuelve un array con cada nombre de contenido (files y sub-directorios)**
  //[, options] puede ser un encoding, por Ejm: 'utf-8'
  //utf-8: formato de codificación de caracteres Unicode e ISO 10646 que utiliza símbolos de longitud variable.
  const arrayFilesInDirectory = fs.readdirSync(pathAbs, 'utf-8');

  let arrayTotalFilesMd = [];

  arrayFilesInDirectory.forEach((file) => {
    //método path.join(), une ruta absoluta de directorio + nombre archivo.xx, para obtener ruta completa
    const fullPath = path.join(pathAbs, file);

    //Funcion isFileMd: para verificar si archivo es .md, luego lo ALMACENA en un array
    const filesMd = isFileMd(fullPath);
    filesMd.forEach((markdownFile) => {
      arrayTotalFilesMd.push(markdownFile); //para agrupar TODOS los FILES.md en un array
    });

    //Función isPathDirectory: para evaluar si ruta es "sub-directorio"
    if (isPathDirectory(fullPath)) {

      //***FUNCION RECURSIVA***// (se invoca a si mismo; se repite hasta que ya no encuentre files .md)
      //(repite función inicial), para buscar archivos.md en SUB-DIRECTORIOs
      const arrayFilesInSubD = searchFilesMdInDirectory(fullPath);

      //Combinando arrays de archivos .md de cada sub-directorio
      arrayTotalFilesMd = arrayTotalFilesMd.concat(arrayFilesInSubD); //concat: combina arrays
    }
  });
  return arrayTotalFilesMd;
};
//console.log("Contenido de files .md en directorio:\n", searchFilesMdInDirectory(myPath));


//*VERIFICANDO SI archivo.md TIENE LINKS, Y GUARDANDO SUS PROPIEDADES {href, text, file} EN ARRAY***
//validate:false
const linksOfFileMd = (arrayFilesMd) => {
  const arrayOfLinksProperties = [];
  arrayFilesMd.forEach((fileMd) => {

    //*** LEYENDO ARCHIVO .md en terminal***
    //fs.readFileSync(path[, options]); si no se ingresa [, options], devolverá un buffer (binario)
    //[, options] puede ser un encoding, por Ejm: 'utf-8'
    //utf-8: formato de codificación de caracteres Unicode e ISO 10646 que utiliza símbolos de longitud variable.
    const readingFileMd = fs.readFileSync(fileMd, 'utf-8');

    //** Pasando texto md a html **
    //marked.lexer(), crea una serie (array) de tokens, que pasará al marked.parser()
    //tokens: objetos {} con propiedades que describen cada parte de texto .md
    const tokens = marked.lexer(readingFileMd);
    //marked.parser(), procesa cada token en la matriz de tokens (para pasarlo a html).
    const html = marked.parser(tokens);
    //console.log("Texto en html:\n", html)

    //** RECREANDO DOM, se utiliza propiedad "window"
    const dom = new JSDOM(html);
    //Extrayendo links, seleccionando todas las etiquetas <a></a>
    const extractingLinks = dom.window.document.querySelectorAll('a');

    //Almacenando propiedades de cada link en un array de objetos ({})
    extractingLinks.forEach((link) => {
      arrayOfLinksProperties.push({ //Example: <a href="https://example.com">text</a>
        href: link.href, //URL encontrada.
        text: link.text, //Texto que aparecía dentro del link (<a>).
        file: fileMd, //Ruta del archivo donde se encontró el link.
      });
    });
  });
  return arrayOfLinksProperties;
};
//console.log("que hay en cada link?: ", linksOfFileMd([myPath]));
//node api ./fixedPathFiles/tips.md



//***ALMACENANDO STATUS DE LINKS {href, text, file, status, statusText} EN ARRAY***
// validate:true
const validateTrue = (arrayLinks) => {
  //console.log("esto ingresó: ", arrayLinks)
  const arrayOfLinksStatus = [];
  arrayLinks.forEach((link) => {
    //fetch(url) devuelve una promesa, promesa devuelve un objeto con datos del link
    arrayOfLinksStatus.push(fetch(link.href)
      .then((response) => { //Cuando promesa es resuelta
        console.log("Resolve", { //Objeto
          //({ //*
          href: link.href,
          text: link.text,
          file: link.file,
          status: response.status,
          statusText: (response.statusText >= 200 && response.statusText < 400) ?
            'ok' : 'fail',
        });
      })
      .catch(() => { //Cuando promesa es rechazada
        console.log("Rejected", { //Objeto
          //({ //*
          href: link.href,
          text: link.text,
          file: link.file,
          status: "error", //???
          statusText: 'fail' //???
        });
      }));
  });
  return arrayOfLinksStatus;
}
console.log(validateTrue(linksOfFileMd([myPath])));
//validateTrue(linksOfFileMd([myPath]));




module.exports = {
  isPath, //Verifica si existe ruta
  isPathAbsolute, //Verifica y transforma a ruta
  isPathFile, //Verifica si es archivo
  isPathDirectory, //Verifica si es directorio
  showingFileExt, //Muestra extensión de archivo
  isFileMd, //Verifica si file es .md y almacena en un array
  searchFilesMdInDirectory, //Busca archivos.md en directorio/subdirectorio
  linksOfFileMd, //Lee archivo.md, busca links <a> y almacena sus prop en un array
  validateTrue, //Recibe prop de links, retorna promesas y almacena status de cada link en array
};





// //PROBANDO AL INFINITO
// let i = 0;
// setInterval(function () {
//   console.log(i);
//   i++;
// }, 50);





// /********** */
// const responseValidate = (pathValidated, opts) => {
//   if (isPathFile(pathValidated)) {
//     const arrayArchivesMarkdown = isFileMd(pathValidated);
//     const arrayLinksOfMarkdown = linksOfFileMd(arrayArchivesMarkdown);

//     if (arrayLinksOfMarkdown.length > 0) {
//       if ((opts !== undefined) && opts.validate) {
//         return validateTrue(arrayLinksOfMarkdown);
//       }

//       return Promise.resolve(arrayLinksOfMarkdown);
//     }

//     return Promise.resolve('La ruta ingresada corresponde a un archivo que no es markdown.');
//   }

//   const arrayArchivesMarkdown = searchFilesMdInDirectory(pathValidated);
//   const arrayLinksOfMarkdown = linksOfFileMd(arrayArchivesMarkdown);

//   if (arrayLinksOfMarkdown.length > 0) {
//     if ((opts !== undefined) && opts.validate) {
//       return validateTrue(arrayLinksOfMarkdown);
//     }

//     return Promise.resolve(arrayLinksOfMarkdown);
//   }

//   return Promise.resolve('La ruta ingresada corresponde a un directorio vacío o bien, no contiene archivos markdown.');
// };
// console.log("que hay?: ", responseValidate(myPath));
// //console.log("que hay?: ", responseValidate('fixedPathFiles'))
// //console.log("que hay?: ", responseValidate('./fixedPathFiles/moreABC'))
// //console.log("que hay?: ", responseValidate('README.md'))











// const validateLinks = (arrayL) => arrayL.map((obj) => fetch(obj.href)
//   .then((res) => ({
//     href: obj.href,
//     text: obj.text,
//     file: obj.file,
//     status: res.status,
//     message: res.status === 200 ? 'OK' : 'FAIL',
//   }))
//   .catch(() => ({
//     href: obj.href,
//     text: obj.text,
//     file: obj.file,
//     status: 500,
//     message: 'BROKEN',
//   })));

//console.log("que hay en cada link STATUS?: ", validateLinks(linksOfFileMd([myPath])));
