import React from 'react'
import createClient from '@sanity/client'
import DelayedSpinner from '../components/DelayedSpinner'
import ErrorDialog from '../components/ErrorDialog'
import SanityVisionDemo from './SanityVisionDemo'

class DemoContainer extends React.PureComponent {
  constructor() {
    super()
    this.state = {}
  }

  componentDidMount() {
    const client = createClient({useProjectHostname: false})
    client.requestObservable({uri: '/projects'})
      .filter(event => event.type === 'response')
      .map(event => event.body)
      .subscribe({
        next: projects => this.setState({projects}),
        error: error => this.setState({error})
      })
  }

  render() {
    if (this.state.error) {
      return (
        <ErrorDialog
          heading="An error occured while loading projects"
          error={this.state.error}
        />
      )
    }

    if (!this.state.projects) {
      return <DelayedSpinner />
    }

    return <SanityVisionDemo projects={this.state.projects} />
  }
}

export default DemoContainer
