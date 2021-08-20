//FUNCIONES PARA EXTRAER FILES .md en array

//Ejecutando módulo path, contiene utilidades para trabajar con rutas de fichero
const path = require('path');

//Funciones requeridas
const {
  isPathDirectory, //Verifica si es directorio
  showFileExt, //Muestra extensión de archivo
  readDirectory, //Lee un directorio
} = require('./path');


//VERIFICA SI RUTA ES ARCHIVO .md, luego ALMACENA en un array**
const isFileMd = (file) => {
  const arrayFileMd = [];
  if (showFileExt(file) === '.md') {
    arrayFileMd.push(file);
  }
  return arrayFileMd;
};


//BUSCA ARCHIVOS .md EN DIRECTORIOS/SUBDIRECTORIOS, luego ALMACENA en un array**
const searchFilesMdInDirectory = (pathAbs) => {

  let arrayTotalFilesMd = [];

  readDirectory(pathAbs).forEach((file) => {
    //método path.join(), une ruta de directorio + nombre archivo.xx, para obtener ruta completa
    const fullPath = path.join(pathAbs, file);

    const filesMd = isFileMd(fullPath);
    filesMd.forEach((markdownFile) => {
      arrayTotalFilesMd.push(markdownFile); //agrupa TODOS los FILES.md
    });

    if (isPathDirectory(fullPath)) {

      //***FUNCION RECURSIVA***// (se repite hasta que ya no encuentre files .md)
      //para buscar archivos.md en SUB-DIRECTORIOs
      const arrayFilesInSubD = searchFilesMdInDirectory(fullPath);

      //Combinando arrays de archivos .md de cada sub-directorio
      arrayTotalFilesMd = arrayTotalFilesMd.concat(arrayFilesInSubD); //concat: combina arrays
    }
  });
  return arrayTotalFilesMd;
};

module.exports = {
  isFileMd, //Verifica si file es .md y almacena en un array
  searchFilesMdInDirectory, //Busca archivos.md en directorio/subdirectorio
};
