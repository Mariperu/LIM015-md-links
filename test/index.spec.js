//test: npm test ../index.spec.js
const mdLinks = require('../src/api/index')


describe('mdLinks', () => {
  it('should be a function', () => {
    expect(typeof mdLinks).toBe('function');
  });

  const myPath = './test/directory/file2.md';

  const validateFalse = [{
    file: 'C:\\Users\\Teo\\Documents\\GitHub\\LIM015-md-links\\test\\directory\\file2.md',
    href: 'http://algo.com/2/3/',
    text: 'Algo',
  }, {
    file: 'C:\\Users\\Teo\\Documents\\GitHub\\LIM015-md-links\\test\\directory\\file2.md',
    href: 'http://www.midominio.es/doc-nuevo.html',
    text: 'Prueba',
  }, {
    file: 'C:\\Users\\Teo\\Documents\\GitHub\\LIM015-md-links\\test\\directory\\file2.md',
    href: 'https://otra-cosa.net/algun-doc.html',
    text: 'AlgunDoc',
  }];

  test('should resolve a promise and return array of `links` if validate is `false`', () => {
    return mdLinks(myPath, {
      validate: false
    }).then((response) => {
      expect(response).toEqual(validateFalse);
    });
  });

  const validateTrue = [{
    file: 'C:\\Users\\Teo\\Documents\\GitHub\\LIM015-md-links\\test\\directory\\file2.md',
    href: 'http://algo.com/2/3/',
    text: 'Algo',
    status: 200,
    statusText: "ok",
  }, {
    file: "C:\\Users\\Teo\\Documents\\GitHub\\LIM015-md-links\\test\\directory\\file2.md",
    href: "http://www.midominio.es/doc-nuevo.html",
    text: "Prueba",
    status: 404,
    statusText: "fail",
  }, {
    file: "C:\\Users\\Teo\\Documents\\GitHub\\LIM015-md-links\\test\\directory\\file2.md",
    href: "https://otra-cosa.net/algun-doc.html",
    text: "AlgunDoc",
    status: 404,
    statusText: "fail",
  }];

  test('should resolve a promise and return array of `links Status` if validate is `true`', () => {
    return mdLinks(myPath, {
      validate: true
    }).then((response) => {
      expect(response).toEqual(validateTrue);
    });
  });

});
