import '@babel/polyfill';

// TODO Uncomment this when the actual database is working
// const queryUrl = groupName =>
//   `http://ckdata2.herokuapp.com/api/v1/dataset.json?group_name=${groupName}`;

// TODO Remove this when the actual database is working
const queryUrl = groupName => `/dist/json/${groupName}.json`;

const groups = [
  'PV DATA Feb 2013 KM Erratic Sculpture Coats of Arms',
  'PV DATA Feb 2013 KM Erratic Sculpture Crosses',
  'PV DATA Feb 2013 KM Erratic Sculpture Decorations',
  'PV DATA Feb 2013 KM Erratic Sculpture Fragments',
  'PV DATA Feb 2013 KM Erratic Sculpture Inscriptions',
  'PV DATA Feb 2013 KM Erratic Sculpture Other',
  'PV DATA Feb 2013 KM Erratic Sculpture Patere',
  'PV DATA Feb 2013 KM Erratic Sculpture Reliefs',
  'PV DATA Feb 2013 KM Erratic Sculpture Sculptures',
  'PV DATA Feb 2013 KM Erratic Sculpture Street Altars',
  'PV DATA Feb 2013 KM Erratic Sculpture Symbols'
];

const options = {
  mode: 'no-cors'
};

// const flatten = arrays => {
//   let innerIndex = 0;
//   let outerIndex = 0;
//   return {
//     next: () => {
//       const array = arrays[outerIndex];

//       // Check if last element
//       let done = false;
//       if (outerIndex == arrays.length - 1) {
//         if (innerIndex == array.length - 1) {
//           done = true;
//         }
//       }

//       innerIndex++;
//       if (innerIndex == array.length) {
//         innerIndex = 0;
//         outerIndex++;
//       }

//       return {
//         value: array[innerIndex],
//         done
//       };
//     }
//   };
// };

function* flatten(arrays) {
  for (const array of arrays) {
    for (const element of array) {
      yield element;
    }
  }
}

export const queryGroups = async (groups, f) => {
  const dataGroups = [];

  for (const group of groups) {
    const response = await fetch(queryUrl(group));
    const data = await response.json();
    dataGroups.push(data.map(convertArtifact));
  }

  // const flattened = flatten(dataGroups);
  f(flatten(dataGroups));
};

/**
 * Filters the group names according to artifact types.
 * @param {array} filter
 */
export const filterGroups = filter =>
  groups.filter(group => {
    for (const filterElement of filter) {
      if (group.endsWith(filterElement)) {
        return true;
      }
    }
    return false;
  });

export const queryFilter = (filter, f) => queryGroups(filterGroups(filter), f);

// const artifact = {
//   name,
//   type,
//   namePretty,
//   coverImage: 'dist/default-img.png',
//   amountDonated,
//   amountNeeded,
//   position: randomCoords()
// };

export const convertArtifact = artifact => {
  const name = artifact.ck_id;
  const type = artifact.content.type;
  const namePretty = artifact.content.wiki_friendly_title;
  const coverImage = artifact.content.image_url;
  const amountDonated = 0;
  const amountNeeded = 0;
  const position = {
    lat: artifact.lat,
    lng: artifact.lng
  };
  return {
    name,
    namePretty,
    coverImage,
    type,
    amountDonated,
    amountNeeded,
    position
  };
};
