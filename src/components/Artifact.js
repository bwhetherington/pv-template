import React from 'react';
import Page from './Page';

import { withStyles } from '@material-ui/core/styles';
import { object, string } from 'proptypes';


const styles = _ => {};

/**
 * This component renders a page for the artifact with the specified artifact ID. 
 * @param {object} props
 */
const Artifact = ({ artifactId }) => <Page selected="artifacts">Artifact page for {artifactId}</Page>;

Artifact.propTypes = {
  classes: object.isRequired,
  artifactId: string.isRequired
};

export default withStyles(styles)(Artifact);
