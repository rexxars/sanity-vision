/* eslint-disable react/prop-types, react/no-multi-comp */
import React from 'react'
import tokenize from 'json-lexer'

const punctuator = token => <span style={{color: 'gray'}}>{token.raw}</span>
const number = token => <span style={{color: '#0086b3'}}>{token.raw}</span>
const string = token => <span style={{color: '#a54c9f'}}>{token.raw}</span>
const key = token => <span style={{color: '#183691'}}>{token.raw.slice(1, -1)}</span>
const formatters = {punctuator, key, string, number}

class JsonBlock extends React.PureComponent {
  render() {
    const json = JSON.stringify(this.props.data, null, 2)
    const tokens = tokenize(json).map((token, i, arr) => {
      const prevToken = i === 0 ? token : arr[i - 1]
      if (token.type === 'string' && prevToken.type === 'whitespace' && /^\n\s+$/.test(prevToken.value)) {
        token.type = 'key'
      }

      return token
    })

    return (
      <pre style={{borderBottom: '2px solid #0086b3', padding: '10px 0', margin: 0}}>
        {tokens.map((token, i) => {
          const Formatter = formatters[token.type]
          return Formatter
            ? <Formatter key={i} raw={token.raw} />
            : token.raw
        })}
      </pre>
    )
  }
}

export default function JsonDump(props) {
  if (!props.data) {
    return null
  }

  return (
    <code>
      {props.data.map(row =>
        <JsonBlock key={row._rev || row.eventId} data={row} />
      )}
    </code>
  )
}
