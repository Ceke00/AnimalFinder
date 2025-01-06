import React, { useState } from "react";
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

  //If login ok navigate to memberpage, else show error message
  const handleLogin = async (e) => {
    e.preventDefault();
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
    <Form onSubmit={handleLogin}>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Email</Form.Label>
        <Form.Control
          type="email"
          placeholder="Enter email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control
          placeholder="Enter password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </Form.Group>
      <p>
        Not a member yet? <Link to="/register"> Register here!</Link>{" "}
      </p>

      <Button variant="primary" type="submit">
        Login
      </Button>
      {message && <p className="text-danger mt-2">{message}</p>}
    </Form>
  );
};

export default LoginPage;
