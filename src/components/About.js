import React from 'react';
import Page from './Page';

import { withStyles } from '@material-ui/core/styles';
import { Paper, Typography } from '@material-ui/core';
import { object } from 'prop-types';

const styles = theme => ({
  root: {
    padding: theme.spacing.unit * 3
  }
});

/**
 * A dummy about page.
 */
const About = ({ classes }) => (
  <Page selected="about">
    <Paper className={classes.root}>
      <Typography variant="headline" align="center">
        About PreserVenice
      </Typography>
      <Typography paragraph>
        PreserVenice is a non-profit organization devoted to the preservation and restoration of
        public art in Venice, Italy. Please help us preserve this inestimable collection by using
        our App to collect up-to-date information about the artifacts and to donate funds for their
        restoration.
      </Typography>
      <Typography variant="title" align="left">
        Background
      </Typography>
      <Typography paragraph>
        The city of Venice, Italy contains a large and unique collection of artifacts that are
        displayed on public view, dating as far back as the year 700 AD. The collection includes
        reliefs, roundels, confraternity insignia, coats of arms, flagpole pedestals, inscriptions,
        wellheads, street altars, and a variety of other secular and religious symbols of Venice's
        material culture. These artifacts have been largely neglected by the numerous preservation
        efforts that have been undertaken since the historic flood of 1966. This vernacular
        heritage, which records the various stages of the thousand-year evolution of Venice's
        history from the perspective of the citizens of yesteryear, is being saved by today's
        citizens through a combination of high technology, social networks, and citizen engagement.
      </Typography>
    </Paper>
  </Page>
);

About.propTypes = {
  classes: object.isRequired
};

export default withStyles(styles)(About);
