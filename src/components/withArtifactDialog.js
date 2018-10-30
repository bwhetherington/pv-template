import React from 'react';
import Artifact from './Artifact';

class ArtifactDialogWrapper extends React.Component {
  state = {
    showArtifact: false,
    currentArtifact: null
  };

  /**
   * Produces a click handler that causes the wrapper to display the specified artifact when
   * activated.
   * @param {object} artifact the artifact to display
   */
  onArtifactClick = artifact => () =>
    this.setState({
      ...this.state,
      showArtifact: true,
      currentArtifact: artifact
    });

  /**
   * Hides the currently displayed artifact.
   */
  hideArtifact = () =>
    this.setState({
      ...this.state,
      showArtifact: false,
      currentArtifact: null
    });

  /**
   * Renders the artifact dialog if it is open, and the child component. All props are passed to
   * the child component.
   */
  render() {
    const { Container, componentProps } = this.props;
    const { showArtifact, currentArtifact } = this.state;

    const artifactDialog = showArtifact ? (
      <Artifact open={showArtifact} onClose={this.hideArtifact} artifact={currentArtifact} />
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

/**
 * Produces a new component that is equal to the specified component wrapped with a component that
 * displays an artifact dialog when the child's `onArtifactClick` handler is called.
 * @param component the component to wrap
 */
const withArtifactDialog = component => props => (
  <ArtifactDialogWrapper Container={component} componentProps={props} />
);

export default withArtifactDialog;
