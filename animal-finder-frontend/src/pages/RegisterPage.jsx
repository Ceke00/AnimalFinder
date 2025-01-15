import React, { useState } from "react";
import AuthService from "../services/auth.service";
import { useNavigate, Link } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

const RegisterPage = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    //resets error messages
    setErrors({});
    //if register ok - navigate to login page
    try {
      await AuthService.register(firstName, lastName, email, password);
      navigate("/login");
    } catch (error) {
      //if register not ok
      //any messages from backend?
      if (error.response?.data) {
        //if error messages exists - set errors (could have defiened field or not)
        if (error.response.data.errors) {
          const errorMessages = error.response.data.errors;
          const newErrors = {};
          for (const key in errorMessages) {
            if (key !== "$id") {
              newErrors[key] = errorMessages[key].join(" ");
            }
          }
          setErrors(newErrors);
        } else {
          // else set general message
          setErrors({
            //if array - join, else show Title or general message
            general: Array.isArray(error.response.data)
              ? error.response.data.join(" ")
              : error.response.data.title || "Registration failed.",
          });
        }
      }
    }
  };

  return (
    <div>
      <h1>Registration &ndash; Animal Finder</h1>
      <p>It's free to become a member. Just fill in this form!</p>
      <p>
        Already a member? Go to <Link to="/login">Login Page</Link>
      </p>
      <Form onSubmit={handleRegister}>
        <Form.Group className="mb-3" controlId="formFirstName">
          <Form.Label>First name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter first name"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
          {errors.FirstName && (
            <p className="text-danger">{errors.FirstName}</p>
          )}
        </Form.Group>
        <Form.Group className="mb-3" controlId="formLastName">
          <Form.Label>Last name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter last name"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
          {errors.LastName && <p className="text-danger">{errors.LastName}</p>}
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          {errors.Email && <p className="text-danger">{errors.Email}</p>}
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {errors.Password && <p className="text-danger">{errors.Password}</p>}
        </Form.Group>
        <Button variant="primary" type="submit">
          Register
        </Button>

        {/* if defined error message is not connected with any field */}
        {errors[""] && (
          <p className="text-danger">
            {Array.isArray(errors[""]) ? errors[""].join(" ") : errors[""]}
          </p>
        )}
        {/* if error is defiend as general*/}
        {errors.general && <p className="text-danger">{errors.general}</p>}
      </Form>
    </div>
  );
};

export default RegisterPage;
