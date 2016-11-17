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
        className={this.props.className}
        value={this.props.value}
        style={this.props.style}
        onChange={this.handleChange}
        onKeyUp={this.handleKeyUp}
        onHeightChange={this.props.onHeightChange}

        autoComplete="off"
        autoCorrect="off"
        autoCapitalize="off"
        spellCheck="false"
      />
    )
  }
}

QueryEditor.propTypes = {
  className: PropTypes.string,
  onExecute: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  onHeightChange: PropTypes.func,
  value: PropTypes.string,
  style: PropTypes.object // eslint-disable-line react/forbid-prop-types
}

QueryEditor.defaultProps = {
  className: 'vision_query-editor'
}

export default QueryEditor
