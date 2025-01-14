import React from 'react'
import { Link } from 'react-router-dom'

function LoggedOutPage() {
  return (
    <div>
      <h1>You have been logged out</h1>
      <p>To log in again<Link to="/login"> go to Login Page.</Link></p>
      <p>Back <Link to="/">to Home Page</Link></p>
    </div>
  )
}

export default LoggedOutPage
