//CONTADOR DE LINKS

const countTotal = ((links) => {
  const array = links.map(link => link.href);
  return `Total: ${array.length}`;
});

const countUnique = (links) => {
  const unique = new Set();
  links.forEach((link) => unique.add(link.href))
  return `Unique: ${unique.size}`;
};

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
