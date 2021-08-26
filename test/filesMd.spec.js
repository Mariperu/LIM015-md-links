//test: npm test ../filesMd.spec.js

const {
  searchFilesAndDirs,
  searchFilesMd,
} = require('../src/api/filesMd')


//BUSCAR ELEMENTOS DENTRO DE DIRECTORIO/SUB-DIRECTORIOS
describe('searchFilesAndDirs', () => {
  it('should be a function', () => {
    expect(typeof searchFilesAndDirs).toBe('function');
  });
  it('should search names of files and directories, and store them in an array', () => {
    expect(searchFilesAndDirs('./test/directory')).not.toHaveLength(0);
  });
});


//BUSCANDO FILES MD
describe('searchFilesMd', () => {
  it('should be a function', () => {
    expect(typeof searchFilesMd).toBe('function');
  });
  it('should store the file `.md` in an array if path is file', () => {
    expect(searchFilesMd('./test/directory/file1.md')).not.toHaveLength(0);
  });
  it('should store file(s) `.md` in an array if path is directory/subdirectory', () => {
    expect(searchFilesMd('./test/directory')).not.toHaveLength(0);
  });
});






// //Test: **VERIFICANDO SI ARCHIVO ES .md, luego ALMACENAR en un array**
// describe('isFileMd', () => {
//   it('should be a function', () => {
//     expect(typeof isFileMd).toBe('function');
//   });
//   it('should store the file in an array if file is`.md`', () => {
//     expect(isFileMd('./fixedPathFiles/tips.md')).not.toHaveLength(0);
//   });
//   it('should be an empty array if file is not`.md`', () => {
//     expect(isFileMd('./fixedPathFiles/tips.txt')).not.toHaveLength(1);
//   });
// });

// //Test: **BUSCANDO ARCHIVOS CON EXTENCION .md en DIRECTORIOS/SUBDIRECTORIOS, y almacenarlos en un array**
// describe('searchFilesMdInDirectory', () => {
//   it('should be a function', () => {
//     expect(typeof searchFilesMdInDirectory).toBe('function');
//   });
//   it('should return an array with total files`.md`', () => {
//     expect(searchFilesMdInDirectory('C:\\Users\\Teo\\Documents\\GitHub\\LIM015-md-links\\fixedPathFiles'))
//       .not.toHaveLength(0);
//   });
// });
