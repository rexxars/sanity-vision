import React, {PropTypes} from 'react'
import {storeState, getState} from '../util/localState'
import QueryEditor from './QueryEditor'
import Dropdown from './Dropdown'
import ResultList from './ResultList'
import NoResultsDialog from './NoResultsDialog'

class VisionGui extends React.PureComponent {
  constructor() {
    super()

    this.state = {query: getState('lastQuery')}

    this.handleChangeDataset = this.handleChangeDataset.bind(this)
    this.handleQueryExecution = this.handleQueryExecution.bind(this)
    this.handleQueryChange = this.handleQueryChange.bind(this)
  }

  componentDidMount() {
    if (this.state.query) {
      this.handleQueryExecution(this.state.query)
    }
  }

  handleChangeDataset(evt) {
    const dataset = evt.target.value
    storeState('dataset', dataset)
    this.context.client.config({dataset})
    this.handleQueryExecution(this.state.query)
  }

  handleQueryExecution(query) {
    storeState('lastQuery', query)
    this.context.client.fetch(query)
      .then(results => this.setState({results, query}))
      .catch(error => this.setState({error, query}))
  }

  handleQueryChange(data) {
    this.setState({query: data.query})
  }

  render() {
    const {client} = this.context
    const {results, query} = this.state
    const dataset = client.config().dataset
    const datasets = this.props.datasets.map(set => set.name)
    return (
      <div className="vision-gui">
        <form action="#" className="pure-form pure-form-aligned">
          <fieldset>
            <div className="pure-control-group vision_dataset-select">
              <label htmlFor="dataset-select">Dataset</label>
              <Dropdown
                id="dataset-select"
                defaultValue={client.config().dataset}
                values={datasets}
                onChange={this.handleChangeDataset}
              />

              <button
                onClick={this.handleQueryExecution}
                className="pure-button pure-button-primary vision_execute-query-button"
              >Run query</button>
            </div>
          </fieldset>

          <QueryEditor
            value={this.state.query}
            onExecute={this.handleQueryExecution}
            onChange={this.handleQueryChange}
          />
        </form>

        {results && results.length > 0 && <ResultList documents={results} query={query} />}
        {results && results.length === 0 && <NoResultsDialog query={query} dataset={dataset} />}
      </div>
    )
  }
}

VisionGui.propTypes = {
  datasets: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string
  }))
}

VisionGui.contextTypes = {
  client: PropTypes.shape({fetch: PropTypes.func}).isRequired
}

export default VisionGui
