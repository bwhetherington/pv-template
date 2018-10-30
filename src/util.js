/**
 * Produces a list containing the first `n` elements from the specified list. If `n` is greater
 * than the length of the list, the list is returned unmodified.
 * @param {number} n the number of elements to take
 * @param {array} xs the list to take from
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
 * @param {array} keys the list of keys
 * @param {func} f the transformation function
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
 * @param {object} center the center
 * @param {number} variance the variance
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

/**
 * Produces a list of randomly generated artifacts.
 * @param {number} artifactCount the number of artifacts to generate
 */
const generateArtifact = artifactCount => {
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

  return artifact;
};

const numberToGenerate = 200;

/**
 * Produces a sample of randomly-generated artifacts.
 */
const generateSampleArtifacts = () => {
  let artifactCount = 0;
  const artifacts = [];
  for (let i = 0; i < numberToGenerate; i++) {
    const artifact = generateArtifact(artifactCount);
    artifactCount++;
    artifacts.push(artifact);
  }
  return artifacts;
};

/**
 * Produces an estimate of the priority of the specified artifact.
 * @param {object} artifact the artifact
 */
export const estimatePriority = ({ amountDonated, amountNeeded }) => amountDonated / amountNeeded;

/**
 * Produces a view of the specified artifact, containing all necessary fields to be rendered.
 * @param {object} artifact the artifact to view
 */
export const viewArtifact = artifact => ({
  ...artifact,
  priority: estimatePriority(artifact)
});

export const sampleArtifacts = generateSampleArtifacts().map(viewArtifact);

/**
 * Produces a list of artifacts equal to the specified list, sorted by priority.
 * @param {array} artifacts
 */
export const prioritySample = artifacts =>
  [...artifacts].sort(({ priority: a }, { priority: b }) => b - a);

export const priorityArtifactsSample = take(3, prioritySample(sampleArtifacts));
