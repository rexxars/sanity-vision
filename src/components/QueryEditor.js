import React, {PropTypes} from 'react'
import Textarea from 'react-textarea-autosize'

const ENTER_KEY = 13

class QueryEditor extends React.PureComponent {
  constructor(props) {
    super(props)

    this.handleChange = this.handleChange.bind(this)
    this.handleKeyUp = this.handleKeyUp.bind(this)
  }

  handleKeyUp(evt) {
    if (evt.ctrlKey && evt.which === ENTER_KEY) {
      this.props.onExecute()
    }
  }

  handleChange(evt) {
    this.props.onChange({query: evt.target.value})
  }

  render() {
    return (
      <Textarea
        className="vision_query-editor"
        value={this.props.value}
        onChange={this.handleChange}
        onKeyUp={this.handleKeyUp}

        autoComplete="off"
        autoCorrect="off"
        autoCapitalize="off"
        spellCheck="false"
      />
    )
  }
}

QueryEditor.propTypes = {
  onExecute: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  value: PropTypes.string
}

export default QueryEditor
