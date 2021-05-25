import React, { useState } from 'react'
import PropTypes from 'prop-types'
import loginService from '../services/login'
import blogService from '../services/blogs'
import Notification from './Notification'

const Login = ({ setUser }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [errorMessage, setErrorMessage] = useState(null)

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({
        username,
        password,
      })

      window.localStorage.setItem('blogAppUser', JSON.stringify(user))

      blogService.setToken(user.token)

      setUser(user)
    } catch (error) {
      if (!error.response.data.errorMessage) {
        return setErrorMessage({
          text: 'Something went wrong. Please try again later.',
          type: 'error',
        })
      }
      setErrorMessage({
        text: error.response.data.errorMessage,
        type: 'error',
      })
    }
  }

  return (
    <div className="login">
      <div>
        <h3>Login to Blog App</h3>
        <Notification message={errorMessage} />
        <form onSubmit={handleLogin}>
          <div>
            username
            <input
              id="username"
              type="text"
              value={username}
              name="Username"
              onChange={({ target }) => setUsername(target.value)}
            />
          </div>
          <div>
            password
            <input
              id="password"
              type="password"
              value={password}
              name="Password"
              onChange={({ target }) => setPassword(target.value)}
            />
          </div>
          <button id="login-button" type="submit">
            login
          </button>
        </form>
      </div>
    </div>
  )
}

export default Login

Login.propTypes = {
  setUser: PropTypes.func.isRequired,
}
