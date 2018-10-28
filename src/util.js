import { number } from 'prop-types';

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

const venice = {
  lat: 45.44,
  lng: 12.32
};

/**
 * Generates a random set of coordinates with a latitude and longitude offset from the specified
 * center by plus or minus the specified variance. This function should only be used for generating
 * random coordinates for testing artifacts, and should be removed when we have actual artifact
 * data.
 * @param center the center
 * @param variance the variance
 */
const randomCoords = (center = venice, variance = 0.01) => {
  const latOffset = (Math.random() - 0.5) * variance * 2;
  const lngOffset = (Math.random() - 0.5) * variance * 2;

  return {
    lat: center.lat + latOffset,
    lng: center.lng + lngOffset
  };
};

/**
 * Represents all of the available artifact types.
 */
export const artifactTypes = [
  'Coats of Arms',
  'Crosses',
  'Decorations',
  'Flagstaff Pedestals',
  'Fountains',
  'Fragments',
  'Inscriptions',
  'Other',
  'Patere',
  'Reliefs',
  'Sculptures',
  'Street Altars',
  'Symbols'
];

let artifactCount = 0;

const generateArtifact = () => {
  const name = `artifact${artifactCount}`;

  const typeId = Math.trunc(Math.random() * artifactTypes.length);
  const type = artifactTypes[typeId];

  const namePretty = `Artifact ${artifactCount}`;

  const amountNeeded = Math.trunc(Math.random() * 500) + 500;
  const amountDonated = Math.trunc(Math.random() * amountNeeded);

  const artifact = {
    name,
    type,
    namePretty,
    coverImage: 'dist/default-img.png',
    amountDonated,
    amountNeeded,
    position: randomCoords()
  };
  artifactCount++;

  return artifact;
};

// const generateSampleArtifacts = () => [
//   {
//     name: 'artifact1',
//     type: 'Inscriptions',
//     namePretty: 'Inscription',
//     coverImage: 'dist/default-img.png',
//     amountDonated: 370,
//     amountNeeded: 950,
//     position: randomCoords()
//   },
//   {
//     name: 'artifact2',
//     type: 'Inscriptions',
//     namePretty: 'Inscription',
//     coverImage: 'dist/default-img.png',
//     amountDonated: 75,
//     amountNeeded: 770,
//     position: randomCoords()
//   },
//   {
//     name: 'artifact3',
//     type: 'Fountains',
//     namePretty: 'Fountain',
//     coverImage: 'dist/default-img.png',
//     amountDonated: 640,
//     amountNeeded: 800,
//     position: randomCoords()
//   },
//   {
//     name: 'artifact4',
//     type: 'Reliefs',
//     namePretty: 'Relief',
//     coverImage: 'dist/default-img.png',
//     amountDonated: 200,
//     amountNeeded: 1200,
//     position: randomCoords()
//   },
//   {
//     name: 'artifact5',
//     type: 'Symbols',
//     namePretty: 'Symbol',
//     coverImage: 'dist/default-img.png',
//     amountDonated: 200,
//     amountNeeded: 1200,
//     position: randomCoords()
//   }
// ];

const numberToGenerate = 7000;

const generateSampleArtifacts = () => {
  const artifacts = [];
  for (let i = 0; i < numberToGenerate; i++) {
    const artifact = generateArtifact();
    artifacts.push(artifact);
  }
  return artifacts;
};

export const estimatePriority = ({ amountDonated, amountNeeded }) => amountDonated / amountNeeded;

export const viewArtifact = artifact => ({
  ...artifact,
  priority: estimatePriority(artifact)
});

export const sampleArtifacts = generateSampleArtifacts().map(viewArtifact);

export const prioritySample = artifacts =>
  [...artifacts].sort(({ priority: a }, { priority: b }) => b - a);

export const priorityArtifactsSample = take(3, prioritySample(sampleArtifacts));

export const windowWidth = () =>
  window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;

export const windowHeight = () =>
  window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
