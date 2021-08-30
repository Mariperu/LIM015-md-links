#! / usr / bin / env nodo
 //#!/usr/bin/env nodo
//Para que se ejecute el módulo con npm

//CLI - Interfaz de Línea de Comando
//TERMINAL: node ./src/cli/cli.js ./test/directory/file1.md --validate


//Ejecutando módulo chalk, para colocar colores en líneas de comando
const chalk = require('chalk');

const {
  isPath,
} = require('../api/path');

const {
  linksOfFileMd, //array
} = require('../api/filesLinks');

const {
  countTotal,
  countUnique,
  countBroken,
} = require('./stats');

const {
  mdLinks,
} = require('../api/index');

//[0]:node / [1]:file.js / [2, 3, 4, ...]:arguments
const argument = process.argv.slice(2); //para considerar arg[0]. desde posición 2
//const argument = process.argv.slice(0);
//console.log("ARGUMENT: ***", argument)
const cli = (argument) => {
  if (isPath(argument[0])) { //[2]
    if (linksOfFileMd(argument[0]).length > 0) { //verifica si hay links
      //RUTA
      if (argument.length === 1) { //myPath

        mdLinks(argument[0], {
          validate: false
        }).then((response) => {
          response.forEach(link => { //{file, href, text}
            console.log(`${chalk.magenta(link.file)} ${chalk.white(link.href)} ${chalk.cyanBright(link.text)}`); //Retorna {href, text, file}
          })
        });
      }
      //OPTION: --validate || --stats || --help
      else if (argument.length === 2) {
        switch (argument[1]) {

          case '--validate':
            mdLinks(argument[0], {
              validate: true
            }).then((respArray) => {
              respArray.forEach(link => {
                if (link.status >= 200 && link.status < 400) { //{file, href, text, status, statusText}
                  console.log(`${chalk.magenta(link.file)} ${chalk.white(link.href)} ${chalk.cyanBright(link.text)} ${chalk.greenBright(link.status)} ${chalk.green(link.statusText)}`);
                } else {
                  console.log(`${chalk.magenta(link.file)} ${chalk.white(link.href)} ${chalk.cyanBright(link.text)} ${chalk.yellowBright(link.status)} ${chalk.redBright(link.statusText)}`);
                }
              });
            });
            break;

          case '--stats':
            mdLinks(argument[0], {
              validate: true
            }).then((respArray) => console.log(`${chalk.cyanBright(countTotal(respArray))}\n${chalk.blueBright(countUnique(respArray))}`));
            break;

          case '--help':
            const textHelp = `
            *****************************************  INSTRUCCIONES  *****************************************
            ${chalk.blueBright('<> Ingresa la ruta de la siguiente manera:')}
            ${chalk.magentaBright('md-links <path-to-file>')} : muestra los links encontrados de la ruta ingresada.
            ${chalk.magentaBright('md-links <path-to-file> [options]')} : muestra información adicional de links encontrados.
            ${chalk.blueBright('<> Puedes ingresar las siguientes opciones:')}
            ${chalk.greenBright('--validate')} : para validar si los links funcionan (ok) o no (fail).
            ${chalk.cyanBright('--stats')} : para obtener el número total de links y links únicos (no repetidos).
            ${chalk.yellow('--stats --validate o --validate --stats')} : para obtener total de links, links únicos y rotos (fail).
            ***************************************************************************************************`

            console.log(textHelp);
            break;

          default:
            console.log(chalk.cyanBright('Ingresa comandos válidos o escribe `--help` para ayudarte'));
        }
      }
      //OPTION: --validate & --stats
      else if (argument.length === 3) {
        if ((argument[1] === '--validate' && argument[2] === '--stats') ||
          (argument[1] === '--stats' && argument[2] === '--validate')) {

          mdLinks(argument[0], {
            validate: true
          }).then((respArray) => console.log(`${chalk.cyanBright(countTotal(respArray))}\n${chalk.blueBright(countUnique(respArray))}\n${chalk.magentaBright(countBroken(respArray))}`));
        } else {
          console.log(chalk.cyanBright('Ingresa comandos válidos o escribe `--help` para ayudarte'));
        }
      } else {
        console.log(chalk.cyanBright('Ingresa comandos válidos o escribe `--help` para ayudarte'));
      }

    } else {
      console.log(chalk.blueBright('La ruta no tiene archivos Markdown con links.'));
    }

  } else {
    console.log(chalk.redBright('La ruta no existe.'));
  }
}
cli(argument);
//cli();

module.exports = {
  cli, //Interfaz de Línea de Comando
};
