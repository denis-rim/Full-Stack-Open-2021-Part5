import React from 'react'

const Notification = ({ message }) => {
  if (message === null) {
    return null
  }

  const style = message.type === 'error' ? 'red' : 'green'

  return <div style={{ color: `${style}` }}>{message.text}</div>
}

export default Notification
