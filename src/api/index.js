//Terminal: node ./src/api/index ./test/directory/file1.md
//Terminal: node ./src/api/index ./README.md

const {
  linksOfFileMd, //array
  linksStatus, //array
} = require('./filesLinks');

//const myPath = process.argv[2];


//FUNCION PARA VALIDAR LINKS DE FILES .md
const mdLinks = (myPath, options) => {
  const arrayLinks = linksOfFileMd(myPath);
  //if (arrayLinks.length > 0) {
  return new Promise((resolve) => {
    //{validate:true}
    if (options.validate) {
      resolve(linksStatus(arrayLinks)); //devuelve: Promise { <pending> }
    }
    //{validate:false}
    //else if (!options.validate) {
    else {
      resolve(arrayLinks);
    }
  });
  //}
}

// (mdLinks(myPath, {
//   validate: true
// })).then((res) => {
//   console.log(res)
// });
// (mdLinks(myPath, {
//   validate: false
// })).then((res) => {
//   console.log(res)
// });


module.exports = {
  mdLinks, //valida links
};
