//test: npm test ../filesMd.spec.js

const {
  isFileMd, //Verifica si file es .md y almacena en un array
  searchFilesMdInDirectory, //Busca archivos.md en directorio/subdirectorio
} = require('../src/api/filesMd')


//Test: **VERIFICANDO SI ARCHIVO ES .md, luego ALMACENAR en un array**
describe('isFileMd', () => {
  it('should be a function', () => {
    expect(typeof isFileMd).toBe('function');
  });
  it('should store the file in an array if file is`.md`', () => {
    expect(isFileMd('./fixedPathFiles/tips.md')).not.toHaveLength(0);
  });
  it('should be an empty array if file is not`.md`', () => {
    expect(isFileMd('./fixedPathFiles/tips.txt')).not.toHaveLength(1);
  });
});

//Test: **BUSCANDO ARCHIVOS CON EXTENCION .md en DIRECTORIOS/SUBDIRECTORIOS, y almacenarlos en un array**
describe('searchFilesMdInDirectory', () => {
  it('should be a function', () => {
    expect(typeof searchFilesMdInDirectory).toBe('function');
  });
  it('should return an array with total files`.md`', () => {
    expect(searchFilesMdInDirectory('C:\\Users\\Teo\\Documents\\GitHub\\LIM015-md-links\\fixedPathFiles'))
      .not.toHaveLength(0);
  });
});
