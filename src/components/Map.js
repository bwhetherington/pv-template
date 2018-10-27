import React from 'react';

import { withStyles } from '@material-ui/core/styles';
import { Paper } from '@material-ui/core';
import { object } from 'prop-types';
import { withGoogleMap, GoogleMap, Marker } from 'react-google-maps';
import { sampleArtifacts } from '../util';

const styles = theme => ({
  map: {
    width: '100%',
    height: '500px'
  },
  mapElement: {
    height: '100%',
    borderRadius: '4px'
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

const onArtifactClick = name => () => {
  location.href = `/artifacts/${name}`;
};

const renderArtifacts = (artifacts, filter) =>
  artifacts
    .filter(({ type }) => filter.indexOf(type) >= 0) // TODO make this filter not slow
    .map(({ name, namePretty, position }) => (
      <Marker key={name} title={namePretty} position={position} onClick={onArtifactClick(name)} />
    ));

/**
 * A dummy map component.
 * Google Maps API Key: <API KEY>
 * @param props
 */
const Map = ({ artifactTypes, classes }) => (
  <MapWrapper
    containerElement={<Paper className={classes.map} />}
    mapElement={<div className={classes.mapElement} />}
  >
    {renderArtifacts(sampleArtifacts, artifactTypes)}
  </MapWrapper>
);

Map.propTypes = {
  classes: object.isRequired
};

export default withStyles(styles)(Map);
