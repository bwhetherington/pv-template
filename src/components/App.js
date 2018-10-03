import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import About from './About';
import Artifact from './Artifact';
import ArtifactList from './ArtifactList';
import Contact from './Contact';
import Home from './Home';
import NotFound from './NotFound';

/**
 * A dummy artifacts router.
 * @param {*} props
 */
const Artifacts = _ => (
  <Switch>
    <Route exact path="/artifacts" component={ArtifactList} />
    <Route path="/artifacts/:artifactId" component={Artifact} />
  </Switch>
);

const App = _ => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/" component={Home} />
      <Route exact path="/about" component={About} />
      <Route exact path="/contact" component={Contact} />
      <Route path="/artifacts" component={Artifacts} />
      <Route path="*" component={NotFound} />
    </Switch>
  </BrowserRouter>
);

export default App;
