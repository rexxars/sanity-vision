import React from 'react'
import SanityVision from './SanityVision'
import {route} from 'part:@sanity/base/router'

export default {
  router: route('/*'),
  name: 'vision',
  title: 'Vision',
  icon: function VisionIcon() {
    return <div />
  },
  component: SanityVision
}
