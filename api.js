//Ejecutando módulo fs (viene implicito en package.json)
const fs = require('fs');
//Ejecutando módulo path, contiene utilidades para trabajar con rutas de fichero
const path = require('path');
//Ejecutando módulo chalk, para colocar colores en líneas de comando
const chalk = require('chalk');


//Verificando si existe ruta
// método fs.existsSync(), devuelve un booleano
const isPath = (pathEntry) =>
  (fs.existsSync(pathEntry) === true) ? true :
  chalk.red("No existe la ruta, por favor verifica e intenta nuevamente.");

console.log("Existe la ruta?: ", isPath('./fixedPathFiles/tips.txt'))


//Verificando si es ruta absoluta, de lo contrario transformar relativa en absoluta
//método path.isAbsolute, determina si path es ruta absoluta, devuelve un booleano
//método path.resolve(), resuelve una secuencia o segmentos de ruta en una ruta absoluta
const isPathAbsolute = (pathEntry) =>
  (path.isAbsolute(pathEntry) === true) ? true : path.resolve(pathEntry);
// (path.isAbsolute(pathFile) === true) ? pathFile : path.resolve(pathFile);



//Verificando si la ruta es directorio
//método fs.statSync(),devuelve información de ruta del archivo
//stat.isDirectory(),verifica si es directorio, **devuelve booleano**
const isPathDirectory = (pathAbs) => {
  const stat = fs.statSync(pathAbs);
  return stat.isDirectory();
}


//Verificando si la ruta es archivo
//método fs.statSync(),devuelve información de ruta del archivo
//stat.isFile(),verifica si es archivo, **devuelve booleano**
const isPathFile = (pathAbs) => {
  const stat = fs.statSync(pathAbs);
  return stat.isFile();
}


//Buscando (leyendo/extrayendo) archivos dentro de UN directorio
//fs.readdirSync(), lee el contenido del directorio, devuelve un array
const searchingFiles = (directoryToRead) => {
  return (fs.readdirSync(directoryToRead));
};
console.log("Contenido del directorio: ", searchingFiles('./fixedPathFiles'))



//Verificando si archivo es .md
//método path.extname() devuelve extensión del path (verifica última aparición de .(punto))
const isFileMd = (file) => (path.extname(file) === '.md') ? true :
  chalk.red("No es archivo Markdown (.md)");

console.log("es archivo.md?: ", isFileMd('./fixedPathFiles/tips.md'))
console.log("es archivo.md?: ", isFileMd('./fixedPathFiles/tips.txt'))


//Leyendo archivo.md
//fs.readFileSync(path[, options]); si no se ingresa [, options], devolverá un buffer (binario)
//[, options] puede ser un encoding, por Ejm: 'utf-8'
//utf-8: formato de codificación de caracteres Unicode e ISO 10646 que utiliza símbolos de longitud variable.
const readingFileMd = (fileMd) => {
  return fs.readFileSync(fileMd, 'utf-8');
};
//console.log("\nLeyendo archivo.md:\n", readingFileMd('./fixedPathFiles/tips.txt', true));
console.log("\nLeyendo archivo.md:\n", readingFileMd('./fixedPathFiles/tips.txt'));




module.exports = {
  isPath, //Verifica si existe ruta
  isPathAbsolute, //Verifica y transforma a ruta absoluta
  isPathDirectory, //Verifica si es directorio
  isPathFile, //Verifica si es archivo
  searchingFiles, //Busca archivos en un directorio
  isFileMd, //Verifica si archivo es formato.md
  readingFileMd, //Lee archivo.md
};



//Extrayendo archivos dentro de directorio
// let allFiles = [];
// const searchFiles = (pathFile, cb) => {
//   if (cb) {
//     fs.readdirSync(pathFile, (err, files) => {
//       files.forEach(file => {
//         allFiles.push(file);
//       });
//     });
//   }
// }
// console.log(searchFiles('./fixedPathFiles', true));



//Extrayendo archivos dentro de UN directorio
//fs.readdirSync(), lee el contenido del directorio.
// let allFiles = []; //array, para luego identificar .md y subcarpetas para seguir buscando .md
// const searchFiles = (pathEntry) => {
//   const filenames = fs.readdirSync(pathEntry);
//   console.log("Nombre de archivos:");
//   filenames.forEach(file => {
//     allFiles.push(file);
//   });
//   return allFiles;
// }
// console.log(searchFiles('./fixedPathFiles'))


//Leyendo archivo.md, ASYNC
//readFile() para funciones async
// const readingFileMd = (fileMd, cb) => {
//   fs.readFile(fileMd, (err, data) => {
//     console.log(data.toString());
//   });
// }
// console.log("\nLeyendo archivo: ", readFileMd('./fixedPathFiles/tips.txt', true));





//Leyendo README.md
// function read(path, cb) {
//   fs.readFile(path, (err, data) => { //readFile para funciones async
//     console.log(data.toString());
//   });
// }
// read(__dirname + '/README.md');

//read(__dirname)
//read(process.argv)


// //PROBANDO AL INFINITO
// let i = 0;
// setInterval(function () {
//   console.log(i);
//   i++;
// }, 50);
