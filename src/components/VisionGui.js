import React, {PropTypes} from 'react'
import queryString from 'query-string'
import {storeState, getState} from '../util/localState'
import tryParseParams from '../util/tryParseParams'
import DelayedSpinner from './DelayedSpinner'
import QueryEditor from './QueryEditor'
import ParamsEditor from './ParamsEditor'
import ResultList from './ResultList'
import NoResultsDialog from './NoResultsDialog'
import QueryErrorDialog from './QueryErrorDialog'

const sanityUrl = /\.api\.sanity\.io.*?(?:query|listen)\/(.*?)\?(.*)/

class VisionGui extends React.PureComponent {
  constructor() {
    super()

    const lastQuery = getState('lastQuery')
    const lastParams = getState('lastParams')
    this.state = {
      query: lastQuery,
      params: lastParams && tryParseParams(lastParams),
      rawParams: lastParams,
      queryInProgress: Boolean(lastQuery),
      editorHeight: 100
    }

    this.handleChangeDataset = this.handleChangeDataset.bind(this)
    this.handleQueryExecution = this.handleQueryExecution.bind(this)
    this.handleQueryChange = this.handleQueryChange.bind(this)
    this.handleParamsChange = this.handleParamsChange.bind(this)
    this.handleHeightChange = this.handleHeightChange.bind(this)
    this.handlePaste = this.handlePaste.bind(this)
  }

  componentDidMount() {
    const firstDataset = this.props.datasets[0] && this.props.datasets[0].name
    const dataset = getState('dataset', firstDataset)
    this.context.client.config({dataset})

    if (this.state.query) {
      this.handleQueryExecution()
    }

    window.document.addEventListener('paste', this.handlePaste)
  }

  handlePaste(evt) {
    const data = evt.clipboardData.getData('text/plain')
    const match = data.match(sanityUrl)
    if (!match) {
      return
    }

    const [, dataset, urlQuery] = match
    const qs = queryString.parse(urlQuery)
    let parts

    try {
      parts = this.parseApiQueryString(qs)
    } catch (err) {
      console.warn('Error while trying to parse API URL: ', err.message) // eslint-disable-line no-console
      return // Give up on error
    }

    if (this.context.client.config().dataset !== dataset) {
      this.handleChangeDataset({target: {value: dataset}})
    }

    evt.preventDefault()
    this.setState({
      query: parts.query,
      params: parts.params,
      rawParams: JSON.stringify(parts.params, null, 2)
    })
  }

  parseApiQueryString(qs) {
    const params = Object.keys(qs)
      .filter(key => key[0] === '$')
      .reduce((keep, key) => {
        keep[key.substr(1)] = JSON.parse(qs[key])
        return keep
      }, {})

    return {query: qs.query, params}
  }

  handleChangeDataset(evt) {
    const dataset = evt.target.value
    storeState('dataset', dataset)
    this.setState({dataset})
    this.context.client.config({dataset})
    this.handleQueryExecution()
  }

  handleQueryExecution() {
    const {query, params, rawParams} = this.state
    const paramsError = params instanceof Error && params
    storeState('lastQuery', query)
    storeState('lastParams', rawParams)

    this.setState({
      queryInProgress: !paramsError && Boolean(query),
      error: paramsError || undefined,
      results: null
    })

    if (!query || paramsError) {
      return
    }

    const queryInProgress = false
    this.context.client.fetch(query, params)
      .then(results => this.setState({results, query, queryInProgress, error: null}))
      .catch(error => this.setState({error, query, queryInProgress}))
  }

  handleQueryChange(data) {
    this.setState({query: data.query})
  }

  handleParamsChange(data) {
    this.setState({rawParams: data.raw, params: data.parsed})
  }

  handleHeightChange(newHeight) {
    if (this.state.editorHeight !== newHeight) {
      this.setState({editorHeight: Math.max(newHeight, 75)})
    }
  }

  render() {
    const {client, components} = this.context
    const {error, query, queryInProgress} = this.state
    const {Button, Select} = components
    const styles = this.context.styles.visionGui
    const results = !error && !queryInProgress && this.state.results
    const dataset = client.config().dataset
    const datasets = this.props.datasets.map(set => set.name)

    // Note that because of react-json-inspector, we need at least one
    // addressable, non-generated class name. Therefore;
    // leave `sanity-vision` untouched!
    return (
      <div className="sanity-vision">
        <form action="#" className="pure-form pure-form-aligned">
          <div className={styles.controls}>
            <div className="pure-control-group vision_dataset-select">
              <label className={styles.datasetSelectorLabel} htmlFor="dataset-select">Dataset</label>
              <Select
                id="dataset-select"
                className={styles.datasetSelector}
                value={this.state.dataset || client.config().dataset}
                values={datasets}
                onChange={this.handleChangeDataset}
              />

              <Button
                onClick={this.handleQueryExecution}
                className={styles.executeQueryButton || 'vision_execute-query-button'}
                loading={queryInProgress}
                kind="colored"
              >Run query</Button>
            </div>
          </div>

          <div className={styles.inputLabels || 'inputLabels'}>
            <h3 className={styles.inputLabelQuery || 'query'}>Query</h3>
            <h3 className={styles.inputLabelParams || 'params'}>Params</h3>
          </div>

          <QueryEditor
            className={styles.queryEditor}
            value={this.state.query}
            onExecute={this.handleQueryExecution}
            onChange={this.handleQueryChange}
            onHeightChange={this.handleHeightChange}
            style={{minHeight: this.state.editorHeight}}
          />

          <ParamsEditor
            className={styles.paramsEditor}
            classNameInvalid={styles.paramsEditorInvalid}
            value={this.state.rawParams}
            onExecute={this.handleQueryExecution}
            onChange={this.handleParamsChange}
            onHeightChange={this.handleHeightChange}
            style={{minHeight: this.state.editorHeight}}
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
  client: PropTypes.shape({fetch: PropTypes.func}).isRequired,
  styles: PropTypes.object,
  components: PropTypes.object,
}

export default VisionGui
