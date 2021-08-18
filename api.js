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
//Objeto JSDOM, tiene una serie de propiedades útiles.
const {
  JSDOM
} = jsdom;
//Ejecutando módulo "node-fetch", que habilita el uso de fetch()
//Método fecth(), para hacer http require/response asíncronas.
const fetch = require('node-fetch');


//process.argv[], matriz que contiene los argumentos de la línea de comando.
//[0]y[1] se ignoran, son nativos de node.js. [2]: contiene el argumento.
//ejm: ["node","file.js","<argument>",...]  =  node api ./fixedPathFiles
const myPath = process.argv[2];
//*****C:\\Users\\Teo\\Documents\\GitHub\\LIM015-md-links\\fixedPathFiles
//para terminal: C:/Users/Teo/Documents/GitHub/LIM015-md-links/fixedPathFiles/tips.md
//para terminal: ./fixedPathFiles/tips.md



//VERIFICANDO SI EXISTE LA RUTA**
// método fs.existsSync(), verifica si existe o no la ruta, **devuelve un booleano**
const isPath = (myPath) => fs.existsSync(myPath);
//console.log("Existe la ruta?: ", isPath(myPath));


//**//VERIFICANDO SI RUTA ES ABSOLUTA**, de lo contrario, **TRANSFORMAR RELATIVA EN ABSOLUTA**
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


//*****VERIFICANDO SI archivo.md TIENE LINKS, Y GUARDANDO SUS PROPIEDADES {href, text, file} EN ARRAY***
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
    const tokens = marked.lexer(readingFileMd); //obj describe c/linea del file
    //marked.parser(), procesa cada token en la matriz de tokens (para pasarlo a html).
    const html = marked.parser(tokens);

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



//*****ALMACENANDO STATUS DE LINKS {href, text, file, status, statusText} EN ARRAY***
const linksStatusOfFileMd = (arrayLinks) => {
  //console.log("esto ingresó: ", arrayLinks)

  const arrayOfLinksStatus = [];
  arrayLinks.forEach((link) => {
    //fetch(url) devuelve una promesa, promesa devuelve un objeto con datos del link
    arrayOfLinksStatus.push(fetch(link.href)
      .then((response) => { //Cuando promesa es resuelta, response es un callback
        //console.log("Resolve", { //Objeto
        if (response.status >= 200 && response.status < 400) {
          return `${link.href}  ${link.text}  ${link.file}  ${response.status}  'ok'`;
        } else {
          return `${link.href}  ${link.text}  ${link.file}  ${response.status}  'fail'`;
        }
      })
      .catch(() => { //Cuando promesa es rechazada
        //console.log("Rejected", { //Objeto
        return `${link.href}  ${link.text}  ${link.file}  'error'  'fail'`;
      }));
  });
  //return arrayOfLinksStatus;
  //Promise.all: método estático
  //Cuando se hayan ejecutado todas las peticiones se cumplirá la promesa.
  return Promise.all(arrayOfLinksStatus);
}
// Promise.all(linksStatusOfFileMd(linksOfFileMd([myPath]))).then((resp) => console.log((resp)));
//** linksStatusOfFileMd(linksOfFileMd([myPath])).then((resp) => console.log((resp)));




//RESPUESTA DE PROMESA final (descifrando promesa)
const validateResponse = (myPath, options) => {
  //Verificando si ruta es arhivo (true)
  if (isPathFile(myPath)) { //if true
    if (showingFileExt(myPath) === '.md') { //verificando extension.md

      const arrayFileMd = isFileMd(myPath); //Array almacena un archivo.md
      const arrayLinksOfFileMd = linksOfFileMd(arrayFileMd); //array extrae {href, text, file} de c/link

      if (arrayLinksOfFileMd.length > 0) { //si archivo.md tiene links

        if (options.validate) { //{ validate : true }
          //***POR MEJORAR */
          linksStatusOfFileMd(arrayLinksOfFileMd)
            .then((response) => console.log(response));
          //return linksStatusOfFileMd(arrayLinksOfFileMd); //Retorna array de {status}
        } else {
          return arrayLinksOfFileMd; //Retorna {href, text, file}
        }
      }
      return chalk.blue('La ruta no tiene links dentro de archivo markdown.')
    }
    return chalk.yellow('La ruta no es archivo markdown.')
  }

  //Cuando ruta es directorio/sub-directorio, se busca archivos.md
  const arrayFilesMdInD = searchFilesMdInDirectory(myPath); //Extrae archivos.md en array
  const arrayLinksOfFileMdD = linksOfFileMd(arrayFilesMdInD); //array extrae {href, text, file} de c/link de c/file

  if (arrayLinksOfFileMdD.length > 0) {
    if (options.validate) { //{ validate : true }
      //***POR MEJORAR */
      linksStatusOfFileMd(arrayLinksOfFileMdD)
        .then((response) => console.log(response));
      //return linksStatusOfFileMd(arrayLinksOfFileMdD); //Retorna array de {status}
    } else {
      return arrayLinksOfFileMdD; //Retorna {href, text, file}
    }
  }
  return chalk.blue('La ruta es un directorio vacío y/o no contiene archivos markdown con links.')
};

console.log("Respuesta de {validate:true}:\n", validateResponse(myPath, {
  validate: true
}));
// console.log("Respuesta de {validate false}:\n", validateResponse(myPath, {
//   validate: false
// }));





module.exports = {
  isPath, //Verifica si existe ruta
  isPathAbsolute, //Verifica y transforma a ruta abs
  isPathFile, //Verifica si es archivo
  isPathDirectory, //Verifica si es directorio
  showingFileExt, //Muestra extensión de archivo
  isFileMd, //Verifica si file es .md y almacena en un array
  searchFilesMdInDirectory, //Busca archivos.md en directorio/subdirectorio
  linksOfFileMd, //Lee archivo.md, busca links <a> y almacena sus prop en un array
  linksStatusOfFileMd, //Recibe prop de links, retorna promesas y almacena status de cada link en array
  validateResponse, //Respuesta de promesas
};



//new promise
// return new Promise((resolve, reject) => {
//   if (options.validate === true) {
//     Promise.all(linksStatusOfFileMd(arrayLinksOfFileMd)).then((res) => resolve(res));
//   } else {
//     resolve(arrayLinksOfFileMd);
//   }
// });


//*****ALMACENANDO STATUS DE LINKS {href, text, file, status, statusText} EN ARRAY***
// const linksStatusOfFileMd = (arrayLinks) => {
//   //console.log("esto ingresó: ", arrayLinks)

//   const arrayOfLinksStatus = [];
//   arrayLinks.forEach((link) => {
//     //new Promise((resolve) =>{
//     //fetch(url) devuelve una promesa, promesa devuelve un objeto con datos del link
//     arrayOfLinksStatus.push(fetch(link.href)
//       .then((response) => { //Cuando promesa es resuelta, response es un callback
//         //console.log("Resolve", { //Objeto
//         return ({ //*
//           href: link.href,
//           text: link.text,
//           file: link.file,
//           status: response.status,
//           statusText: (response.statusText >= 200 && response.statusText < 400) ?
//             'ok' : 'fail',
//         });
//       })
//       .catch(() => { //Cuando promesa es rechazada
//         //console.log("Rejected", { //Objeto
//         return ({ //*
//           href: link.href,
//           text: link.text,
//           file: link.file,
//           status: "error", //???
//           statusText: 'fail' //???
//         });
//       })
//       //.finally(() => console.log("Terminado."))
//     );
//     //})
//   });
//   //console.log(Promise.all(arrayOfLinksStatus).then((res) => resolve(res)))
//   //return Promise.allSettled(arrayOfLinksStatus);
//   //return arrayOfLinksStatus;
//   return Promise.all(arrayOfLinksStatus) //*
//   //return Promise.resolve(arrayOfLinksStatus)
//   //console.log(arrayOfLinksStatus);
// }
// //console.log("Array de obj status:\n", linksStatusOfFileMd(linksOfFileMd([myPath])));
// //*****/ Promise.all(linksStatusOfFileMd(linksOfFileMd([myPath]))).then((resp) => console.log((resp)));

// //Promise.all(linksStatusOfFileMd(linksOfFileMd([myPath]))).then((resp) => console.log((resp)));
// linksStatusOfFileMd(linksOfFileMd([myPath])).then((resp) => console.log((resp)));







//RESPUESTA DE PROMESA final (descifrando promesa)
// const validateResponse = (myPath, options) => {
//   //Verificando si ruta es arhivo (true)
//   if (isPathFile(myPath)) { //if true
//     if (showingFileExt(myPath) === '.md') { //verificando extension.md

//       const arrayFileMd = isFileMd(myPath); //Array almacena un archivo.md
//       const arrayLinksOfFileMd = linksOfFileMd(arrayFileMd); //array extrae {href, text, file} de c/link

//       if (arrayLinksOfFileMd.length > 0) { //si archivo.md tiene links
//         //return new Promise((resolve, reject) => { //*
//         if (options.validate) { //{ validate : true }
//           return linksStatusOfFileMd(arrayLinksOfFileMd); //Retorna array de {status}
//           //return Promise.resolve(linksStatusOfFileMd(arrayLinksOfFileMd))
//           // return Promise.all(linksStatusOfFileMd(arrayLinksOfFileMd)).then((resp) => ((resp)));
//           //return Promise.all(linksStatusOfFileMd(arrayLinksOfFileMd)).then((res) => resolve(res));
//         }
//         //return Promise.resolve(arrayLinksOfFileMd);
//         return arrayLinksOfFileMd; //Retorna {href, text, file}
//         //resolve(arrayLinksOfFileMd);
//         //}) //*
//       }
//       //return Promise.resolve('La ruta no tiene links dentro de archivo markdown.');
//       return ('La ruta no tiene links dentro de archivo markdown.')
//     }
//     return ('La ruta no es archivo markdown.')
//   }

//   //Cuando ruta es directorio/sub-directorio, se busca archivos.md
//   const arrayFilesMdInD = searchFilesMdInDirectory(myPath); //Extrae archivos.md en array
//   const arrayLinksOfFileMdD = linksOfFileMd(arrayFilesMdInD); //array extrae {href, text, file} de c/link de c/file

//   if (arrayLinksOfFileMdD.length > 0) {
//     if (options.validate) {
//       return linksStatusOfFileMd(arrayLinksOfFileMdD);
//     }
//     return Promise.resolve(arrayLinksOfFileMdD);
//   }
//   //return Promise.resolve('La ruta es un directorio vacío y/o no contiene archivos markdown.');
//   return ('La ruta es un directorio vacío y/o no contiene archivos markdown con links.')
// };

// console.log("Respuesta de {validate:true}:\n", validateResponse(myPath, {
//   validate: true
// }));
// // console.log("Respuesta de {validate false}:\n", validateResponse(myPath, {
// //   validate: false
// // }));






// //PROBANDO AL INFINITO
// let i = 0;
// setInterval(function () {
//   console.log(i);
//   i++;
// }, 50);


//MDLINKS UNIENDO TODO
// const mdLinks = (myPath, options) => {
//   const promise = new Promise((resolve, reject) => {
//     // Verificamos rutas absolutas
//     const verifiedRoute = isPathAbsolute(myPath);
//     // console.log(verifiedRoute)
//     if (!fs.existsSync(verifiedRoute)) {
//       reject(new Error(`${chalk.red('RUTA INVÁLIDA')}`));
//     }
//     if (options !== undefined) {
//       if (options.validate) {
//         resolve(linksStatusOfFileMd(linksOfFileMd([verifiedRoute]))); //** */
//       }

//       if (!options.validate) {
//         resolve(linksOfFileMd([verifiedRoute]));
//       }
//     } else {
//       resolve(linksOfFileMd([verifiedRoute]));
//     }
//   });
//   return promise;
// };
// console.log(mdLinks(myPath, {
//   validate: false
// }));


// /*/
// const validateResponse= (pathValidated, opts) => {
//   if (isPathFile(pathValidated)) {
//     const arrayFileMd = isFileMd(pathValidated);
//     const arrayLinksOfMarkdown = linksOfFileMd(arrayFileMd);

//     if (arrayLinksOfMarkdown.length > 0) {
//       if ((opts !== undefined) && opts.validate) {
//         return linksStatusOfFileMd(arrayLinksOfMarkdown);
//       }

//       return Promise.resolve(arrayLinksOfMarkdown);
//     }

//     return Promise.resolve('La ruta ingresada corresponde a un archivo que no es markdown.');
//   }

//   const arrayFileMd = searchFilesMdInDirectory(pathValidated);
//   const arrayLinksOfMarkdown = linksOfFileMd(arrayFileMd);

//   if (arrayLinksOfMarkdown.length > 0) {
//     if ((opts !== undefined) && opts.validate) {
//       return linksStatusOfFileMd(arrayLinksOfMarkdown);
//     }

//     return Promise.resolve(arrayLinksOfMarkdown);
//   }

//   return Promise.resolve('La ruta ingresada corresponde a un directorio vacío o bien, no contiene archivos markdown.');
// };
// console.log("que hay?: ", validateResponse(myPath));
