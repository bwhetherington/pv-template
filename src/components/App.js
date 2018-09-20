import React from "react";
import { Switch, Route } from "react-router-dom";
import Page from "./Page";

/**
 * A dummy home page.
 * @param {*} props 
 */
const Home = (props) => (
    <Page>
        Home page
    </Page>
);

/**
 * A dummy artifacts page.
 * @param {*} props 
 */
const AllArtifacts = (props) => (
    <Page>
        Artifacts table
    </Page>
)

/**
 * A dummy artifact page.
 * @param {*} props 
 */
const Artifact = (props) => {
    let artifactId = props.match.params.artifactId;
    return (
        <Page>
            Artifact page for {artifactId}
        </Page>
    )
};

/**
 * A dummy artifacts router.
 * @param {*} props 
 */
const Artifacts = (props) => (
    <Switch>
        <Route exact path="/artifacts" component={AllArtifacts} />
        <Route path="/artifacts/:artifactId" component={Artifact} />
    </Switch>
);

/**
 * A dummy about page.
 * @param {*} props 
 */
const About = (props) => (
    <Page>
        About us
    </Page>
);

/**
 * A dummy contact page.
 * @param {*} props 
 */
const Contact = (props) => (
    <Page>
        Contact us
    </Page>
);

/**
 * A dummy 404 page.
 * @param {*} props 
 */
const NotFound = (props) => (
    <Page>
        The page you are looking for was not found.
    </Page>
);

export const App = (props) => (
    <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/about" component={About} />
        <Route exact path="/contact" component={Contact} />
        <Route path="/artifacts" component={Artifacts} />
        <Route path="*" component={NotFound} />
    </Switch>
);

export default App;