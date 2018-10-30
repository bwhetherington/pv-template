import React from 'react';
import Map from './Map';
import Page from './Page';
import Artifact from './Artifact';
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
    overflowY: 'scroll'
    // background: theme.palette.background.default
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0
  },
  content: {
    marginLeft: drawerWidth,
    height: '100%',
    background: 'black',
    overflowY: 'hidden'
  }
});

const drawerWidth = 240;

class ArtifactPage extends React.Component {
  state = {
    filter: createMap(artifactTypes, _ => false),
    showFilters: false,
    showArtifact: false,
    currentArtifact: null
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

  hideArtifact = () => {
    this.setState({
      ...this.state,
      showArtifact: false,
      currentArtifact: null
    });
  };

  onArtifactClick = artifact => () => {
    this.setState({
      ...this.state,
      showArtifact: true,
      currentArtifact: artifact
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
    const { showFilters, showArtifact, currentArtifact } = this.state;

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

    const artifactDialog = showArtifact ? (
      <Artifact open={showArtifact} onClose={this.hideArtifact} artifact={currentArtifact} />
    ) : (
      <div />
    );

    return (
      <Page selected="artifacts" fullScreen={true}>
        {filterDrawer}
        {artifactDialog}
        <div className={classes.content}>
          <Map artifactTypes={this.filteredTypes()} onArtifactClick={this.onArtifactClick} />
        </div>
      </Page>
    );
  }
}

ArtifactPage.propTypes = {
  classes: object.isRequired,
  selected: string
};

export default withStyles(styles)(ArtifactPage);
