//test: npm test ../stats.spec.js

const {
  countTotal,
  countUnique,
  countBroken,
} = require('../src/cli/stats')


const links = [{
  href: 'http://google.com/',
  statusText: 'ok',
}, {
  href: 'http://algo.com/2/3/',
  statusText: 'ok',
}, {
  href: 'http://algo.com/2/3/',
  statusText: 'ok',
}, {
  href: 'http://www.midominio.es/doc-nuevo.html',
  statusText: 'fail',
}, {
  href: 'https://otra-cosa.net/algun-doc.html',
  statusText: 'fail',
}]

//TOTAL links
describe('countTotal', () => {
  it('should be a function', () => {
    expect(typeof countTotal).toBe('function');
  });

  it('should count the total of links found', () => {
    expect(countTotal(links)).toBe("Total: 5");
  });
});

//UNIQUE links
describe('countUnique', () => {
  it('should be a function', () => {
    expect(typeof countUnique).toBe('function');
  });

  it('should count the unique links found', () => {
    expect(countUnique(links)).toBe("Unique: 4");
  });
});

//BROKEN links
describe('countBroken', () => {
  it('should be a function', () => {
    expect(typeof countBroken).toBe('function');
  });

  it('should count the broken links found', () => {
    expect(countBroken(links)).toBe("Broken: 2");
  });
});
