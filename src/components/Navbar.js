import React from 'react';
import NavButton from './NavButton';

import { withStyles } from '@material-ui/core/styles';
import { object, string } from 'prop-types';
import { AppBar, Toolbar, Typography } from '@material-ui/core';

const styles = theme => ({
  appBar: {
    // position: 'relative',
    zIndex: theme.zIndex.drawer + 1
  },
  toolbarTitle: {
    flex: '1'
  }
});

/**
 * Creates a click handler that navigates to the specified URL.
 * @param {string} href The specified URL
 */
const onClick = href => () => {
  location.href = href;
};

const links = {
  home: {
    name: 'Home',
    handler: onClick('/home')
  },
  artifacts: {
    name: 'Artifacts',
    handler: onClick('/artifacts')
  },
  about: {
    name: 'About',
    handler: onClick('/about')
  },
  contact: {
    name: 'Contact',
    handler: onClick('/contact')
  }
};

/**
 * Renders the links specified in the links object as `NavButton`s.
 * @param {string} selected The currently selected page
 * @param {object} links An object mapping urls to page names
 */
const renderLinks = (selected, links) =>
  Object.keys(links).map(key => (
    <NavButton key={key} selected={key === selected} onClick={links[key].handler}>
      {links[key].name}
    </NavButton>
  ));

const Navbar = ({ classes, selected }) => (
  <AppBar position="sticky" className={classes.appBar}>
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
