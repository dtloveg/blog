import { Link } from 'react-router-dom'
import React from 'react'

const LoginPage = () => {
  return (
    <div>
      <h1>Login </h1>

      <p>
        Or <Link to="/register">register</Link>
      </p>
    </div>
  )
}

export default LoginPage
