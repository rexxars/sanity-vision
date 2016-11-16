import React from 'react'

export default function JsonDump(props) {
  return <code><pre>{JSON.stringify(props, null, 2)}</pre></code>
}
