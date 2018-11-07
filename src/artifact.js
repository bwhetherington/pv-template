/**
 * Artifact types
 * --------------------
 * Coats of Arms
 * Crosses
 * Decorations
 * Fragments
 * Inscriptions
 * Other
 * Patere
 * Reliefs
 * Sculptures
 * Street Altars
 * Symbols
 * Fountains
 * Flagstaff Pedestals
 * --------------------
 */

import { groups } from './data';

function createDefault(basicType, rawData) {
  const { content } = rawData;
  const { material, sestiere, approximate_year, subtype } = content;
  const type = isValidDatum(subtype) ? subtype.toLowerCase() : basicType.toLowerCase();
  const yearLabel = isValidDatum(approximate_year) ? ` from ${approximate_year}` : '';
  const description = `A ${type} made of ${material}${yearLabel} in ${sestiere}.`;
  return {
    type: basicType,
    description,
    descriptionLong: description
  };
}

function createCoatOfArms(rawData) {
  const { content } = rawData;
  const { sestiere, family, approximate_year, material } = content;
  const familyLabel = isValidDatum(family) ? `${family} family ` : '';
  const yearLabel = isValidDatum(approximate_year) ? ` from ${approximate_year}` : '';
  const description = `A ${familyLabel}coat of arms${yearLabel} made of ${material} in ${sestiere}.`;
  return {
    type: 'Coat of Arms',
    description,
    descriptionLong: description
  };
}

function createCross(rawData) {
  return createDefault('Cross', rawData);
}

function createDecoration(rawData) {
  return createDefault('Decoration', rawData);
}

function createFragment(rawData) {
  return createDefault('Fragment', rawData);
}

function createInscription(rawData) {
  return createDefault('Inscription', rawData);
}

function createOther(rawData) {
  const { content } = rawData;
  const { material, sestiere, approximate_year, subtype } = content;
  const type = isValidDatum(subtype) ? subtype.toLowerCase() : 'artifact';
  const yearLabel = isValidDatum(approximate_year) ? ` from ${approximate_year}` : '';
  const description = `A ${type} made of ${material}${yearLabel} in ${sestiere}.`;
  return {
    type: 'Other',
    description,
    descriptionLong: description
  };
}

function createPatera(rawData) {
  return createDefault('Patera', rawData);
}

function createRelief(rawData) {
  return createDefault('Relief', rawData);
}

function createSculpture(rawData) {
  return createDefault('Sculpture', rawData);
}

function createStreetAltar(rawData) {
  return createDefault('Street Altar', rawData);
}

function createSymbol(rawData) {
  return createDefault('Symbol', rawData);
}

function createFountain(rawData) {
  const { content } = rawData;
  const { material, sestiere_or_island, approximate_year, subtype } = content;
  const type = isValidDatum(subtype) ? subtype.toLowerCase() : 'fountain';
  const yearLabel = isValidDatum(approximate_year) ? ` from ${approximate_year}` : '';
  const description = `A ${type} made of ${material}${yearLabel} in ${sestiere_or_island}.`;
  return {
    type: 'Fountain',
    description,
    descriptionLong: description
  };
}

function createFlagstaffPedestal(rawData) {
  const { content } = rawData;
  const { sestiere, body_material, approximate_year, subtype } = content;
  const type = isValidDatum(subtype) ? subtype.toLowerCase() : 'flagstaff pedestal';
  const yearLabel = isValidDatum(approximate_year) ? ` from ${approximate_year}` : '';
  const description = `A ${type} made of ${body_material}${yearLabel} in ${sestiere}.`;
  return {
    type: 'Flagstaff Pedestal',
    description,
    descriptionLong: description
  };
}

function isValidDatum(str) {
  return (
    str !== null &&
    str !== undefined &&
    str.length > 0 &&
    str.toLowerCase().localeCompare('unknown') !== 0 &&
    !str.endsWith('?')
  );
}

const placeholderImage = '/static/default-img.png';

export function createArtifact(rawData) {
  const { image_url } = rawData.content;
  const imageUrl = isValidDatum(image_url) ? image_url : placeholderImage;
  const artifact = {
    rawData,
    newData: {
      id: rawData.ck_id,
      name: rawData.content.wiki_friendly_title,
      position: {
        lat: rawData.lat,
        lng: rawData.lng
      },
      type: rawData.content.type,
      subtype: rawData.content.subtype,
      amountNeeded: 0, // Pending any way to actually store this
      amountDonated: 0, // Pending any way to actually store this
      coverImage: imageUrl,
      description: '',
      descriptionLong: ''
    }
  };
  const specific = createSpecificArtifact(artifact.rawData);
  return {
    ...artifact.newData,
    ...specific
  };
}

/**
 *
 * @param {*} rawData
 */
function createSpecificArtifact(rawData) {
  const group = rawData.item_type;
  switch (group) {
    case groups[0]:
      return createCoatOfArms(rawData);
    case groups[1]:
      return createCross(rawData);
    case groups[2]:
      return createDecoration(rawData);
    case groups[3]:
      return createFragment(rawData);
    case groups[4]:
      return createInscription(rawData);
    case groups[5]:
      return createOther(rawData);
    case groups[6]:
      return createPatera(rawData);
    case groups[7]:
      return createRelief(rawData);
    case groups[8]:
      return createSculpture(rawData);
    case groups[9]:
      return createStreetAltar(rawData);
    case groups[10]:
      return createSymbol(rawData);
    case groups[11]:
      return createFountain(rawData);
    case groups[12]:
      return createFlagstaffPedestal(rawData);
  }
}
