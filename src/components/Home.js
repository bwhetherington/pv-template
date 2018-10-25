import React from 'react';
import Page from './Page';

import { withStyles } from '@material-ui/core/styles';
import { object, string } from 'prop-types';
import { Divider, Typography } from '@material-ui/core';

const styles = _ => ({});

/**
 * This component renders the PreserVenice website's home page.
 */
const Home = _ => (
  <Page selected="">
    <Typography variant="title" align="center">
      PreserVenice
    </Typography>
    <Typography variant="subheading" align="center">
      A Crowdfunding Solution to Preserving Venetian Heritage
    </Typography>
    <Divider />
    <Typography>Home page!</Typography>
  </Page>
);

Home.propTypes = {
  classes: object.isRequired,
  selected: string
};

export default withStyles(styles)(Home);
