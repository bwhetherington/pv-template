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
  DialogTitle,
  IconButton
} from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';

function styles(_) {
  return {
    description: {
      // minWidth: '600px'
    },
    close: {
      float: 'right'
    }
  };
}

/**
 * This component renders a page for the artifact with the specified artifact ID.
 * @param {object} props
 */
function Artifact(props) {
  const { fullScreen, open, onClose, artifact, classes } = props;
  const { namePretty } = artifact;
  return (
    <Dialog fullScreen={fullScreen} open={open} onClose={onClose}>
      <DialogTitle>
        {namePretty}
        <span className={classes.close}>
          <IconButton onClick={onClose}>
            <CloseIcon />
          </IconButton>
        </span>
      </DialogTitle>
      <DialogContent>
        <DialogContentText className={classes.description}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam et sodales arcu. Curabitur
          eleifend sagittis pretium. Suspendisse scelerisque arcu at arcu interdum, eget posuere
          justo ornare. Aliquam rhoncus aliquet placerat. Cras id eros lacus. Donec ultricies arcu
          nulla, quis mollis massa pharetra in. Etiam nec lectus sed ipsum mollis hendrerit sed in
          turpis. Sed laoreet, elit non mollis sagittis, metus velit gravida magna, ut tincidunt
          augue eros vitae ex. Quisque feugiat pretium ligula.
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button color="primary">Share</Button>
        <Button color="primary">Donate</Button>
      </DialogActions>
    </Dialog>
  );
}

Artifact.propTypes = {
  classes: object.isRequired,
  artifact: object.isRequired
};

export default withMobileDialog({ breakpoint: 'md' })(withStyles(styles)(Artifact));
