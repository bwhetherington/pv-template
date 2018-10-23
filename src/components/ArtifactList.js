import React from 'react';
import Page from './Page';

import { object } from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import {
  ButtonBase,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Typography
} from '@material-ui/core';

const artifacts = [
  {
    name: 'Artifact 1'
  },
  {
    name: 'Artifact 2'
  }
];

const styles = theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing.unit * 3,
    overflowX: 'auto'
  },
  table: {}
});

/**
 * This component renders the PreserVenice website's artifact table page.
 */
const ArtifactList = ({ classes }) => (
  <Page selected="artifacts">
    <Paper className={classes.root}>
      <Table className={classes.table}>
        <TableHead>
          <TableRow>
            <TableCell>Artifact</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {artifacts.map(({ name }) => (
            <TableRow key={name}>
              <TableCell onClick={event => console.log(`Clicked ${name}`)}>{name}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Paper>
  </Page>
);

ArtifactList.propTypes = {
  classes: object.isRequired
};

export default withStyles(styles)(ArtifactList);
