//FUNCIONES PARA IDENTIFICAR RUTA / ARCHIVO / DIRECTORIOS-SUBDIRECTORIOS

//Ejecutando módulo FileSystem
//para interactuar con el sist. de archivos (viene implícito en package.json)
const fs = require('fs');
//Ejecutando módulo path, contiene utilidades para trabajar con rutas de fichero
const path = require('path');


//process.argv[], matriz que contiene los argumentos de la línea de comando.
//[0]y[1] se ignoran, son nativos de node.js. [2]: contiene el argumento.
//ejm: ["node","file.js","<argument>",...]  =  node api ./fixedPathFiles
//const myPath = process.argv[2];


//VERIFICA SI EXISTE LA RUTA
//método fs.existsSync(), **devuelve un booleano**
const isPath = (myPath) => fs.existsSync(myPath);


//VERIFICA Y MUESTRA RUTA ES ABSOLUTA (Si ruta es relativa transforma a abs)
//método path.isAbsolute, **devuelve un booleano**
//método path.resolve(), resuelve una secuencia o segmentos de ruta en una **ruta absoluta**
const isPathAbsolute = (myPath) => path.isAbsolute(myPath) ? myPath : path.resolve(myPath);


//VERIFICA SI RUTA ES ARCHIVO
//método fs.statSync(),devuelve información de ruta
//isFile(),verifica si es archivo, **devuelve booleano**
const isPathFile = (myPath) => fs.statSync(myPath).isFile();


//VERIFICA SI RUTA ES DIRECTORIO
//método fs.statSync(),devuelve información de ruta
//isDirectory(),verifica si es directorio, **devuelve booleano**
//const isPathDirectory = (myPath) => fs.statSync(myPath).isDirectory();


//MUESTRA EXTENSION DE LA RUTA
//método path.extname(), verifica últ. aparición de punto(.), si es directorio devuelve nada
const showFileExt = (myPath) => (path.extname(myPath));


//LEE DIRECTORIO
//fs.readdirSync(path[,option]), devuelve un array con cada nombre de contenido (files y sub-directorios)
//[, options] puede ser un encoding, por Ejm: 'utf-8'
//utf-8: formato de codificación de caracteres Unicode e ISO 10646 que utiliza símbolos de longitud variable.
//const readDirectory = (dirPath) => fs.readdirSync(dirPath, 'utf-8');
const readDirectory = (dirPath) => fs.readdirSync(dirPath);


//LEE ARCHIVO en terminal
//fs.readFileSync(path[, options]); si no se ingresa [, options], devolverá un buffer (binario)
//const readFileMd = (filePath) => fs.readFileSync(filePath).toString(); //convierte ruta a type string
const readFileMd = (filePath) => fs.readFileSync(filePath, 'utf-8')


module.exports = {
  isPath,
  isPathAbsolute,
  isPathFile,
  //isPathDirectory,
  showFileExt,
  readDirectory,
  readFileMd,
}
