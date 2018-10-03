import React from "react";
import NavButton from "./NavButton";

import { withStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";

const styles = theme => ({
  appBar: {
    position: "relative"
  },
  toolbarTitle: {
    flex: "1"
  }
});

const links = {
  "": "Home",
  artifacts: "Artifacts",
  about: "About",
  contact: "Contact"
};

const onClick = href => () => {
  location.href = href;
};

const renderLinks = (selected, links) =>
  Object.keys(links).map(key => {
    if (key === selected) {
      return (
        <NavButton key={key} selected onClick={onClick(`/${key}`)}>
          {links[key]}
        </NavButton>
      );
    } else {
      return (
        <NavButton key={key} onClick={onClick(`/${key}`)}>
          {links[key]}
        </NavButton>
      );
    }
  });

const Navbar = ({ classes, selected }) => (
  <AppBar position="static" className={classes.appBar}>
    <Toolbar variant="dense">
      <Typography
        variant="title"
        color="inherit"
        noWrap
        className={classes.toolbarTitle}
      >
        PreserVenice
      </Typography>
      {renderLinks(selected, links)}
    </Toolbar>
  </AppBar>
);

Navbar.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Navbar);
