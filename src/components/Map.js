import React from 'react';

import { withStyles } from '@material-ui/core/styles';
import { object } from 'prop-types';
import { Paper, Typography } from '@material-ui/core';
import { withGoogleMap, GoogleMap } from 'react-google-maps';

const styles = theme => ({
  map: {
    width: '100%',
    height: '100%'
  }
});

const center = {
  lat: 45.44,
  lng: 12.32
};

const zoom = 14;

const GoogleMapExample = withGoogleMap(props => (
  <GoogleMap defaultCenter={center} defaultZoom={zoom} {...props} />
));

/**
 * A dummy map component.
 * Google Maps API Key: <API KEY>
 * @param props
 */
const Map = ({ classes }) => (
  <div className={classes.map}>
    <GoogleMapExample
      containerElement={<Paper className={classes.map} />}
      mapElement={<div style={{ height: `100%` }} />}
    />
  </div>
);

Map.propTypes = {
  classes: object.isRequired
};

export default withStyles(styles)(Map);
