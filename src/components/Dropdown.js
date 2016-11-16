import React, {PropTypes} from 'react'

function Dropdown(props) {
  return (
    <select id={props.id} defaultValue={props.defaultValue || props.values[0]} onChange={props.onChange}>
      {props.values.map(val => <option key={val}>{val}</option>)}
    </select>
  )
}

Dropdown.propTypes = {
  id: PropTypes.string,
  onChange: PropTypes.func,
  values: PropTypes.arrayOf(PropTypes.string),
  defaultValue: PropTypes.string
}

Dropdown.defaultProps = {
  values: []
}

export default Dropdown
