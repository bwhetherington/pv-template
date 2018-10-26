import React from 'react';

import { withStyles } from '@material-ui/core/styles';
import {
  Button,
  Card,
  Typography,
  CardActionArea,
  CardMedia,
  CardActions,
  CardContent,
  LinearProgress
} from '@material-ui/core';
import { object } from 'prop-types';

const styles = theme => ({
  card: {
    // maxWidth: 345
  },
  media: {
    objectFit: 'cover'
  },
  progress: {
    marginBottom: theme.spacing.unit
  }
});

const ArtifactCard = ({ artifact, classes }) => (
  <Card className={classes.card}>
    <CardActionArea href={`/artifacts/${artifact.name}`}>
      <CardMedia
        component="img"
        alt="Artifact"
        className={classes.media}
        height="140"
        image={artifact.coverImage}
        title={artifact.name}
      />
      <CardContent>
        <Typography gutterBottom variant="subheading" component="h2">
          {artifact.namePretty}
        </Typography>
        <Typography paragraph>This is a fancy description of the artifact, maybe?</Typography>
        <LinearProgress
          className={classes.progress}
          variant="determinate"
          value={(artifact.amountDonated / artifact.amountNeeded) * 100}
        />
        <Typography variant="caption" align="center">
          ${artifact.amountDonated} / ${artifact.amountNeeded}
        </Typography>
      </CardContent>
    </CardActionArea>
    <CardActions>
      <Button size="small" color="primary">
        Share
      </Button>
      <Button size="small" color="primary">
        Donate
      </Button>
    </CardActions>
  </Card>
);

ArtifactCard.propTypes = {
  classes: object.isRequired,
  artifact: object.isRequired
};

export default withStyles(styles)(ArtifactCard);
