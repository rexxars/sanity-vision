import React, {PropTypes} from 'react'

function Dropdown(props) {
  const {id, defaultValue, className, values, onChange} = props
  const defVal = defaultValue || values[0]
  return (
    <select id={id} className={className} defaultValue={defVal} onChange={onChange}>
      {values.map(val => <option key={val}>{val}</option>)}
    </select>
  )
}

Dropdown.propTypes = {
  id: PropTypes.string,
  onChange: PropTypes.func,
  className: PropTypes.string,
  values: PropTypes.arrayOf(PropTypes.string),
  defaultValue: PropTypes.string
}

Dropdown.defaultProps = {
  values: []
}

export default Dropdown
