//FUNCIONES PARA EXTRAER FILES .md en array
//TERMINAL: node ./src/api/filesMd.js ./fixedPathFiles


//Ejecutando módulo path, contiene utilidades para trabajar con rutas de fichero
const path = require('path');


const {
  isPathAbsolute,
  isPathFile,
  showFileExt,
  readDirectory,
} = require('./path');

//const myPath = process.argv[2];


//ELEMENTOS DENTRO DE DIRECTORIO/SUB-DIRECTORIOS, devuelve un array**
const searchFilesAndDirs = (myPath) => {
  //método path.join(), une ruta directorio + nombre archivo/sub-dir, para obtener ruta completa
  return readDirectory(myPath).map((elem) => path.join(myPath, elem));
};
//console.log(searchFilesAndDirs(myPath));


//BUSCANDO FILES MD
const searchFilesMd = (myPath) => {
  let arrayTotalFilesMd = [];
  const pathAbs = isPathAbsolute(myPath);
  //SI RUTA ES FILE
  if (isPathFile(pathAbs)) {
    if (showFileExt(pathAbs) === '.md') {
      arrayTotalFilesMd.push(pathAbs);
    }
  } //SI RUTA ES DIRECTORIO/SUB-D
  else {
    searchFilesAndDirs(myPath).forEach((elem) => {
      //**RECURSIVIDAD** busca files.md en sub-dirs
      const arrayFilesInDirs = searchFilesMd(elem);
      //concat(): combina arrays de archivos.md de directorio y sub-directorios
      arrayTotalFilesMd = arrayTotalFilesMd.concat(arrayFilesInDirs);
    });
  }
  return arrayTotalFilesMd;
}
//console.log(searchFilesMd(myPath));


module.exports = {
  searchFilesMd, //Devuelve array con todos los files.md
};








//VERIFICA SI RUTA ES ARCHIVO.md, luego ALMACENA en un array **
// const isFileMd = (file) => {
//   const arrayFileMd = [];
//   if (showFileExt(file) === '.md') {
//     arrayFileMd.push(file);
//   }
//   return arrayFileMd;
// };


// //BUSCA ARCHIVOS .md EN DIRECTORIOS/SUBDIRECTORIOS, luego ALMACENA en un array**
// const searchFilesMdInDirectory = (pathAbs) => {

//   let arrayTotalFilesMd = [];

//   readDirectory(pathAbs).forEach((file) => {
//     //método path.join(), une ruta de directorio + nombre archivo.xx, para obtener ruta completa
//     const fullPath = path.join(pathAbs, file);

//     const filesMd = isFileMd(fullPath);
//     filesMd.forEach((markdownFile) => {
//       arrayTotalFilesMd.push(markdownFile); //agrupa TODOS los FILES.md
//     });

//     if (isPathDirectory(fullPath)) {

//       //*FUNCION RECURSIVA*//busca files.md en SUB-DIRECTORIOs
//       const arrayFilesInSubD = searchFilesMdInDirectory(fullPath);
//       //Combinando arrays de archivos .md de cada sub-directorio
//       arrayTotalFilesMd = arrayTotalFilesMd.concat(arrayFilesInSubD); //concat: combina arrays
//     }
//   });
//   return arrayTotalFilesMd;
// };
