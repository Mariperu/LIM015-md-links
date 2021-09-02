//FUNCIONES PARA EXTRAER FILES .md en array

const path = require('path');

const {
  isPathAbsolute,
  isPathFile,
  showFileExt,
  readDirectory,
} = require('./path');


//BUSCAR ELEMENTOS DENTRO DE DIRECTORIO/SUB-DIRECTORIOS, devuelve un array**
const searchFilesAndDirs = (myPath) => {
  return readDirectory(myPath).map((elem) => path.join(myPath, elem));
};

//BUSCANDO FILES MD
const searchFilesMd = (myPath) => {
  let arrayTotalFilesMd = [];
  const pathAbs = isPathAbsolute(myPath);

  if (isPathFile(pathAbs)) {
    if (showFileExt(pathAbs) === '.md') {
      arrayTotalFilesMd.push(pathAbs);
    }
  } else {
    searchFilesAndDirs(myPath).forEach((elem) => {
      const arrayFilesInDirs = searchFilesMd(elem);
      arrayTotalFilesMd = arrayTotalFilesMd.concat(arrayFilesInDirs);
    });
  }
  return arrayTotalFilesMd;
}

module.exports = {
  searchFilesAndDirs,
  searchFilesMd,
};
