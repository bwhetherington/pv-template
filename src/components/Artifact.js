import React from "react";
import Page from "./Page";

/**
 * A dummy artifact page.
 * @param props
 */
const Artifact = props => {
  let artifactId = props.match.params.artifactId;
  return <Page selected="artifacts">Artifact page for {artifactId}</Page>;
};

export default Artifact;
