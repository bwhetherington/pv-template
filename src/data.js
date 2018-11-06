import '@babel/polyfill';
import { iterator } from 'lazy-iters';

// TODO Uncomment this when the actual database is working
// const queryUrl = groupName =>
//   `http://ckdata2.herokuapp.com/api/v1/dataset.json?group_name=${groupName}`;

function queryUrl(groupName) {
  return `http://localhost:8888/groups/${groupName}`;
}

// TODO Remove this when the actual database is working
// const queryUrl = groupName => `/static/json/${groupName}.json`;

export const groups = [
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
      yield* data;
    } catch (ex) {
      console.log(ex);
    }
  }
}

export function filterGroups(types) {
  return iterator(groups)
    .filter(group => iterator(types).any(type => group.endsWith(type)))
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

function isVowel(c) {
  if (c === null || c === undefined) {
    return false;
  }
  const char = c.toLowerCase();
  return c == 'a' || c == 'e' || c == 'i' || c == 'o' || c == 'u';
}

function article(name) {
  if (name === null || name == undefined) {
    return 'A';
  }
  return isVowel(name[0]) ? 'An' : 'A';
}

function formatAddress(address) {
  const sestiere = address.substring(0, 2).toLowerCase();
  const num = address.substring(2);
  return `${sestiere}' ${num}`;
}

function makeDescription(artifact) {
  const { type, subtype, sestiere, approximate_year, material, street_address } = artifact.content;
  const year =
    approximate_year === null || approximate_year === undefined ? 'unknown' : approximate_year;
  const isUnknown = year.localeCompare('unknown') == 0;

  const typeName =
    subtype === null || subtype === undefined ? type.toLowerCase() : subtype.toLowerCase();

  if (year !== null && year !== undefined && !isUnknown) {
    return `${article(
      typeName
    )} ${typeName} in ${sestiere} from ${approximate_year}, made out of ${material}. This artifact can be found at ${street_address}.`;
  } else {
    return `${article(
      typeName
    )} ${typeName} in ${sestiere}, made out of ${material}. This artifact can be found at ${street_address}.`;
  }
}

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
    description: makeDescription(artifact)
  };
}
