import React, {PropTypes} from 'react'
import Vision from './Vision'

// Used in Sanity project
function SanityVision(props) {
  return <Vision client={props.client} />
}

SanityVision.propTypes = {
  client: PropTypes.func.isRequired
}

module.exports = SanityVision
