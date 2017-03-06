import SanityVision from './SanityVision'
import {route} from 'part:@sanity/base/router'

export default {
  router: route('/*'),
  name: 'vision',
  title: 'Vision',
  component: SanityVision
}
