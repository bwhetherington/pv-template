import React from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import About from './About';
import Artifact from './Artifact';
import ArtifactList from './ArtifactList';
import Contact from './Contact';
import ArtifactsPage from './ArtifactsPage';
import Home from './Home';
import NotFound from './NotFound';

/**
 * This component wraps an Artifact component, extracting the artifact ID from the routing
 * information provided.
 * @param {object} props
 */
const ArtifactWrapper = props => <Artifact artifactId={props.match.params.artifactId} />;

/**
 * A dummy artifacts router.
 */
const Artifacts = _ => (
  <Switch>
    <Route exact path="/artifacts" component={ArtifactsPage} />
    <Route path="/artifacts/:artifactId" component={ArtifactWrapper} />
  </Switch>
);

const HomeRedirect = _ => <Redirect to="/home" />;

/**
 * This component handles routing to specific pages.
 */
const App = _ => (
  <Router>
    <Switch>
      <Route exact path="/" component={HomeRedirect} />
      <Route exact path="/home" component={Home} />
      <Route exact path="/about" component={About} />
      <Route exact path="/contact" component={Contact} />
      <Route path="/artifacts" component={Artifacts} />
      <Route path="*" component={NotFound} />
    </Switch>
  </Router>
);

export default App;
