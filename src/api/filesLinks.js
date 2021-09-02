//FUNCIONES PARA EXTRAER INFORMACION DE LINKS en array

const marked = require('marked');
const jsdom = require('jsdom');
const {
  JSDOM
} = jsdom;
const fetch = require('node-fetch');

const {
  readFileMd,
} = require('./path');
const {
  searchFilesMd,
} = require('./filesMd');


//VERIFICA SI archivo.md TIENE LINKS, Y GUARDANDO SUS PROPIEDADES {href, text, file} EN ARRAY
const linksOfFileMd = (myPath) => {
  const arrayFilesMd = searchFilesMd(myPath);
  const arrayLinksProperties = [];
  arrayFilesMd.forEach((fileMd) => {
    //Pasando texto md a html
    const tokens = marked.lexer(readFileMd(fileMd));
    const html = marked.parser(tokens);
    //RECREANDO DOM
    const dom = new JSDOM(html);
    const extractingLinks = dom.window.document.querySelectorAll('a');

    extractingLinks.forEach((link) => {
      arrayLinksProperties.push({
        href: link.href,
        text: link.text,
        file: fileMd,
      });
    });
  });
  return arrayLinksProperties;
};


//ALMACENANDO STATUS DE LINKS {href, text, file, status, statusText} EN ARRAY
const linksStatus = (arrayLinks) => {
  const arrayLinksStatus = [];
  arrayLinks.forEach((link) => {
    arrayLinksStatus.push(fetch(link.href)
      .then((response) => {
        if (response.status >= 200 && response.status < 400) {
          return {
            file: link.file,
            href: link.href,
            text: link.text,
            status: response.status,
            statusText: 'ok',
          }
        } else {
          return {
            file: link.file,
            href: link.href,
            text: link.text,
            status: response.status,
            statusText: 'fail',
          }
        };
      })
      .catch(() => {
        return {
          file: link.file,
          href: link.href,
          text: link.text,
          status: 404,
          statusText: 'fail',
        }
      }));
  });
  return Promise.all(arrayLinksStatus);
}


module.exports = {
  linksOfFileMd,
  linksStatus,
};
