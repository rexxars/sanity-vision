import React, {PropTypes} from 'react'

export default function Header({projectId}) {
  return (
    <div className="header">
      <div className="home-menu pure-menu pure-menu-horizontal">
        <a className="pure-menu-heading" href="">SanityVision</a>

        <ul className="pure-menu-list">
          <li className="pure-menu-item pure-menu-selected">
            <input
              type="text"
              name="projectId"
              placeholder="Project ID"
              defaultValue={projectId}
              required
            />

            <button type="submit" className="pure-button pure-button-primary">
              Save
            </button>
          </li>
        </ul>
      </div>
    </div>
  )
}

Header.propTypes = {
  projectId: PropTypes.string
}
