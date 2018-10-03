import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import ButtonBase from '@material-ui/core/ButtonBase';
import Typography from '@material-ui/core/Typography';

const buttonStyles = theme => ({
  button: {
    height: '100%',
    padding: theme.spacing.unit * 2,
    '&:hover': {
      backgroundColor: theme.palette.primary.dark
    }
  },
  buttonSelected: {
    height: '100%',
    padding: theme.spacing.unit * 2,
    backgroundColor: theme.palette.primary.dark,
    boxShadow: 'inset 0px -3px 0px 0px white'
  }
});

const NavButton = ({ classes, children, selected, ...props }) => (
  <ButtonBase className={selected ? classes.buttonSelected : classes.button} {...props}>
    <Typography color="inherit" variant="button">
      {children}
    </Typography>
  </ButtonBase>
);

NavButton.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(buttonStyles)(NavButton);
