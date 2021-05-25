import React from 'react'

const Notification = ({ message }) => {
  if (message === null) {
    return null
  }

  const style = message.type === 'error' ? 'red' : 'green'
  const className = message.type === 'error' ? 'error' : 'succeed'

  return (
    <div className={className} style={{ color: `${style}` }}>
      {message.text}
    </div>
  )
}

export default Notification
