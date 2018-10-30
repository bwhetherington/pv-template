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
    <Typography paragraph variant="headline">
      Contact us, Help us preserve Venetian heritage!
    </Typography>
    <Typography paragraph variant="title">
      Follow our Instagram At:{' '}
      <a href="https://www.instagram.com/preservenice/?hl=en">@preservenice</a>
    </Typography>
    <Typography paragraph variant="title">
      Like Us on Facebook: <a href="https://www.facebook.com/preservenice/">Facebook</a>
      {/**TODO add real link to facebook and email! */}
    </Typography>
    <Typography variant="title">
      Email us: <a href="ve18.pv@gmail.com">ve18.pv@gmail.com</a>
    </Typography>
  </Page>
);

Contact.propTypes = {
  classes: object.isRequired
};

export default withStyles(styles)(Contact);
