import React from 'react';
import Map from './Map';
import Page from './Page';
import Separator from './Separator';
import ArtifactCard from './ArtifactCard';

import { withStyles } from '@material-ui/core/styles';
import { object, string } from 'prop-types';
import { Typography, Grid, GridList, GridListTile } from '@material-ui/core';
import { getSampleArtifacts, take } from '../util';

const styles = theme => ({
  cards: {
    padding: theme.spacing.unit * 3,
    // flexWrap: 'nowrap',
    // Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
    // transform: 'translateZ(0)'
    height: '100%'
  },
  card: {
    padding: theme.spacing.unit
  },
  map: {
    padding: theme.spacing.unit * 3
  }
});

const artifacts = getSampleArtifacts();

/**
 * This component renders the PreserVenice website's home page.
 */
const Home = ({ classes }) => (
  <Page selected="">
    <Typography variant="headline" align="center">
      PreserVenice
    </Typography>
    <Typography variant="subheading" align="center">
      A Crowdfunding Solution to Preserving Venetian Heritage
    </Typography>
    <Separator />
    <div className={classes.map}>
      <Map />
    </div>
    <Typography variant="headline" align="center">
      Artifacts in Need
    </Typography>
    <Separator />
    <Grid container spacing={16} className={classes.cards}>
      {take(3, artifacts).map(artifact => (
        <Grid item key={artifact.name} xs={4}>
          <ArtifactCard artifact={artifact} className={classes.card} />
        </Grid>
      ))}
    </Grid>
  </Page>
);

Home.propTypes = {
  classes: object.isRequired,
  selected: string
};

export default withStyles(styles)(Home);
