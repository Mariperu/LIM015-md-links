//Ejecutando módulo FileSystem, para interactuar con el sist. de archivos (viene implicito en package.json)
const fs = require('fs');
//Ejecutando módulo chalk, para colocar colores en líneas de comando
const chalk = require('chalk');
//Ejecutando módulo path, contiene utilidades para trabajar con rutas de fichero
const path = require('path');
//Ejecutando módulo marked, compilador de bajo nivel, liviano, sencillo
//para analizar archivos markdown, construido para brindar velocidad
//const marked = require('marked');
//Ejecutando módulo jsdom, para recrear el DOM desde node.js / terminal
//Para ejecutar jsdom, se necesita principalmente del constructor JSDOM
//JSDOM es una exportación con nombre del módulo (object) principal de jsdom
//const jsdom = require("jsdom");
//const {JSDOM} = jsdom;


//**VERIFICANDO SI EXISTE LA RUTA**
// método fs.existsSync(), verifica si existe o no la ruta, **devuelve un booleano**
const isPath = (pathEntry) => fs.existsSync(pathEntry);
// const isPath = (pathEntry) => (fs.existsSync(pathEntry) === true) ? true :
//   chalk.red("No existe la ruta, por favor verifica e intenta nuevamente.");
//console.log("Existe la ruta?: ", isPath('./fixedPathFiles/tips.txt'))
//console.log("Existe la ruta?: ", isPath('./fixedPathFiles/tips.txtx'))


//**VERIFICANDO SI RUTA ES ABSOLUTA**, de lo contrario, **TRANSFORMAR RELATIVA EN ABSOLUTA**
//método path.isAbsolute, determina si path es ruta absoluta, **devuelve un booleano**
//método path.resolve(), resuelve una secuencia o segmentos de ruta en una **ruta absoluta**
const isPathAbsolute = (pathEntry) => (path.isAbsolute(pathEntry)) ?
  pathEntry : path.resolve(pathEntry);
//(path.isAbsolute(pathEntry)) ? true : path.resolve(pathEntry);
//console.log("era relativa, La ruta absoluta es: ", isPathAbsolute('./fixedPathFiles/tips.md'));
//console.log("ruta absoluta: ", isPathAbsolute('C:\\Users\\Teo\\Documents\\GitHub\\LIM015-md-links\\fixedPathFiles\\tips.md'));


//**VERIFICANDO SI RUTA ABSOLUTA ES ARCHIVO**
//método fs.statSync(),devuelve información de ruta del archivo
//stat.isFile(),verifica si es archivo, **devuelve booleano**
const isPathFile = (pathAbs) => {
  const stat = fs.statSync(pathAbs);
  return stat.isFile();
}
//console.log("ruta es archivo?: ", isPathFile('./fixedPathFiles'))
//console.log("ruta es archivo?: ", isPathFile('./fixedPathFiles/tips.md'))


//**VERIFICANDO SI RUTA ABSOLUTA ES DIRECTORIO**
//método fs.statSync(),devuelve información de ruta del archivo
//stat.isDirectory(),verifica si es directorio, **devuelve booleano**
const isPathDirectory = (pathAbs) => {
  const stat = fs.statSync(pathAbs);
  return stat.isDirectory();
}
//console.log("ruta es Directorio?: ", isPathDirectory('./fixedPathFiles'))
//console.log("ruta es Directorio?: ", isPathDirectory('C:/Users/Teo/Documents/GitHub/LIM015-md-links/fixedPathFiles'))
//console.log("ruta es Directorio?: ", isPathDirectory('./fixedPathFiles/tips.md'))



//**MOSTRANDO EXTENSION DE ARCHIVO**
//método path.extname() **devuelve extensión del path** (verifica última aparición de .(punto))
// const showingFileExt = (file) => (path.extname(file) === '.md') ? true :
//   chalk.red("No es archivo Markdown (.md)");
const showingFileExt = (file) => (path.extname(file));
//console.log("extension de archivo es?: ", showingFileExt('./fixedPathFiles/tips.txt'));
//console.log("extension de archivo es?: ", showingFileExt('./fixedPathFiles/tips.md'));



//**VERIFICANDO SI ARCHIVO ES .md, luego ALMACENAR en un array**
const isFileMd = (file) => {
  const arrayFileMd = [];
  //Aplicando función para MOSTRAR EXTENSION DE ARCHIVO
  if (showingFileExt(file) === '.md') {
    arrayFileMd.push(file);
  }
  return arrayFileMd;
};
//console.log("archivo es .md?: ", isFileMd('./fixedPathFiles/tips.md'))
//console.log("archivo es .md?: ", isFileMd('./fixedPathFiles/tips.txt'))


//**BUSCANDO ARCHIVOS CON EXTENCION .md en DIRECTORIOS/SUBDIRECTORIOS, y almacenarlos en un array**
const searchFilesMdInDirectory = (pathAbs) => {
  //fs.readdirSync(path[,option]), lee contenido de un directorio, **devuelve un array con c/name de files**
  //[, options] puede ser un encoding, por Ejm: 'utf-8'
  //utf-8: formato de codificación de caracteres Unicode e ISO 10646 que utiliza símbolos de longitud variable.
  const arrayFilesInDirectory = fs.readdirSync(pathAbs, 'utf-8');
  let arrayTotalFilesMd = [];
  arrayFilesInDirectory.forEach((file) => {
    //método path.join(), une ruta absoluta de directorio + nombre archivo.md, para obtener ruta completa
    const fullPath = path.join(pathAbs, file);

    //Función isPathDirectory: para evaluar si ruta es sub-directorio
    if (isPathDirectory(fullPath)) {

      //***FUNCION RECURSIVA*** (repite la func. inicial): para buscar archivos.md en SUB-DIRECTORIOS
      const arrayFilesInSubD = searchFilesMdInDirectory(fullPath);
      //Combinando arrays de archivos .md de cada sub-directorio
      arrayTotalFilesMd = arrayTotalFilesMd.concat(arrayFilesInSubD); //concat: combina arrays
    }

    //Funcion isFileMd: para verificar si archivo es .md, luego lo ALMACENA en un array
    const filesMd = isFileMd(fullPath);
    filesMd.forEach((markdownFile) => {
      arrayTotalFilesMd.push(markdownFile); //para agrupar TODOS los archivos.md en un array
    });
  });
  return arrayTotalFilesMd;
};
//console.log("Contenido de files .md en directorio: ", searchFilesMdInDirectory('./fixedPathFiles/'))
//console.log("Contenido de files .md en subdirectorio: ", searchFilesMdInDirectory('./fixedPathFiles/moreFiles'))





module.exports = {
  isPath, //Verifica si existe ruta
  isPathAbsolute, //Verifica y transforma a ruta
  isPathFile, //Verifica si es archivo
  isPathDirectory, //Verifica si es directorio
  showingFileExt, //Muestra extensión de archivo
  isFileMd, //Verifica si file es .md y almacena en un array
  searchFilesMdInDirectory, //Busca archivos .md en directorio/subdirectorio
};






// /***********CORREGIR */

// //Leyendo archivo.md
// //fs.readFileSync(path[, options]); si no se ingresa [, options], devolverá un buffer (binario)
// //[, options] puede ser un encoding, por Ejm: 'utf-8'
// //utf-8: formato de codificación de caracteres Unicode e ISO 10646 que utiliza símbolos de longitud variable.
// const readingFileMd = (fileMd) => {
//   return fs.readFileSync(fileMd, 'utf-8');
// };
// //console.log("\nLeyendo archivo.md:\n", readingFileMd('./fixedPathFiles/tips.txt', true));
// //console.log("\nLeyendo archivo.md:\n", readingFileMd('./fixedPathFiles/moreFiles/extraFile.md'));


// //Verificando si archivo tiene links
// const linksOfArchivesMarkdown = (arrayMarkdowns) => {
//   const arrayLinksArchive = [];
//   arrayMarkdowns.forEach((fileMarkdown) => {
//     const markdown = fs.readFileSync(fileMarkdown, 'utf-8');
//     const tokens = marked.lexer(markdown);
//     const html = marked.parser(tokens);
//     //console.log("Versión en html:\n", html)
//     const dom = new JSDOM(html);
//     const linksOfMarkdown = dom.window.document.querySelectorAll('a');
//     linksOfMarkdown.forEach((link) => {
//       arrayLinksArchive.push({
//         href: link.href,
//         text: link.text,
//         file: fileMarkdown,
//       });
//     });
//   });
//   return arrayLinksArchive;
// };
// //console.log("que hay en cada link?: ", linksOfArchivesMarkdown(['./fixedPathFiles/tips.md']))





//**********HASTA AQUI////






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


//Buscando (leyendo/extrayendo) archivos dentro de UN directorio
//fs.readdirSync(), lee el contenido del directorio, devuelve un array
// const searchFilesInDirectory = (directoryToRead) => {
//   return (fs.readdirSync(directoryToRead, 'utf-8'));
// };
// console.log("Contenido del directorio: ", searchFilesInDirectory('./fixedPathFiles'))
// console.log("Contenido del directorio: ", searchFilesInDirectory('./fixedPathFiles/moreFiles'))


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
