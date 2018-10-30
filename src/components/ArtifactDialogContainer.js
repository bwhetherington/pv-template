import React from 'react';
import Artifact from './Artifact';

class ArtifactDialogWrapper extends React.Class {
  state = {
    showArtifact: false,
    currentArtifact: null
  };

  onArtifactClick = artifact => () =>
    this.setState({
      ...this.state,
      showArtifact: true,
      currentArtifact: artifact
    });

  onArtifactHide = () =>
    this.setState({
      ...this.state,
      showArtifact: false,
      currentArtifact: null
    });

  render() {
    const { Container } = this.props;
    const { showArtifact, currentArtifact } = this.state;

    const artifactDialog = showArtifact ? (
      <Artifact open={showArtifact} onClose={this.hideArtifact} artifact={currentArtifact} />
    ) : (
      <div />
    );

    return (
      <React.Fragment>
        {artifactDialog}
        <Container onArtifactClick={this.onArtifactClick} />
      </React.Fragment>
    );
  }
}

export default ArtifactDialogWrapper;
