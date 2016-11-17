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
    const {className, classNameInvalid} = this.props
    return (
      <Textarea
        className={classNames(className, {[classNameInvalid]: !this.state.valid})}
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

ParamsEditor.propTypes = {
  className: PropTypes.string,
  classNameInvalid: PropTypes.string,
  onExecute: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  onHeightChange: PropTypes.func,
  value: PropTypes.string,
  style: PropTypes.object // eslint-disable-line react/forbid-prop-types
}

ParamsEditor.defaultProps = {
  value: '{\n  \n}',
  className: 'vision_params-editor',
  classNameInvalid: 'vision_params-editor-invalid'
}

export default ParamsEditor
