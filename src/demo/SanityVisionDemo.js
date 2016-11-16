import React, {PropTypes} from 'react'
import createClient from '@sanity/client'
import ErrorDialog from '../components/ErrorDialog'
import {getState, storeState} from '../util/localState'
import SanityVision from '../Vision'
import Header from './Header'

class SanityVisionDemo extends React.PureComponent {
  constructor(props) {
    super(props)

    this.state = {projectId: getState('projectId')}
    this.handleProjectChange = this.handleProjectChange.bind(this)
  }

  getClientConfig(newConfig = {}) {
    return {
      projectId: newConfig.projectId || getState('projectId'),
      dataset: newConfig.dataset || getState('dataset')
    }
  }

  handleProjectChange(event) {
    event.preventDefault()
    const projectId = event.target.value
    const config = this.getClientConfig({projectId})
    const client = createClient(config)

    storeState('projectId', projectId)
    this.setState({projectId, client})
  }

  componentWillMount() {
    const {projectId} = this.state
    if (projectId) {
      this.setState({client: createClient(this.getClientConfig({projectId}))})
    }
  }

  render() {
    return (
      <div>
        <form action="#" className="pure-form">
          <Header
            projects={this.props.projects}
            selectedProjectId={this.state.projectId}
            onProjectChange={this.handleProjectChange}
          />
        </form>

        <div className="vision">
          {this.state.client && (
            // We're using key here to force a re-render on project ID change
            <SanityVision key={this.state.projectId} client={this.state.client} />
          )}

          {!this.state.projectId && (
            <ErrorDialog
              heading="No project ID"
              error="Please specify a project ID above"
            />
          )}
        </div>
      </div>
    )
  }
}

SanityVisionDemo.propTypes = {
  projects: PropTypes.arrayOf(PropTypes.shape({
    projectId: PropTypes.string.isRequired,
    displayName: PropTypes.string.isRequired
  }))
}

export default SanityVisionDemo
