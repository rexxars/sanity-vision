import React, {Component, PropTypes} from 'react'
import VisionContainer from './containers/VisionContainer'

// Used outside of Sanity projects
class Vision extends Component {
  getChildContext() {
    return {client: this.props.client}
  }

  render() {
    return <VisionContainer />
  }
}

Vision.propTypes = {
  client: PropTypes.shape({config: PropTypes.func}).isRequired
}

Vision.childContextTypes = {
  client: PropTypes.shape({config: PropTypes.func}).isRequired
}

module.exports = Vision
