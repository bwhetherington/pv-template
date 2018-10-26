/**
 * Produces a list containing the first `n` elements from the specified list. If `n` is greater
 * than the length of the list, the list is returned unmodified.
 * @param n the number of elements to take
 * @param xs the list to take from
 */
export const take = (n, xs) => {
  if (n > xs.length) {
    return xs;
  }
  const taken = [];
  for (let i = 0; i < n; i++) {
    taken.push(xs[i]);
  }
  return taken;
};

/**
 * Creates an object with the specified keys each pointing to a value created by passing the key
 * to the specified transformation function.
 * @param keys the list of keys
 * @param f the transformation function
 */
export const createMap = (keys, f) => Object.assign(...keys.map(key => ({ [key]: f(key) })));

export const getSampleArtifacts = () => [
  {
    name: 'artifact1',
    namePretty: 'Inscription',
    coverImage: 'dist/default-img.png',
    amountDonated: 370,
    amountNeeded: 950
  },
  {
    name: 'artifact2',
    namePretty: 'Inscription',
    coverImage: 'dist/default-img.png',
    amountDonated: 75,
    amountNeeded: 770
  },
  {
    name: 'artifact3',
    namePretty: 'Inscription',
    coverImage: 'dist/default-img.png',
    amountDonated: 640,
    amountNeeded: 800
  },
  {
    name: 'artifact3',
    namePretty: 'Inscription',
    coverImage: 'dist/default-img.png',
    amountDonated: 200,
    amountNeeded: 1200
  }
];
