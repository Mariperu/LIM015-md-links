//test: npm test ../filesLinks.spec.js

const {
  linksOfFileMd, //Lee archivo.md, busca links <a> y almacena sus prop en un array
  //linksStatusOfFileMd, //Recibe prop de links, retorna promesas y almacena status de cada link en array

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
