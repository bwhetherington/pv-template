import React from 'react';
import Page from './Page';
import Separator from './Separator';
import ArtifactCard from './ArtifactCard';
import withArtifactDialog from './withArtifactDialog';
import { Typography, Grid } from '@material-ui/core';
import { priorityArtifactsSample } from '../util';
import { object } from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
  cards: {
    padding: theme.spacing.unit * 3,
    flexWrap: 'nowrap',
    // Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
    transform: 'translateZ(0)',
    height: '100%'
  },
  card: {
    padding: theme.spacing.unit
  }
});

const Home = ({ classes, onArtifactClick }) => (
  <Page selected="home">
    <Typography variant="headline" align="center">
      PreserVenice
    </Typography>
    <Typography variant="subheading" align="center">
      Subtitle
    </Typography>
    <Separator />
    <Typography paragraph>
      PreserVenice is a non-profit organization devoted to the preservation and restoration of
      public art in Venice, Italy. Please help us preserve this inestimable collection by using our
      App to collect up-to-date information about the artifacts and to donate funds for their
      restoration.
    </Typography>
    <Typography variant="headline" align="center">
      Artifacts in Need
    </Typography>
    <Separator />
    <Typography paragraph>These artifacts are nearly at their funding goals.</Typography>
    <Grid container spacing={16} className={classes.cards}>
      {priorityArtifactsSample.map(artifact => (
        <Grid item key={artifact.name} xs={4}>
          <ArtifactCard
            artifact={artifact}
            className={classes.card}
            onClick={onArtifactClick(artifact)}
          />
        </Grid>
      ))}
    </Grid>
  </Page>
);

Home.propTypes = {
  classes: object.isRequired
};

export default withArtifactDialog(withStyles(styles)(Home));
