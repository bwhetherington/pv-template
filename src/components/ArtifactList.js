import React from 'react';
import Page from './Page';

import { object, string } from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

const styles = _ => {};

/**
 * This component renders the PreserVenice website's artifact table page.
 */
const ArtifactList = props => <Page selected="artifacts">Artifact listings</Page>;

ArtifactList.propTypes = {
  classes: object.isRequired
};

export default withStyles(styles)(ArtifactList);
