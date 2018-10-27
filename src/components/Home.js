import React from 'react';
import Map from './Map';
import Page from './Page';
import Separator from './Separator';
import ArtifactCard from './ArtifactCard';

import { withStyles } from '@material-ui/core/styles';
import { object, string } from 'prop-types';
import {
  Divider,
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
import { take, createMap, sampleArtifacts, artifactTypes, priorityArtifactsSample } from '../util';

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
  map: {},
  mapControls: {
    padding: theme.spacing.unit
  },
  mapControlButton: {
    marginRight: theme.spacing.unit
  },
  filter: {
    width: '100%',
    height: '100%'
  },
  filterTitle: {
    padding: theme.spacing.unit,
    marginTop: theme.spacing.unit * 7
    // background: theme.palette.background.paper
  },
  filterButton: {
    width: '100%'
  },
  filterOptions: {
    maxHeight: '100%',
    overflowY: 'scroll'
    // background: theme.palette.background.default
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0
  },
  content: {
    marginLeft: drawerWidth,
    flexGrow: 1
  }
});

const artifacts = sampleArtifacts;

const drawerWidth = 240;

class Home extends React.Component {
  state = {
    filter: createMap(artifactTypes, _ => false),
    showFilters: false
  };

  /**
   * Shows the filter drawer.
   */
  showDrawer = () => {
    console.log('Showing drawer?');
    this.setState({
      ...this.state,
      showFilters: true
    });
  };

  /**
   * Hides the filter drawer.
   */
  hideDrawer = () => {
    this.setState({
      ...this.state,
      showFilters: false
    });
  };

  showAllArtifacts = () => {
    const filter = createMap(artifactTypes, _ => true);
    this.setState({
      ...this.state,
      filter
    });
  };

  hideAllArtifacts = () => {
    const filter = createMap(artifactTypes, _ => false);
    this.setState({
      ...this.state,
      filter
    });
  };

  /**
   * Produces a handler to toggle the specified artifact type on or off.
   * @param type the artifact type
   */
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

  /**
   * Produces a list containing the artifact types that have been selected to be filtered.
   */
  filteredTypes() {
    const { filter } = this.state;
    return Object.keys(filter).filter(key => filter[key]);
  }

  /**
   * Renders the component.
   */
  render() {
    const { classes } = this.props;
    const { showFilters } = this.state;

    // The drawer containing the filter options
    const filterDrawer = (
      <Drawer
        variant="permanent"
        open={showFilters}
        onClose={this.hideDrawer}
        className={classes.drawer}
      >
        <div className={classes.filterTitle}>
          <Typography paragraph variant="title" align="center">
            Artifacts
          </Typography>
          <Grid container spacing={16}>
            <Grid item xs={6}>
              <Button size="small" onClick={this.showAllArtifacts} className={classes.filterButton}>
                All
              </Button>
            </Grid>
            <Grid item xs={6}>
              <Button size="small" onClick={this.hideAllArtifacts} className={classes.filterButton}>
                None
              </Button>
            </Grid>
          </Grid>
        </div>
        <Divider />
        <List className={classes.filterOptions}>
          {artifactTypes.map(type => (
            <ListItem dense button key={type} onClick={this.toggleType(type)}>
              <Checkbox checked={this.state.filter[type]} disableRipple tabIndex={-1} />
              <ListItemText primary={type} />
            </ListItem>
          ))}
        </List>
      </Drawer>
    );

    return (
      <React.Fragment>
        <Page selected="">
          {filterDrawer}
          <div className={classes.content}>
            <Typography variant="headline" align="center">
              PreserVenice
            </Typography>
            <Typography variant="subheading" align="center">
              A Crowdfunding Solution to Preserving Venetian Heritage
            </Typography>
            <Separator />
            <Paper className={classes.map}>
              <Map artifactTypes={this.filteredTypes()} />
              <div className={classes.mapControls}>
                <Button
                  color="primary"
                  className={classes.mapControlButton}
                  onClick={this.showDrawer}
                >
                  Filters
                </Button>
                <Button color="primary" className={classes.mapControlButton}>
                  Options
                </Button>
              </div>
            </Paper>
            <br />
            <Typography variant="headline" align="center">
              Artifacts in Need
            </Typography>
            <Separator />
            <Grid container spacing={16} className={classes.cards}>
              {priorityArtifactsSample.map(artifact => (
                <Grid item key={artifact.name} xs={4}>
                  <ArtifactCard artifact={artifact} className={classes.card} />
                </Grid>
              ))}
            </Grid>
          </div>
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
