//CONTADOR DE LINKS

//terminal:  node ./src/cli
//node ./src/cli ./fixedPathFiles/tips.md

//const links = ['http://algo.com/2/3/', 'http://algo.com/2/3/', 'https://otra-cosa.net/algun-doc.html', 'http://google.com/', 'http://www.midominio.es/doc-nuevo.html']


//Ejecutando módulo chalk, para colocar colores en líneas de comando
const chalk = require('chalk');


//Función para contar TOTAL links
const countTotal = ((links) => {
  const array = links.map(link => {
    //return link; //link.href
    return link.href;
  })
  return chalk.cyanBright(`Total: ${array.length}`);
});
//console.log(countTotal(links));


//Función para contar UNIQUE links
const countUnique = (links) => {
  //new Set: {} objeto que permite almacenar valores únicos de cualquier tipo.
  const unique = new Set();
  links.forEach((link) => {
    //unique.add(link); //.add(), método de set (agrega elems)
    unique.add(link.href);
  });
  return chalk.blueBright(`Unique: ${unique.size}`); //.size(), método de set (indica tamaño/cant de elems)
};
//console.log(countUnique(links));


//Función para contar BROKEN links (fail links)
const countBroken = (links) => {
  let counter = 0;
  links.forEach((link) => {
    //if (link.status < 200 && link.status >= 400) {
    if (link.statusText === 'fail') {
      counter += 1;
    }
  });
  return chalk.magentaBright(`Broken: ${counter}`);
};
//console.log(countBroken(links));


module.exports = {
  countTotal,
  countUnique,
  countBroken,
};
