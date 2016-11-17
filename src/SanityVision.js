import React from 'react'
import client from 'part:@sanity/base/client'
import Button from 'part:@sanity/components/buttons/default'
import Select from './sanity/Select'
import Vision from './Vision'

import visionGui from './css/visionGui.css'
import jsonInspector from './css/jsonInspector.css'

const components = {
  Button,
  Select
}

const styles = {
  visionGui,
  jsonInspector
}

// Used in Sanity project
function SanityVision() {
  return (
    <Vision
      styles={styles}
      components={components}
      client={client}
    />
  )
}

module.exports = SanityVision
