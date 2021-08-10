//test: npm test ../api.spec.js

const {
  isPath,
  isPathAbsolute,
  isPathFile,
  isPathDirectory,
  showingFileExt,
  isFileMd,
  searchFilesMdInDirectory,

} = require('../api')


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
    expect(isPathFile('C:\\Users\\Teo\\Documents\\GitHub\\LIM015-md-links\\fixedPathFiles\\tips.md'))
      .toBe(true);
  });
  it('should return false if path is not a file', () => {
    expect(isPathFile('C:\\Users\\Teo\\Documents\\GitHub\\LIM015-md-links\\fixedPathFiles'))
      .toBe(false);
  });
});

//Test: **VERIFICANDO SI RUTA ABSOLUTA ES DIRECTORIO**
describe('isPathDirectory', () => {
  it('should be a function', () => {
    expect(typeof isPathDirectory).toBe('function');
  });
  it('should return true if path is a directory', () => {
    expect(isPathDirectory('C:\\Users\\Teo\\Documents\\GitHub\\LIM015-md-links\\fixedPathFiles'))
      .toBe(true);
  });
  it('should return false if path is not a directory', () => {
    expect(isPathDirectory('C:\\Users\\Teo\\Documents\\GitHub\\LIM015-md-links\\fixedPathFiles\\tips.md'))
      .toBe(false);
  });
});

//Test: **MOSTRANDO EXTENSION DE ARCHIVO**
describe('showingFileExt', () => {
  it('should be a function', () => {
    expect(typeof showingFileExt).toBe('function');
  });
  it('should show the file extension', () => {
    expect(showingFileExt('./fixedPathFiles/tips.md')).toBe('.md');
  });
});

//Test: **VERIFICANDO SI ARCHIVO ES .md, luego ALMACENAR en un array**
describe('isFileMd', () => {
  it('should be a function', () => {
    expect(typeof isFileMd).toBe('function');
  });
  it('should be stored the file in an array if file is`.md`', () => {
    expect(isFileMd('./fixedPathFiles/tips.md')).not.toHaveLength(2);
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
