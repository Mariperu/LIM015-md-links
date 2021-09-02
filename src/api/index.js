//FUNCION MD-LINKS

const {
  linksOfFileMd,
  linksStatus,
} = require('./filesLinks');


const mdLinks = (myPath, options) => {
  const arrayLinks = linksOfFileMd(myPath);
  return new Promise((resolve) => {
    if (options.validate) {
      resolve(linksStatus(arrayLinks));
    } else {
      resolve(arrayLinks);
    }
  });
}

module.exports = mdLinks;
