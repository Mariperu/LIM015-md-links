//FUNCIONES PARA EXTRAER FILES .md en array
//TERMINAL: node ./src/api/filesMd.js ./test/directory


//Ejecutando módulo path, contiene utilidades para trabajar con rutas de fichero
const path = require('path');


const {
  isPathAbsolute,
  isPathFile,
  showFileExt,
  readDirectory,
} = require('./path');

//const myPath = process.argv[2];


//BUSCAR ELEMENTOS DENTRO DE DIRECTORIO/SUB-DIRECTORIOS, devuelve un array**
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
  searchFilesAndDirs, //array
  searchFilesMd, //array
};
