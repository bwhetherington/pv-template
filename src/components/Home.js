import React from 'react';
import Map from './Map';
import Page from './Page';
import Separator from './Separator';
import ArtifactCard from './ArtifactCard';

import { withStyles } from '@material-ui/core/styles';
import { object, string } from 'prop-types';
import {
  Drawer,
  Typography,
  Grid,
  Paper,
  Button,
  List,
  ListItem,
  ListItemText,
  Checkbox
} from '@material-ui/core';
import { getSampleArtifacts, take, map } from '../util';

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
    padding: theme.spacing.unit * 3,
    height: 480
  },
  filter: {
    width: '100%',
    height: '100%',
    padding: theme.spacing.unit
  },
  filterTitle: {
    padding: theme.spacing.unit
  },
  filterOptions: {
    maxHeight: '100%',
    overflowY: 'scroll'
  }
});

const artifacts = getSampleArtifacts();

const artifactTypes = [
  'Coats of Arms',
  'Crosses',
  'Decorations',
  'Flagstaff Pedestals',
  'Fountains',
  'Fragments',
  'Inscriptions',
  'Other',
  'Patere',
  'Reliefs',
  'Sculptures',
  'Street Altars',
  'Symbols'
];

class Home extends React.Component {
  state = {
    filter: map(artifactTypes, _ => false),
    showFilters: false
  };

  showDrawer = () => {
    console.log('Showing drawer?');
    this.setState({
      ...this.state,
      showFilters: true
    });
  };

  hideDrawer = () => {
    this.setState({
      ...this.state,
      showFilters: false
    });
  };

  toggleType(type) {
    return () => {
      const { filter } = this.state;
      const newFilter = {
        ...filter,
        [type]: !filter[type]
      };
      this.setState({
        ...this.state,
        filter: newFilter
      });
    };
  }

  filteredTypes() {
    const { filter } = this.state;
    return Object.keys(filter).filter(key => filter[key]);
  }

  render() {
    const { classes } = this.props;
    const { showFilters } = this.state;

    const drawer = (
      <Drawer open={showFilters} onClose={this.hideDrawer}>
        <Typography variant="title" align="center" className={classes.filterTitle}>
          Artifacts
        </Typography>
        <List className={classes.filterOptions}>
          {artifactTypes.map(type => (
            <ListItem button key={type} onClick={this.toggleType(type)}>
              <Checkbox checked={this.state.filter[type]} disableRipple tabIndex={-1} />
              <ListItemText primary={type} />
            </ListItem>
          ))}
        </List>
      </Drawer>
    );

    return (
      <React.Fragment>
        {drawer}
        <Page selected="">
          <Typography variant="headline" align="center">
            PreserVenice
          </Typography>
          <Typography variant="subheading" align="center">
            A Crowdfunding Solution to Preserving Venetian Heritage
          </Typography>
          <Separator />
          <Grid container spacing={16} className={classes.map}>
            <Grid item xs={9}>
              <Map artifactTypes={this.filteredTypes()} />
            </Grid>
            <Grid item xs={3}>
              <Paper className={classes.filter}>
                <Typography variant="subheading" align="center">
                  Controls
                </Typography>
                <Button onClick={this.showDrawer}>Filters</Button>
              </Paper>
            </Grid>
          </Grid>
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
      </React.Fragment>
    );
  }
}

Home.propTypes = {
  classes: object.isRequired,
  selected: string
};

export default withStyles(styles)(Home);
