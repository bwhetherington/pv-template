import React from 'react';
import Page from './Page';

import { withStyles } from '@material-ui/core/styles';
import { object, string } from 'prop-types';
import {
  Button,
  Dialog,
  DialogActions,
  withMobileDialog,
  DialogContentText,
  DialogContent,
  DialogTitle
} from '@material-ui/core';

const styles = _ => {};

/**
 * This component renders a page for the artifact with the specified artifact ID.
 * @param {object} props
 */
const Artifact = ({ fullScreen, open, onClose, artifact }) => {
  const { namePretty } = artifact;
  return (
    <Dialog fullScreen={fullScreen} open={open} onClose={onClose}>
      <DialogTitle>{namePretty}</DialogTitle>
      <DialogContent>
        <DialogContentText>Artifact data goes here</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button color="primary">Share</Button>
        <Button color="primary">Donate</Button>
      </DialogActions>
    </Dialog>
  );
};

Artifact.propTypes = {
  classes: object.isRequired,
  artifact: object.isRequired
};

export default withMobileDialog()(withStyles(styles)(Artifact));
