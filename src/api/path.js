//FUNCIONES PARA IDENTIFICAR RUTA / ARCHIVO / DIRECTORIOS-SUBDIRECTORIOS

//Ejecutando módulo FileSystem, para interactuar con el sist. de archivos (viene implicito en package.json)
const fs = require('fs');
//Ejecutando módulo path, contiene utilidades para trabajar con rutas de fichero
const path = require('path');


//VERIFICA SI EXISTE LA RUTA
//método fs.existsSync(), **devuelve un booleano**
const isPath = (myPath) => fs.existsSync(myPath);


//VERIFICA Y MUESTRA RUTA ES ABSOLUTA (Si ruta es relativa transforma a abs)
//método path.isAbsolute, **devuelve un booleano**
//método path.resolve(), resuelve una secuencia o segmentos de ruta en una **ruta absoluta**
const isPathAbsolute = (myPath) => (path.isAbsolute(myPath)) ?
  myPath : path.resolve(myPath);


//VERIFICA SI RUTA ES ARCHIVO
//método fs.statSync(),devuelve información de ruta
//isFile(),verifica si es archivo, **devuelve booleano**
const isPathFile = (pathAbs) => {
  const stat = fs.statSync(pathAbs);
  return stat.isFile();
}

//VERIFICA SI RUTA ES DIRECTORIO
//método fs.statSync(),devuelve información de ruta
//isDirectory(),verifica si es directorio, **devuelve booleano**
const isPathDirectory = (pathAbs) => {
  const stat = fs.statSync(pathAbs);
  return stat.isDirectory();
}

//MUESTRA EXTENSION DE LA RUTA
//método path.extname(), verifica últ. aparición de punto(.), si es directorio devuelve nada
const showFileExt = (file) => (path.extname(file));


//LEE DIRECTORIO
//fs.readdirSync(path[,option]), devuelve un array con cada nombre de contenido (files y sub-directorios)
//[, options] puede ser un encoding, por Ejm: 'utf-8'
//utf-8: formato de codificación de caracteres Unicode e ISO 10646 que utiliza símbolos de longitud variable.
const readDirectory = (pathAbs) => fs.readdirSync(pathAbs, 'utf-8');


//LEE ARCHIVO en terminal
//fs.readFileSync(path[, options]); si no se ingresa [, options], devolverá un buffer (binario)
//[, options] puede ser un encoding, por Ejm: 'utf-8'
//utf-8: formato de codificación de caracteres Unicode e ISO 10646 que utiliza símbolos de longitud variable.
const readFileMd = (fileMd) => fs.readFileSync(fileMd, 'utf-8');


module.exports = {
  isPath, //Verifica si existe ruta
  isPathAbsolute, //Verifica y transforma a ruta abs
  isPathFile, //Verifica si es archivo
  isPathDirectory, //Verifica si es directorio
  showFileExt, //Muestra extensión de archivo
  readDirectory, //Lee un directorio
  readFileMd, //Lee un archivo en terminal
}
