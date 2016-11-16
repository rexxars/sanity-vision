import React, {PropTypes} from 'react'
import Vision from './Vision'

// Used outside of Sanity projects
function InsanityVision(props) {
  return <Vision client={props.client} />
}

InsanityVision.propTypes = {
  client: PropTypes.func.isRequired
}

module.exports = InsanityVision
