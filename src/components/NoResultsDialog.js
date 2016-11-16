import React, {PropTypes} from 'react'

function NoResultsDialog(props) {
  return (
    <div className="vision_no-results">
      <p>No documents found in dataset <code>{props.dataset}</code> that match query:</p>
      <code>{props.query}</code>
    </div>
  )
}

NoResultsDialog.propTypes = {
  query: PropTypes.string.isRequired,
  dataset: PropTypes.string.isRequired,
}

export default NoResultsDialog

