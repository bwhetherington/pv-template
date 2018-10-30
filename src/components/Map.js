import React from 'react';

import { withStyles } from '@material-ui/core/styles';
import { object } from 'prop-types';
import { withGoogleMap, GoogleMap, Marker } from 'react-google-maps';
import { sampleArtifacts, windowHeight } from '../util';

// This is an unbelievably janky solution but it works FOR NOW
// We are simply subtracting the height of the header from the height of the map.
// TODO figure out how to programmatically check the height of the header
const headerSize = 48;
const height = `calc(100% - ${headerSize}px)`;

const styles = theme => ({
  map: {
    width: '100%',
    height,
    background: 'black'
  },
  mapElement: {
    height: '100%'
  }
});

const center = {
  lat: 45.44,
  lng: 12.32
};

const zoom = 14;

const MapWrapper = withGoogleMap(props => (
  <GoogleMap defaultCenter={center} defaultZoom={zoom} {...props} />
));

const renderArtifacts = (artifacts, filter, onArtifactClick) =>
  artifacts
    .filter(({ type }) => filter.indexOf(type) >= 0) // TODO make this filter not slow
    .map(artifact => {
      const { name, namePretty, position } = artifact;
      return (
        <Marker
          id={name}
          key={name}
          title={namePretty}
          position={position}
          onClick={onArtifactClick(artifact)}
        />
      );
    });

/**
 * A dummy map component.
 * Google Maps API Key: <API KEY>
 * @param props
 */
const Map = ({ artifactTypes, classes, onArtifactClick }) => (
  // <div className={classes.map} />
  <MapWrapper
    containerElement={<div className={classes.map} />}
    mapElement={<div className={classes.mapElement} />}
  >
    {renderArtifacts(sampleArtifacts, artifactTypes, onArtifactClick)}
  </MapWrapper>
);

Map.propTypes = {
  classes: object.isRequired
};

export default withStyles(styles)(Map);
