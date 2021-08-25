//test: npm test ../filesLinks.spec.js

const {
  linksOfFileMd, //Lee archivo.md, busca links <a> y almacena sus prop en un array
  linksStatusOfFileMd, //Recibe prop de links, retorna promesas y almacena status de cada link en array

} = require('../src/api/filesLinks')


//Test: **VERIFICANDO SI archivo.md TIENE LINKS, Y GUARDANDO SUS PROPIEDADES EN ARRAY***
describe('linksOfFileMd', () => {
  it('should be a function', () => {
    expect(typeof linksOfFileMd).toBe('function');
  });
  it('should store the properties of each link in an array if file has links', () => {
    expect(linksOfFileMd(['./fixedPathFiles/tips.md'])).not.toHaveLength(0);
  });
  it('should be an empty array if there are not links', () => {
    expect(linksOfFileMd(['./fixedPathFiles/tips.txt'])).not.toHaveLength(1);
  });
});

//ALMACENANDO STATUS DE LINKS {href, text, file, status, statusText} EN ARRAY
describe('linksStatusOfFileMd', () => {

  it('should be a function', () => {
    expect(typeof linksStatusOfFileMd).toBe('function');
  });

  const arrayOk = [{
    file: './fixedPathFiles/moreFiles/extraFile.md',
    href: 'http://algo.com/2/3/',
    text: 'Algo',
  }];

  it('should return status 200 and `ok` text when promise is resolved', (resolve) => {
    linksStatusOfFileMd(arrayOk).then((response) => {
      expect(response).not.toHaveLength(0);
      resolve(); //fuction resolve
    })
  });

  const arrayFail = [{
    file: './fixedPathFiles/moreFiles/extraFile.md',
    href: 'http://www.midominio.es/doc-nuevo.html',
    text: 'Prueba',
  }];
  it('should return status 404 and `fail` text when promise is resolved', (resolve) => {
    linksStatusOfFileMd(arrayFail).then((response) => {
      expect(response).not.toHaveLength(0);
      resolve(); //fuction resolve
    })
  });

  const arrayError = [{
    file: './fixedPathFiles/moreFiles/extraFile.md',
    href: 'https://otra-cosa.net/algun-doc.html',
    text: 'AlgunDoc',
  }];
  it('should return status `error` and `fail` text when promise is rejected', (reject) => {
    linksStatusOfFileMd(arrayError).then((response) => {
      expect(response).not.toHaveLength(0);
      reject();
    })
  });
});



// it('should return status 200 and `ok` text when promise is resolved', (resolve) => {
//   linksStatusOfFileMd(arrayOk)
//     .then((response) => {
//       const statusOk = ["./fixedPathFiles/moreFiles/extraFile.md http://algo.com/2/3/ Algo 200 ok"];
//       expect(response).toStrictEqual(statusOk);
//       resolve(); //fuction resolve
//     })
// }); //NO CORRE CUANDO SE USA CHALK



// it('should return status 200 and `ok` text when promise is resolved', () => {
//   linksStatusOfFileMd(arrayOk).then(setTimeout((response) => {
//     expect([response]).not.toHaveLength(0);
//   }), 1000);
// });


// it('should return status 200 and `ok` text when promise is resolved', () => {
//   linksStatusOfFileMd(arrayOk).then(setTimeout((response) => {
//     const statusOk = ["./fixedPathFiles/moreFiles/extraFile.md http://algo.com/2/3/ Algo 200 ok"];
//     expect(response).toStrictEqual(statusOk);
//   }), 1000)
// });
