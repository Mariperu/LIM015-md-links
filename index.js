const {
  isPath, //Verifica si existe ruta
  isPathAbsolute, //Verifica y transforma a ruta abs
  isPathFile, //Verifica si es archivo
  isPathDirectory, //Verifica si es directorio
  showingFileExt, //Muestra extensión de archivo
  isFileMd, //Verifica si file es .md y almacena en un array
  searchFilesMdInDirectory, //Busca archivos.md en directorio/subdirectorio
  linksOfFileMd, //Lee archivo.md, busca links <a> y almacena sus prop en un array
  validateTrue, //Recibe prop de links, retorna promesas y almacena status de cada link en array
} = require('./api');


const myPath = process.argv[2];

//PRUEBAS
//console.log("Existe la ruta?: ", isPath(myPath))
//console.log("La ruta absoluta es: ", isPathAbsolute(myPath));
//console.log("ruta es archivo?: ", isPathFile(myPath));
//console.log("ruta es Directorio?: ", isPathDirectory(myPath))
//console.log("extension de archivo es?: ", showingFileExt(myPath))
//console.log("Mostrar archivo .md en array: ", isFileMd(myPath))
//console.log("Contenido de files .md en directorio:\n", searchFilesMdInDirectory(myPath));
//console.log("que hay en cada link?: ", linksOfFileMd([myPath]));
//console.log("Array de obj status:\n", validateTrue(linksOfFileMd([myPath])));

// // const mdLinks = (path, options) => {
// //
// // }



// module.exports = () => {
//   // ...
// };
