import React from 'react';
import Artifact from './Artifact';

class ArtifactDialogWrapper extends React.Component {
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
    const { Container, componentProps } = this.props;
    const { showArtifact, currentArtifact } = this.state;

    const artifactDialog = showArtifact ? (
      <Artifact open={showArtifact} onClose={this.onArtifactHide} artifact={currentArtifact} />
    ) : (
      <div />
    );

    return (
      <React.Fragment>
        {artifactDialog}
        <Container onArtifactClick={this.onArtifactClick} {...componentProps} />
      </React.Fragment>
    );
  }
}

const withArtifactDialog = component => props => (
  <ArtifactDialogWrapper Container={component} componentProps={props} />
);

export default withArtifactDialog;
