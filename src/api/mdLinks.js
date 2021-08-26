//Terminal: node ./src/api/mdLinks ./test/directory/file1.md
//Terminal: node ./src/api/mdLinks ./README.md

const {
  linksOfFileMd, //array
  linksStatus, //array
} = require('./filesLinks');

//const myPath = process.argv[2];


//FUNCION PARA VALIDAR LINKS DE FILES .md
const mdLinks = (myPath, options) => {
  const arrayLinks = linksOfFileMd(myPath);
  //if (arrayLinks.length > 0) {
  return new Promise((resolve) => {
    //{validate:true}
    if (options.validate) {
      resolve(linksStatus(arrayLinks)); //devuelve: Promise { <pending> }
    }
    //{validate:false}
    else if (!options.validate) {
      resolve(arrayLinks);
    }
  });
  //}
}

// (mdLinks(myPath, {
//   validate: true
// })).then((res) => {
//   console.log(res)
// });
// (mdLinks(myPath, {
//   validate: false
// })).then((res) => {
//   console.log(res)
// });


module.exports = {
  mdLinks, //valida links
};










//FUNCION VALIDATE
//(descifrando promesa)
// const mdLinks = (myPath, options) => {
//   if (isPath(myPath)) {
//     const pathAbs = isPathAbsolute(myPath);
//     //Cuando es file
//     switch (isPathFile(pathAbs)) {
//       case true: //Cuando es file
//         if (showFileExt(pathAbs) === '.md') {

//           const arrayFileMd = isFileMd(pathAbs); //Array almacena un archivo.md
//           const arrayLinksOfFileMd = linksOfFileMd(arrayFileMd); //array extrae {href, text, file}

//           if (arrayLinksOfFileMd.length > 0) { //si archivo.md tiene links

//             if (options.validate) { //{ validate : true }
//               //Retorna array de {href, text, file, status, statusText}
//               linksStatusOfFileMd(arrayLinksOfFileMd)
//                 .then((responseArray) => responseArray.forEach(elem => {
//                   console.log(elem);
//                 }));
//               //return linksStatusOfFileMd(arrayLinksOfFileMd);
//             } else {
//               arrayLinksOfFileMd.forEach(link => {
//                 console.log(`${chalk.magenta(link.file)} ${chalk.whiteBright(link.href)} ${chalk.cyanBright(link.text)}`); //Retorna {href, text, file}
//               })
//               //return arrayLinksOfFileMd; //Retorna {href, text, file}
//             }
//           } else {
//             console.log(chalk.cyanBright('La ruta no tiene links dentro de archivo markdown.'));
//           }
//         } else {
//           console.log(chalk.cyanBright('La ruta no es archivo markdown.'));
//         }
//         break;

//       case false: //Cuando es directorio/subdirectorio
//         const arrayFilesMdInD = searchFilesMdInDirectory(pathAbs); //Extrae archivos.md en array
//         const arrayLinksOfFileMdD = linksOfFileMd(arrayFilesMdInD); //array extrae {href, text, file}

//         if (arrayLinksOfFileMdD.length > 0) {
//           if (options.validate) { //{ validate : true }
//             //Retorna array de {status}
//             linksStatusOfFileMd(arrayLinksOfFileMdD)
//               .then((responseArray) => responseArray.forEach(elem => {
//                 console.log(elem);
//               }));
//           } else {
//             arrayLinksOfFileMdD.forEach(link => { //Retorna {href, text, file}
//               console.log(`${chalk.magenta(link.file)} ${chalk.whiteBright(link.href)} ${chalk.cyanBright(link.text)}`);
//             })
//             //return arrayLinksOfFileMdD; //Retorna {href, text, file}
//           }
//         } else {
//           console.log(chalk.cyanBright('La ruta es un directorio vacío o no contiene archivos markdown con links.'));
//         }
//         break;
//     }
//   } else {
//     console.log(chalk.redBright('La ruta no existe'));
//   }
// };


// mdLinks(myPath, {
//   validate: true
// })
// mdLinks(myPath, {
//   validate: false
// })


// module.exports = {
//   mdLinks, //Respuesta de promesas. Opción VALIDATE
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
