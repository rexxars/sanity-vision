import React, {PropTypes} from 'react'

function QueryErrorDialog(props) {
  return (
    <div className="vision_query-error">
      <h2>Query error</h2>
      <pre><code>{props.error.message}</code></pre>
    </div>
  )
}

QueryErrorDialog.propTypes = {
  error: PropTypes.instanceOf(Error)
}

export default QueryErrorDialog

