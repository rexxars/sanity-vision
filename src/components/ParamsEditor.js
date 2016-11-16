import React, {PropTypes} from 'react'
import classNames from 'classnames'
import Textarea from 'react-textarea-autosize'
import isPlainObject from '../util/isPlainObject'
import tryParseParams from '../util/tryParseParams'

const ENTER_KEY = 13

class ParamsEditor extends React.PureComponent {
  constructor(props) {
    super(props)
    this.state = {valid: true}

    this.handleChange = this.handleChange.bind(this)
    this.handleKeyUp = this.handleKeyUp.bind(this)
  }

  handleKeyUp(evt) {
    if (evt.ctrlKey && evt.which === ENTER_KEY) {
      this.props.onExecute()
    }
  }

  handleChange(evt) {
    const value = tryParseParams(evt.target.value)
    this.setState({valid: isPlainObject(value)})
    this.props.onChange({parsed: value, raw: evt.target.value})
  }

  render() {
    return (
      <Textarea
        className={classNames('vision_params-editor', {invalid: !this.state.valid})}
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

ParamsEditor.propTypes = {
  onExecute: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  value: PropTypes.string
}

ParamsEditor.defaultProps = {
  value: '{\n  \n}'
}

export default ParamsEditor
