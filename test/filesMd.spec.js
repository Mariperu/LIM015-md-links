//test: npm test ../filesMd.spec.js

const {
  searchFilesAndDirs,
  searchFilesMd,
} = require('../src/api/filesMd')


//BUSCA ELEMENTOS DENTRO DE DIRECTORIO/SUB-DIRECTORIOS
describe('searchFilesAndDirs', () => {
  it('should be a function', () => {
    expect(typeof searchFilesAndDirs).toBe('function');
  });
  it('should search names of files and directories, and store them in an array', () => {
    expect(searchFilesAndDirs('./test/directory')).not.toHaveLength(0);
  });
});


//BUSCA FILES MD
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
