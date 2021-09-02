//FUNCIONES PARA IDENTIFICAR RUTA / ARCHIVO / DIRECTORIOS-SUBDIRECTORIOS

const fs = require('fs');
const path = require('path');

//VERIFICA SI EXISTE LA RUTA
const isPath = (myPath) => fs.existsSync(myPath);

//VERIFICA Y RETORNA RUTA ABSOLUTA (Si ruta es relativa transforma a abs)
const isPathAbsolute = (myPath) => path.isAbsolute(myPath) ? myPath : path.resolve(myPath);

//VERIFICA SI RUTA ES ARCHIVO
const isPathFile = (myPath) => fs.statSync(myPath).isFile();

//MUESTRA EXTENSION DE LA RUTA
const showFileExt = (myPath) => (path.extname(myPath));

//LEE DIRECTORIO
const readDirectory = (dirPath) => fs.readdirSync(dirPath);

//LEER UN ARCHIVO
const readFileMd = (filePath) => fs.readFileSync(filePath, 'utf-8');


module.exports = {
  isPath,
  isPathAbsolute,
  isPathFile,
  showFileExt,
  readDirectory,
  readFileMd,
}
