import React from 'react';
import Page from './Page';

import { withStyles } from '@material-ui/core/styles';
import { Paper, Typography } from '@material-ui/core';
import { object } from 'prop-types';
import Markdown from './Markdown';

import about from '../README.md';

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
      <Typography variant="title" align="center">
        About Us
      </Typography>
      <Typography>
        This project is intended to help SerenDPT successfully launch the PreserVenice startup by
        revamping the website and launching a social media campaign to establish a foundation for
        donations.
      </Typography>
    </Paper>
  </Page>
);

About.propTypes = {
  classes: object.isRequired
};

export default withStyles(styles)(About);
