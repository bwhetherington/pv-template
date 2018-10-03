import React from 'react';
import Page from './Page';

import { withStyles } from '@material-ui/core/styles';
import { object, string } from 'proptypes';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';

const styles = _ => ({});

/**
 * This component renders the PreserVenice website's home page.
 */
const Home = _ => (
  <Page selected="">
    <Typography variant="display3" align="center">
      PreserVenice
    </Typography>
    <Divider />
    Home page!
  </Page>
);

Home.propTypes = {
  classes: object.isRequired,
  selected: string
};

export default withStyles(styles)(Home);
