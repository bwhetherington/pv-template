import React from 'react';
import Navbar from './Navbar';

import { object, string } from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';

const styles = theme => ({
  root: {
    minHeight: '100%'
  },
  contentWide: {
    width: 'auto',
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
    fontFamily: 'Roboto',
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2
  },
  content: {
    // width: 'auto',
    // marginLeft: theme.spacing.unit * 3,
    // marginRight: theme.spacing.unit * 3,
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
    height: '100%',
    marginTop: theme.spacing.unit * 8,
    padding: theme.spacing.unit * 6
  }
});

const Page = ({ classes, children, selected, wide }) => {
  console.log(`wide = ${wide}`);
  return (
    <div className={classes.root}>
      <Navbar selected={selected} />
      <div className={wide ? classes.contentWide : classes.content}>{children}</div>
      <footer className={classes.footer}>
        <Typography variant="caption" align="right">
          Copyright © 2018 · PreserVenice · All Rights Reserved
        </Typography>
      </footer>
    </div>
  );
};

Page.propTypes = {
  classes: object.isRequired,
  selected: string
};

export default withStyles(styles)(Page);
