//test: npm test ../path.spec.js

const {
  isPath, //Verifica si existe ruta
  isPathAbsolute, //Verifica y transforma a ruta abs
  isPathFile, //Verifica si es archivo
  //isPathDirectory, //Verifica si es directorio
  showFileExt, //Muestra extensión de archivo
  readDirectory, //Lee un directorio
  readFileMd, //Lee un archivo en terminal
} = require('../src/api/path')

//Test: **VERIFICANDO SI EXISTE LA RUTA**
describe('isPath', () => {
  it('should be a function', () => {
    expect(typeof isPath).toBe('function');
  });
  it('should return true if path exists', () => {
    expect(isPath('./fixedPathFiles/tips.md')).toBe(true);
  });
  it('should return false if path does not exist', () => {
    expect(isPath('./fixedPathFiles/tips.mdd')).toBe(false);
  });
});


//Test: **VERIFICANDO SI RUTA ES ABSOLUTA**, de lo contrario, **TRANSFORMAR RELATIVA EN ABSOLUTA**
describe('isPathAbsolute', () => {
  it('should be a function', () => {
    expect(typeof isPathAbsolute).toBe('function');
  });
  it('should return the same Absolute path if path is Absolute', () => {
    expect(isPathAbsolute('C:\\Users\\Teo\\Documents\\GitHub\\LIM015-md-links\\fixedPathFiles\\tips.md'))
      .toBe(`C:\\Users\\Teo\\Documents\\GitHub\\LIM015-md-links\\fixedPathFiles\\tips.md`);
  });
  it('should transform in Absolute path if path is relative', () => {
    expect(isPathAbsolute('./fixedPathFiles/tips.md'))
      .toBe(`C:\\Users\\Teo\\Documents\\GitHub\\LIM015-md-links\\fixedPathFiles\\tips.md`);
  });
});


//Test: **VERIFICANDO SI RUTA ABSOLUTA ES ARCHIVO**
describe('isPathFile', () => {
  it('should be a function', () => {
    expect(typeof isPathFile).toBe('function');
  });
  it('should return true if path is a file', () => {
    expect(isPathFile('./fixedPathFiles/tips.md'))
      .toBe(true);
  });
  it('should return false if path is not a file', () => {
    expect(isPathFile('./fixedPathFiles'))
      .toBe(false);
  });
});


//Test: **VERIFICANDO SI RUTA ABSOLUTA ES DIRECTORIO**
// describe('isPathDirectory', () => {
//   it('should be a function', () => {
//     expect(typeof isPathDirectory).toBe('function');
//   });
//   it('should return true if path is a directory', () => {
//     expect(isPathDirectory('C:\\Users\\Teo\\Documents\\GitHub\\LIM015-md-links\\fixedPathFiles'))
//       .toBe(true);
//   });
//   it('should return false if path is not a directory', () => {
//     expect(isPathDirectory('C:\\Users\\Teo\\Documents\\GitHub\\LIM015-md-links\\fixedPathFiles\\tips.md'))
//       .toBe(false);
//   });
// });


//Test: **MOSTRANDO EXTENSION DE ARCHIVO**
describe('showFileExt', () => {
  it('should be a function', () => {
    expect(typeof showFileExt).toBe('function');
  });
  it('should show the file extension', () => {
    expect(showFileExt('./fixedPathFiles/tips.md')).toBe('.md');
  });
});

//Test: **LEER DIRECTORIO**
describe('readDirectory', () => {
  it('should be a function', () => {
    expect(typeof readDirectory).toBe('function');
  });
  it('should read a directory', () => {
    expect(readDirectory('./fixedPathFiles/moreABC')).toEqual(['abc.md']);
  });
});

//Test: **LEER UN ARCHIVO**
describe('readFileMd', () => {
  it('should be a function', () => {
    expect(typeof readFileMd).toBe('function');
  });
  it('should read a file', () => {
    expect(readFileMd('./fixedPathFiles/moreABC/abc.md')).toEqual('Texto de prueba');
  });
});
