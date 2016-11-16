import React from 'react'
import ReactDOM from 'react-dom'
import createClient from '@sanity/client'
import ErrorDialog from '../components/ErrorDialog'
import {getState, storeState} from '../util/localState'
import SanityVision from '../Vision'
import Header from './Header'

class SanityVisionDemo extends React.PureComponent {
  constructor() {
    super()

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
    const projectId = event.target.projectId.value
    const config = this.getClientConfig({projectId})
    storeState('projectId', projectId)

    this.setState({
      projectId,
      client: this.state.client
        ? this.state.client.config(config)
        : createClient(config)
    })
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
        <form action="#" onSubmit={this.handleProjectChange} className="pure-form">
          <Header projectId={this.state.projectId} />
        </form>

        <div className="vision">
          {this.state.client && (
            <SanityVision client={this.state.client} />
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

ReactDOM.render(
  <SanityVisionDemo />,
  document.getElementById('root')
)
