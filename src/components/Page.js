import React from 'react';
import Navbar from './Navbar';

import { object, string } from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
  content: {
    width: 'auto',
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
    fontFamily: 'Roboto',
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2
  },
  appBar: {
    position: 'relative'
  },
  toolbarTitle: {
    flex: '1'
  }
});

const Page = ({ classes, children, selected }) => (
  <React.Fragment>
    <Navbar selected={selected} />
    <div className={classes.content}>{children}</div>
  </React.Fragment>
);

Page.propTypes = {
  classes: object.isRequired,
  selected: string
};

export default withStyles(styles)(Page);
