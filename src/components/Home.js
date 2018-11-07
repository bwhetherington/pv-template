import React from 'react';
import Page from './Page';
import Separator from './Separator';
import ArtifactCard from './ArtifactCard';
import withArtifactDialog from './withArtifactDialog';
import { Typography, Grid } from '@material-ui/core';
import { object, func } from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { createArtifact } from '../artifact';
import { asyncIterator } from 'lazy-iters';

function styles(theme) {
  return {
    cards: {
      padding: theme.spacing.unit * 3,
      flexWrap: 'nowrap',
      // Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
      transform: 'translateZ(0)',
      height: '100%'
    },
    card: {
      padding: theme.spacing.unit
    },
    scroll: {
      maxWidth: '100%',
      maxHeight: '100%'
    }
  };
}

async function* querySample() {
  try {
    const res = await fetch('http://pv-sample-server.herokuapp.com/sample');
    const data = await res.json();
    yield* data;
  } catch (ex) {
    console.log(ex);
  }
}

class Home extends React.Component {
  state = {
    artifactSample: []
  };

  componentDidMount() {
    this.loadArtifactSample();
  }

  async loadArtifactSample() {
    const sampleQuery = asyncIterator(querySample());
    const artifactSample = await sampleQuery
      .take(3)
      .map(createArtifact)
      .collect();

    this.setState({
      ...this.state,
      artifactSample
    });
  }

  render() {
    const { classes, onArtifactClick } = this.props;
    const { artifactSample } = this.state;
    return (
      <Page selected="home">
        <Typography variant="headline" align="center">
          PreserVenice
        </Typography>
        <Typography variant="subheading" align="center">
          A Crowdfunding Solution to Preserving Venetian Heritage
        </Typography>
        <Separator />
        {/* <img className={classes.scroll} src="/static/pv_scroll_25px_height.png" /> */}
        <Typography paragraph>
          PreserVenice is a non-profit organization devoted to the preservation and restoration of
          public art in Venice, Italy. Please help us preserve this precious collection of heritage
          by using our website to collect up-to-date information about the artifacts and to donate
          funds for their restoration.
        </Typography>
        <Typography variant="headline" align="center">
          Artifacts in Need
        </Typography>
        <Separator />
        <Typography paragraph>These artifacts are nearly at their funding goals.</Typography>
        <Grid container spacing={16} className={classes.cards}>
          {artifactSample.map(artifact => (
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
  }
}

Home.propTypes = {
  classes: object.isRequired,
  onArtifactClick: func.isRequired
};

export default withArtifactDialog(withStyles(styles)(Home));
