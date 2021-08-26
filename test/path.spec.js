//test: npm test ../path.spec.js

const {
  isPath, //Verifica si existe ruta
  isPathAbsolute, //Verifica y transforma a ruta abs
  isPathFile, //Verifica si es archivo
  showFileExt, //Muestra extensión de archivo
  readDirectory, //Lee un directorio
  readFileMd, //Lee un archivo en terminal
} = require('../src/api/path')


//VERIFICA SI EXISTE LA RUTA
describe('isPath', () => {
  it('should be a function', () => {
    expect(typeof isPath).toBe('function');
  });
  it('should return true if path exists', () => {
    expect(isPath('./test/directory/file1.md')).toBe(true);
  });
  it('should return false if path does not exist', () => {
    expect(isPath('./test/directory/file100.md')).toBe(false);
  });
});


//VERIFICA Y RETORNA RUTA ES ABSOLUTA (Si ruta es relativa transforma a abs)
describe('isPathAbsolute', () => {
  it('should be a function', () => {
    expect(typeof isPathAbsolute).toBe('function');
  });
  it('should return the same Absolute path if path is Absolute', () => {
    expect(isPathAbsolute('C:\\Users\\Teo\\Documents\\GitHub\\LIM015-md-links\\test\\directory\\file1.md'))
      .toBe(`C:\\Users\\Teo\\Documents\\GitHub\\LIM015-md-links\\test\\directory\\file1.md`);
  });
  it('should transform in Absolute path if path is relative', () => {
    expect(isPathAbsolute('./test/directory/file1.md'))
      .toBe(`C:\\Users\\Teo\\Documents\\GitHub\\LIM015-md-links\\test\\directory\\file1.md`);
  });
});


//VERIFICA SI RUTA ES ARCHIVO
describe('isPathFile', () => {
  it('should be a function', () => {
    expect(typeof isPathFile).toBe('function');
  });
  it('should return true if path is a file', () => {
    expect(isPathFile('./test/directory/file1.md'))
      .toBe(true);
  });
  it('should return false if path is not a file', () => {
    expect(isPathFile('./test/directory'))
      .toBe(false);
  });
});



//MUESTRA EXTENSION DE LA RUTA
describe('showFileExt', () => {
  it('should be a function', () => {
    expect(typeof showFileExt).toBe('function');
  });
  it('should show the file extension', () => {
    expect(showFileExt('./test/directory/file1.md')).toBe('.md');
  });
});

//LEER DIRECTORIO
describe('readDirectory', () => {
  it('should be a function', () => {
    expect(typeof readDirectory).toBe('function');
  });
  it('should read a directory', () => {
    expect(readDirectory('./test/directory/subdir1')).toEqual(['fileA.md']);
  });
});

//LEER UN ARCHIVO
describe('readFileMd', () => {
  it('should be a function', () => {
    expect(typeof readFileMd).toBe('function');
  });
  it('should read a file', () => {
    expect(readFileMd('./test/directory/subdir1/fileA.md')).toEqual('Texto de prueba');
  });
});
