import React from 'react';

import { withStyles } from '@material-ui/core/styles';
import { object } from 'prop-types';
import { Paper, Typography } from '@material-ui/core';

const styles = theme => ({
  map: {
    // width: '100%',
    height: 480
  }
});

/**
 * A dummy map component.
 * Google Maps API Key: <API KEY>
 * @param props
 */
const Map = ({ classes }) => (
  <Paper className={classes.map}>
    <Typography variant="headline" align="center">
      Map goes here
    </Typography>
  </Paper>
);

Map.propTypes = {
  classes: object.isRequired
};

export default withStyles(styles)(Map);
