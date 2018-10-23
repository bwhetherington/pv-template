import React from 'react';
import Page from './Page';

import { object } from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';

const styles = _ => {};

/**
 * This component renders the PreserVenice website's contact page.
 */
const Contact = _ => (
  <Page selected="contact">
    <Typography variant="headline">Contact us</Typography>
    <Typography>Contact us</Typography>
  </Page>
);

Contact.propTypes = {
  classes: object.isRequired
};

export default withStyles(styles)(Contact);
