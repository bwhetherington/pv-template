import React from "react";
import Page from "./Page";

import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";

/**
 * A dummy home page.
 * @param props 
 */
// const Home = (props) => (
//     <Page selected="home">

//     </Page>
// );

const styles = (theme) => ({

});

const Home = (props) => (
    <Page selected="">
        <Typography variant="display3" align="center">
            PreserVenice
        </Typography>
        <Divider />
        Home page!
    </Page>
);

export default withStyles(styles)(Home);