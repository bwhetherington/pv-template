import '@babel/polyfill';
import { iterator } from 'lazy-iters';

// TODO Uncomment this when the actual database is working
// const queryUrl = groupName =>
//   `http://ckdata2.herokuapp.com/api/v1/dataset.json?group_name=${groupName}`;

// TODO Remove this when the actual database is working
const queryUrl = groupName => `/static/json/${groupName}.json`;

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
  'PV DATA Feb 2013 KM Erratic Sculpture Symbols',
  // 'PV DATA 2014 KM Newly Documented Fountains',
  'PV FINAL DATA 2014 KM Fountains',
  'PV DATA Apr 2013 KM Flagstaff Pedestals'
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

export async function* queryGroupsAsync(types = groups) {
  for (const group of types) {
    try {
      const response = await fetch(queryUrl(group));
      const data = await response.json();
      yield* data.map(convertArtifact);
    } catch (ex) {
      console.log(ex);
    }
  }
}

export function filterGroups(types) {
  const typesIter = iterator(types);
  return iterator(groups)
    .filter(group => typesIter.any(type => group.endsWith(type)))
    .collect();
}

// const artifact = {
//   name,
//   type,
//   namePretty,
//   coverImage: 'static/default-img.png',
//   amountDonated,
//   amountNeeded,
//   position: randomCoords()
// };

export function convertArtifact(artifact) {
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
    position,
    description: artifact.content.description_italian
  };
}
