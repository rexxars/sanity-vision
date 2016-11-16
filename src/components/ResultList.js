import React, {PropTypes} from 'react'
import {Value} from 'react-object'

class ResultList extends React.PureComponent {
  constructor(props) {
    super(props)

    this.state = {expanded: []}
  }

  handleToggleExpandRow(id) {
    const expanded = this.state.expanded
    const currentIndex = expanded.indexOf(id)
    if (currentIndex === -1) {
      expanded.push(id)
    } else {
      expanded.splice(currentIndex, 1)
    }
  }

  getExpandRowHandler(id) {
    return () => this.handleToggleExpandRow(id)
  }

  isExpanded(id) {
    return this.state.expanded.indexOf(id) !== -1
  }

  render() {
    const docs = this.props.documents
    if (!docs.length) {
      return (
        <div className="vision_no-results">
          <p>No results found for query:</p>
          <code>{this.props.query}</code>
        </div>
      )
    }

    return (
      <ul className="vision_result-list">
        {docs.map(doc => (
          <li key={doc._id}>
            <Value label={doc._id} value={doc} isExpanded />
          </li>
        ))}
      </ul>
    )
  }
}

ResultList.propTypes = {
  query: PropTypes.string.isRequired,
  documents: PropTypes.arrayOf(PropTypes.shape({
    _id: PropTypes.string.isRequired,
    _type: PropTypes.string.isRequired,
    _updatedAt: PropTypes.string.isRequired,
    _createdAt: PropTypes.string.isRequired
  }))
}

export default ResultList
