//test: npm test ../index.spec.js

const {
  mdLinks,
} = require('../src/api/index')

describe('mdLinks', () => {
  it('should be a function', () => {
    expect(typeof mdLinks).toBe('function');
  });

  it('should resolve a promise and return array of `links` if validate is `false`', () => {
    expect(mdLinks(myPath, {
      validate: false
    })).toEqual("resuelve promesa y retorna array con 3 propiedades");
  });

  it('should resolve a promise and return array of `links Status` if validate is `true`', () => {
    expect(mdLinks(myPath, {
      validate: true
    })).toEqual("resuelve promesa y retorna array con 5 propiedades");
  });
});



// const mdLinks = require('../');

// describe('mdLinks', () => {

//   it('should...', () => {
//     console.log('FIX ME!');
//   });

// });
