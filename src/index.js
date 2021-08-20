//Terminal: node ./src/index ./fixedPathFiles/tips.md

//Ejecutando módulo chalk, para colocar colores en líneas de comando
const chalk = require('chalk');

const {
  // isPath, //Verifica si existe ruta
  // isPathAbsolute, //Verifica y transforma a ruta abs
  isPathFile, //Verifica si es archivo
  showFileExt, //Muestra extensión de archivo
} = require('./api/path');

const {
  isFileMd, //Verifica si file es .md y almacena en un array
  searchFilesMdInDirectory, //Busca archivos.md en directorio/subdirectorio
} = require('./api/filesMd');

const {
  linksOfFileMd, //Lee archivo.md, busca links <a> y almacena sus prop en un array
  linksStatusOfFileMd, //Recibe prop de links, retorna promesas y almacena status de cada link en array
} = require('./api/filesLinks');


//process.argv[], matriz que contiene los argumentos de la línea de comando.
//[0]y[1] se ignoran, son nativos de node.js. [2]: contiene el argumento.
//ejm: ["node","file.js","<argument>",...]  =  node api ./fixedPathFiles
const myPath = process.argv[2];
//*****C:\\Users\\Teo\\Documents\\GitHub\\LIM015-md-links\\fixedPathFiles
//para terminal: C:/Users/Teo/Documents/GitHub/LIM015-md-links/fixedPathFiles/tips.md
//para terminal: ./fixedPathFiles/tips.md



//RESPUESTA DE PROMESA final (descifrando promesa)
const mdLinks = (myPath, options) => {
  //Verificando si ruta es arhivo (true)
  if (isPathFile(myPath)) { //if true
    if (showFileExt(myPath) === '.md') { //verificando extension.md

      const arrayFileMd = isFileMd(myPath); //Array almacena un archivo.md
      const arrayLinksOfFileMd = linksOfFileMd(arrayFileMd); //array extrae {href, text, file} de c/link

      if (arrayLinksOfFileMd.length > 0) { //si archivo.md tiene links

        if (options.validate) { //{ validate : true }
          //Retorna array de {href, text, file, status, statusText}
          return linksStatusOfFileMd(arrayLinksOfFileMd)
            .then((responseArray) => responseArray.forEach(elem => {
              console.log(elem);
            }));
          //return linksStatusOfFileMd(arrayLinksOfFileMd);
        } else {
          arrayLinksOfFileMd.forEach(elem => {
            console.log(`${elem.href} ${elem.text} ${elem.file}`); //Retorna {href, text, file}
          })
          //return arrayLinksOfFileMd; //Retorna {href, text, file}
        }
      } else {
        return chalk.blue('La ruta no tiene links dentro de archivo markdown.')
      }
    }
    return chalk.yellow('La ruta no es archivo markdown.')
  }

  //Cuando ruta es directorio/sub-directorio, se busca archivos.md
  const arrayFilesMdInD = searchFilesMdInDirectory(myPath); //Extrae archivos.md en array
  const arrayLinksOfFileMdD = linksOfFileMd(arrayFilesMdInD); //array extrae {href, text, file} de c/link de c/file

  if (arrayLinksOfFileMdD.length > 0) {
    if (options.validate) { //{ validate : true }
      //Retorna array de {status}
      return linksStatusOfFileMd(arrayLinksOfFileMdD)
        .then((responseArray) => responseArray.forEach(elem => {
          console.log(elem);
        }));
      //return linksStatusOfFileMd(arrayLinksOfFileMdD); 
    } else {
      arrayLinksOfFileMdD.forEach(elem => {
        console.log(`${elem.href} ${elem.text} ${elem.file}`); //Retorna {href, text, file}
      })
      //return arrayLinksOfFileMdD; //Retorna {href, text, file}
    }
  }
  return chalk.blue('La ruta es un directorio vacío y/o no contiene archivos markdown con links.')
};
mdLinks(myPath, {
  validate: true
})
// mdLinks(myPath, {
//   validate: false
// })
// console.log("Respuesta de {validate:true}:\n", validateResponse(myPath, {
//   validate: true
// }));
// // console.log("Respuesta de {validate false}:\n", validateResponse(myPath, {
// //   validate: false
// // }));

module.exports = {
  mdLinks, //Respuesta de promesas. Opción VALIDATE
};



// // const mdLinks = (path, options) => {
// //
// // }



// module.exports = () => {
//   // ...
// };







//new promise
// return new Promise((resolve, reject) => {
//   if (options.validate === true) {
//     Promise.all(linksStatusOfFileMd(arrayLinksOfFileMd)).then((res) => resolve(res));
//   } else {
//     resolve(arrayLinksOfFileMd);
//   }
// });




// //PROBANDO AL INFINITO
// let i = 0;
// setInterval(function () {
//   console.log(i);
//   i++;
// }, 50);


//UNIENDO TODO
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
