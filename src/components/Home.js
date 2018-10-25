import React from 'react';
import Page from './Page';
import Separator from './Separator';

import { withStyles } from '@material-ui/core/styles';
import { object, string } from 'prop-types';
import { Typography } from '@material-ui/core';

const styles = _ => ({});

/**
 * This component renders the PreserVenice website's home page.
 */
const Home = _ => (
  <Page selected="">
    <Typography paragraph variant="title" align="center">
      PreserVenice
    </Typography>
    <Typography variant="subheading" align="center">
      A Crowdfunding Solution to Preserving Venetian Heritage
    </Typography>
    <Separator />
    <Typography>Home page!</Typography>
  </Page>
);

Home.propTypes = {
  classes: object.isRequired,
  selected: string
};

export default withStyles(styles)(Home);
