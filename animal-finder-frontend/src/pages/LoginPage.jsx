import React, { useState, useRef, useEffect } from "react";
import AuthService from "../services/auth.service";
import { useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { Link } from "react-router-dom";

const LoginPage = ({ setIsLoggedIn }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  // Add refs for form fields
  const emailRef = useRef(null);
  const passwordRef = useRef(null);

  // Function to handle focus management of ref
  const setFocusOnField = (ref) => {
    if (ref.current) {
      const input = ref.current.querySelector("input");
      if (input) {
        input.focus();
      }
    }
  };

  // Set focus on email field when error message appears
  useEffect(() => {
    if (message) {
      // Short timeout to ensure DOM has updated
      setTimeout(() => {
        setFocusOnField(emailRef);
      }, 100);
    }
  }, [message]);

  //Login function
  const handleLogin = async (e) => {
    e.preventDefault();

    // Clear any existing message
    setMessage("");

    try {
      const userData = await AuthService.login(email, password);
      setIsLoggedIn(true);
      console.log("Logged in user data:", userData);
      navigate("/memberpage");
    } catch (error) {
      console.error("Login error: ", error);
      setMessage("Login failed. Try again!");
    }
  };

  return (
    <div>
      <h1>Login &ndash; Animal Finder</h1>
      <Form onSubmit={handleLogin} noValidate>
        <Form.Group className="mb-3" controlId="formBasicEmail" ref={emailRef}>
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            aria-describedby={message ? "loginError" : undefined}
            aria-invalid={message ? "true" : "false"}
          />
        </Form.Group>
        <Form.Group
          className="mb-3"
          controlId="formBasicPassword"
          ref={passwordRef}
        >
          <Form.Label>Password</Form.Label>
          <Form.Control
            placeholder="Enter password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            aria-describedby={message ? "loginError" : undefined} //making connection with error message. Screenreaders read message when field is focused
            aria-invalid={message ? "true" : "false"} //indicate if field has errors
          />
        </Form.Group>
        <p>
          Not a member yet? <Link to="/register"> Register here!</Link>{" "}
        </p>

        <Button variant="primary" type="submit">
          Login
        </Button>
        {/* role=alert tells screenreader to read message */}
        {message && (
          <p id="loginError" className="text-danger mt-2" role="alert">
            {message}
          </p>
        )}
      </Form>
    </div>
  );
};

export default LoginPage;
