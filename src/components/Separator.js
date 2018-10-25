import React from 'react';
import { object } from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { Divider } from '@material-ui/core';

const styles = theme => ({
  separator: {
    paddingTop: theme.spacing.unit * 3,
    paddingBottom: theme.spacing.unit * 3
  }
});

const Separator = ({ classes }) => (
  <div className={classes.separator}>
    <Divider />
  </div>
);

Separator.protoTypes = {
  classes: object.isRequired
};

export default withStyles(styles)(Separator);
