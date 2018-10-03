import React from 'react';
import NavButton from './NavButton';

import { withStyles } from '@material-ui/core/styles';
import { object, string } from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

const styles = theme => ({
  appBar: {
    position: 'relative'
  },
  toolbarTitle: {
    flex: '1'
  }
});

const links = {
  '': 'Home',
  artifacts: 'Artifacts',
  about: 'About',
  contact: 'Contact'
};

const onClick = href => () => {
  location.href = href;
};

/**
 * Renders the links specified in the links object as `NavButton`s.
 * @param {string} selected The currently selected page
 * @param {object} links An object mapping urls to page names
 */
const renderLinks = (selected, links) =>
  Object.keys(links).map(key => (
    <NavButton key={key} selected={key === selected} onClick={onClick('/' + key)}>
      {links[key]}
    </NavButton>
  ));

const Navbar = ({ classes, selected }) => (
  <AppBar position="static" className={classes.appBar}>
    <Toolbar variant="dense">
      <Typography variant="title" color="inherit" noWrap className={classes.toolbarTitle}>
        PreserVenice
      </Typography>
      {renderLinks(selected, links)}
    </Toolbar>
  </AppBar>
);

Navbar.propTypes = {
  classes: object.isRequired,
  selected: string
};

export default withStyles(styles)(Navbar);
