import React, {PropTypes} from 'react'
import classNames from 'classnames'
import {storeState, getState} from '../util/localState'
import DelayedSpinner from './DelayedSpinner'
import QueryEditor from './QueryEditor'
import Dropdown from './Dropdown'
import ResultList from './ResultList'
import NoResultsDialog from './NoResultsDialog'
import QueryErrorDialog from './QueryErrorDialog'

class VisionGui extends React.PureComponent {
  constructor() {
    super()

    const lastQuery = getState('lastQuery')
    this.state = {
      query: lastQuery,
      queryInProgress: Boolean(lastQuery)
    }

    this.handleChangeDataset = this.handleChangeDataset.bind(this)
    this.handleQueryExecution = this.handleQueryExecution.bind(this)
    this.handleQueryChange = this.handleQueryChange.bind(this)
  }

  componentDidMount() {
    if (this.state.query) {
      this.handleQueryExecution()
    }
  }

  handleChangeDataset(evt) {
    const dataset = evt.target.value
    storeState('dataset', dataset)
    this.context.client.config({dataset})
    this.handleQueryExecution()
  }

  handleQueryExecution() {
    const query = this.state.query
    storeState('lastQuery', query)
    this.setState({queryInProgress: Boolean(query), results: null})
    if (!query) {
      return
    }

    const queryInProgress = false
    this.context.client.fetch(query)
      .then(results => this.setState({results, query, queryInProgress, error: null}))
      .catch(error => this.setState({error, query, queryInProgress}))
  }

  handleQueryChange(data) {
    this.setState({query: data.query})
  }

  render() {
    const {client} = this.context
    const {error, query, queryInProgress} = this.state
    const results = !error && !queryInProgress && this.state.results
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
                className={classNames(
                  'pure-button',
                  'pure-button-primary',
                  'vision_execute-query-button',
                  {active: queryInProgress}
                )}
              >Run query</button>
            </div>
          </fieldset>

          <QueryEditor
            value={this.state.query}
            onExecute={this.handleQueryExecution}
            onChange={this.handleQueryChange}
          />
        </form>

        {queryInProgress && <DelayedSpinner />}
        {error && <QueryErrorDialog error={error} />}
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
