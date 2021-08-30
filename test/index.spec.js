//test: npm test ../index.spec.js
const {
  mdLinks,
} = require('../src/api/index')


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























//cli********
// //test: npm test ../cli.spec.js
// const {
//   cli,
// } = require('../src/cli/cli')

// const {
//   mdLinks,
// } = require('../src/api/index');

// // const {
// //   isPath,
// // } = require('../src/api/path')

// const chalk = require('chalk');


// describe('cli', () => {
//   it('should be a function', () => {
//     expect(typeof cli).toBe('function');
//   });

//   //const argument = ['node', "../src/cli/cli.js", "./test/directory/file1.md", "--validate", "stats"]
//   //const argument = ['./test/directory/file1.md'];
//   //const argument = ['C:\\Users\\Teo\\Documents\\GitHub\\LIM015-md-links\\test\\directory\\file1.md']

//   const validateFalse = `
//   ${chalk.magenta('C:\\Users\\Teo\\Documents\\GitHub\\LIM015-md-links\\test\\directory\\file1.md')} ${chalk.white('http://google.com/')} ${chalk.cyanBright('Google')}
//   ${chalk.magenta('C:\\Users\\Teo\\Documents\\GitHub\\LIM015-md-links\\test\\directory\\file1.md')} ${chalk.white('http://algo.com/2/3/')} ${chalk.cyanBright('Algo')}
//   ${chalk.magenta('C:\\Users\\Teo\\Documents\\GitHub\\LIM015-md-links\\test\\directory\\file1.md')} ${chalk.white('http://algo.com/2/3/')} ${chalk.cyanBright('Algo')}
//   ${chalk.magenta('C:\\Users\\Teo\\Documents\\GitHub\\LIM015-md-links\\test\\directory\\file1.md')} ${chalk.white('http://www.midominio.es/doc-nuevo.html')} ${chalk.cyanBright('Prueba')}
//   ${chalk.magenta('C:\\Users\\Teo\\Documents\\GitHub\\LIM015-md-links\\test\\directory\\file1.md')} ${chalk.white('https://otra-cosa.net/algun-doc.html')} ${chalk.cyanBright('AlgunDoc')}
// `

//   const argument = ["./test/directory/file1.md", "--stats"]

//   const count = `
//   ${chalk.cyanBright("Total: 5")}
//   ${chalk.blueBright("Unique: 4")}
//   `

//   test('`md-links <path-to-file> --stats` should return number of total and unique links found', (done) => {
//     cli(argument[1]).then((response) => {
//       expect(response).toEqual(count);
//       done()
//     })
//   });




//console.log("*****PRUEBA", cli(['./test/directory/file1.md']))

//   it('`md-links <path-to-file>` should return links found', (done) => {
//     cli('./test/directory/file1.md').then((response) => {
//       expect(response).toEqual(validateFalse);
//       done();
//     })
//     //expect(cli('./test/directory/file1.md')).toBe(validateFalse);
//   });


//   test('`md-links <path-to-file>` should return links found', () => {
//     // if (cli(argument)) {
//     const md = mdLinks(argument[0], {
//       validate: false
//     }).then((response) => {
//       response.forEach(link => {
//         (`${chalk.magenta(link.file)} ${chalk.white(link.href)} ${chalk.cyanBright(link.text)}`); //Retorna {href, text, file}
//       })
//     });
//     //}
//     expect(md).toEqual(validateFalse);
//   });




//   it('`md-links <path-to-file>` should return links found', () => {
//     //(expect(cli(argument0).toBe(undefined)));
//     console.log(expect(cli(argument0).toEqual(validateFalse)));
//   });
//   console.log('esto sale: ', cli(argument0));

//   test('`md-links <path-to-file>` should return links found', () => {
//     cli(argument).then((response) => {
//       response.forEach(link => {
//         console.log(expect(link).toEqual(validateFalse));
//       })
//     })
//   });







//   test('should resolve a promise and return array of `
//   links Status ` if validate is `
//   true `', () => {
//     return mdLinks(myPath, {
//       validate: true
//     }).then((response) => {
//       expect(response).toEqual(validateTrue);
//     });
//   });


//   test('should resolve a promise and return array of `
//   links Status ` if validate is `
//   true `', () => {
//     return mdLinks(myPath, {
//       validate: true
//     }).then((response) => {
//       expect(response).toEqual(validateTrue);
//     });
//   });

// });
