//test: npm test ../filesLinks.spec.js

const {
  linksOfFileMd,
  linksStatus,

} = require('../src/api/filesLinks')


//VERIFICA SI FILE TIENE LINKS, GUARDA SUS PROPIEDADES EN ARRAY
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


//ALMACENA STATUS DE LINKS EN ARRAY
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

  test('should return status 200 and `ok` text when promise is resolved', () => {
    return linksStatus(arrayOk).then((response) => {
      expect(response).toEqual(statusOk);
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

  test('should return status 404 and `fail` text when promise is resolved', () => {
    return linksStatus(arrayFail).then((response) => {
      expect(response).toEqual(statusFail);
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
    status: 404,
    statusText: "fail",
  }];

  test('should return status 404 and `fail` text when promise is rejected', () => {
    //expect.assertions(1); // para verificar que un cierto número de afirmaciones están siendo llamadas.
    return linksStatus(arrayError).catch((e) => {
      expect(e).toEqual(statusError);
    })
  });
});
