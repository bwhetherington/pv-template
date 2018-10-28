import React from 'react';
import Navbar from './Navbar';

import { object, string } from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';

const styles = theme => ({
  rootFullScreen: {
    height: '100%',
    maxWidth: '100%',
    overflowY: 'hidden'
  },
  root: {
    height: '100%',
    maxWidth: '100%'
  },
  fullScreen: {
    width: '100%',
    height: '100%',
    overflowY: 'hidden'
  },
  content: {
    maxWidth: 1000,
    paddingLeft: theme.spacing.unit * 3,
    paddingRight: theme.spacing.unit * 3,
    margin: 'auto',
    fontFamily: 'Roboto',
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2
  },
  appBar: {
    position: 'relative'
  },
  toolbarTitle: {
    flex: '1'
  },
  footer: {
    backgroundColor: theme.palette.background.paper,
    marginTop: theme.spacing.unit * 8,
    padding: theme.spacing.unit * 6
  }
});

const Page = ({ classes, children, selected, fullScreen = false }) => {
  if (fullScreen) {
    return (
      <div className={classes.rootFullScreen}>
        <Navbar selected={selected} position="sticky" />
        <div className={classes.fullScreen}>{children}</div>
      </div>
    );
  } else {
    return (
      <div className={classes.root}>
        <Navbar selected={selected} position="sticky" />
        <div className={classes.content}>{children}</div>
        <footer className={classes.footer}>
          <Typography variant="caption" align="right">
            Copyright © 2018 · PreserVenice · All Rights Reserved
          </Typography>
        </footer>
      </div>
    );
  }
};

Page.propTypes = {
  classes: object.isRequired,
  selected: string
};

export default withStyles(styles)(Page);
