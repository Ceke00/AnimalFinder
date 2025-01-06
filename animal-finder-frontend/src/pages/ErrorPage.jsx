import React from 'react'
import { Link } from 'react-router-dom';

function ErrorPage() {
  return (
    <div>
      <h1>Oops! </h1>
      <p>This page does not exist!</p>
      <p>Back to <Link to="/"> Home page.</Link></p>
    </div>
  );
}

export default ErrorPage
