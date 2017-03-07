import React from 'react'
import SanityVision from './SanityVision'
import {route} from 'part:@sanity/base/router'

const icon = () => <div />

export default {
  router: route('/*'),
  name: 'vision',
  title: 'Vision',
  icon: icon,
  component: SanityVision
}
