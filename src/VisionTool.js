import React from 'react'
import SanityVision from './SanityVision'
import {createRoute} from 'part:@sanity/base/router'

export default {
  router: createRoute('/*'),
  name: 'Vision',
  icon: function VisionIcon() {
    return <div />
  },
  component: SanityVision
}
