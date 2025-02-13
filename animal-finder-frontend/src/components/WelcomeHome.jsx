import React from "react";
import { Link } from "react-router-dom";
import "./WelcomeHome.scss";

//Welcome message in header on home page with CTA
function WelcomeHome() {
  return (
    <header className="mb-5" id="header-home">
      <div className="header-box">
        <h1>Have you lost your pet?</h1>
        <p>
          Or have you seen a lost animal?
          <strong> Animal Finder</strong> helps lost animals to find their way
          home!{" "}
        </p>
        <p>
          {" "}
          <strong>It's free </strong>to become a member!
        </p>

        <Link to="/register" className="btn btn-primary">
          Register now
        </Link>
      </div>
    </header>
  );
}

export default WelcomeHome;
