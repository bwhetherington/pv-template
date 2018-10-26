export const take = (n, xs) => {
  const taken = [];
  for (let i = 0; i < n; i++) {
    taken.push(xs[i]);
  }
  return taken;
};

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
