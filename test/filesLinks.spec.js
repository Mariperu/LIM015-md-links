//test: npm test ../filesLinks.spec.js

const {
  linksOfFileMd, //array
  linksStatus, //array de promesas

} = require('../src/api/filesLinks')


//VERIFICANDO SI archivo.md TIENE LINKS, Y GUARDANDO SUS PROPIEDADES EN ARRAY
describe('linksOfFileMd', () => {
  it('should be a function', () => {
    expect(typeof linksOfFileMd).toBe('function');
  });
  it('should store the properties of each link in an array if file has links', () => {
    expect(linksOfFileMd('./test/directory/file1.md')).not.toHaveLength(0);
  });
  it('should be an empty array if there are not links', () => {
    expect(linksOfFileMd('./test/directory/subdir1/fileA.md')).not.toHaveLength(1);
  });
});


//ALMACENANDO STATUS DE LINKS {href, text, file, status, statusText} EN ARRAY
describe('linksStatus', () => {
  it('should be a function', () => {
    expect(typeof linksStatus).toBe('function');
  });

  const arrayOk = [{
    file: './test/directory/file1.md',
    href: 'http://algo.com/2/3/',
    text: 'Algo',
  }];

  const statusOk = [{
    file: './test/directory/file1.md',
    href: 'http://algo.com/2/3/',
    text: 'Algo',
    status: 200,
    statusText: "ok",
  }];

  it('should return status 200 and `ok` text when promise is resolved', (resolve) => {
    linksStatus(arrayOk).then((response) => {
      expect(response).toEqual(statusOk);
      resolve(); //fuction resolve
    });
  });

  const arrayFail = [{
    file: './test/directory/file1.md',
    href: 'http://www.midominio.es/doc-nuevo.html',
    text: 'Prueba',
  }];

  const statusFail = [{
    file: "./test/directory/file1.md",
    href: "http://www.midominio.es/doc-nuevo.html",
    text: "Prueba",
    status: 404,
    statusText: "fail",
  }];

  it('should return status 404 and `fail` text when promise is resolved', (resolve) => {
    linksStatus(arrayFail).then((response) => {
      expect(response).toEqual(statusFail);
      resolve(); //fuction resolve
    })
  });

  const arrayError = [{
    file: './test/directory/file1.md',
    href: 'https://otra-cosa.net/algun-doc.html',
    text: 'AlgunDoc',
  }];

  const statusError = [{
    file: "./test/directory/file1.md",
    href: "https://otra-cosa.net/algun-doc.html",
    text: "AlgunDoc",
    status: "error",
    statusText: "fail",
  }];

  it('should return status `error` and `fail` text when promise is rejected', (reject) => {
    linksStatus(arrayError).then((response) => {
      expect(response).toEqual(statusError);
      reject();
    })
  });
});




// it('should return status 200 and `ok` text when promise is resolved', () => {
//   linksStatusOfFileMd(arrayOk).then(setTimeout((response) => {
//     const statusOk = ["./fixedPathFiles/moreFiles/extraFile.md http://algo.com/2/3/ Algo 200 ok"];
//     expect(response).toStrictEqual(statusOk);
//   }), 1000)
// });


//************* */
// it('should return status 200 and `ok` text in an Array when promise is resolved', (resolve) => {
//   linksStatus(arrayOk).then((response) => {
//     expect(response).not.toHaveLength(0);
//     resolve(); //fuction resolve
//   })
// });
