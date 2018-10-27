import React from 'react';

import { withStyles } from '@material-ui/core/styles';
import { object } from 'prop-types';
import { withGoogleMap, GoogleMap, Marker } from 'react-google-maps';
import { sampleArtifacts } from '../util';

const styles = theme => ({
  map: {
    width: '100%',
    height: 480
  },
  mapElement: {
    height: '100%',
    borderTopLeftRadius: '5px',
    borderTopRightRadius: '5px'
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
  <div className={classes.map}>
    <MapWrapper
      containerElement={<div className={classes.map} />}
      mapElement={<div className={classes.mapElement} />}
    >
      {renderArtifacts(sampleArtifacts, artifactTypes)}
    </MapWrapper>
  </div>
);

Map.propTypes = {
  classes: object.isRequired
};

export default withStyles(styles)(Map);
