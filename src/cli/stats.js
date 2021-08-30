//CONTADOR DE LINKS
//terminal:  node ./src/cli/stats


//TOTAL links
const countTotal = ((links) => {
  const array = links.map(link => link.href);
  return `Total: ${array.length}`;
});

//UNIQUE links
const countUnique = (links) => {
  //new Set: {} objeto que permite almacenar valores únicos de cualquier tipo.
  const unique = new Set();
  links.forEach((link) => unique.add(link.href)) //.add(), método de set (agrega elems)
  return `Unique: ${unique.size}`; //.size(), método de set (indica tamaño/cant de elems)
};

//BROKEN links (fail links)
const countBroken = (links) => {
  let counter = 0;
  links.forEach((link) => {
    if (link.statusText === 'fail') {
      counter += 1;
    }
  });
  return `Broken: ${counter}`;
};


module.exports = {
  countTotal,
  countUnique,
  countBroken,
};
