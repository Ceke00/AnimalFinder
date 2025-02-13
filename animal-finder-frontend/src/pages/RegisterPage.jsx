import React, { useState, useRef, useEffect } from "react";
import AuthService from "../services/auth.service";
import { useNavigate, Link } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

//Page with form for user registration
const RegisterPage = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  // Add refs for form fields
  const firstNameRef = useRef(null);
  const lastNameRef = useRef(null);
  const emailRef = useRef(null);
  const passwordRef = useRef(null);

  // Function to handle both visual and keyboard focus
  const setFocusOnError = (ref) => {
    if (ref.current) {
      ref.current.scrollIntoView({ behavior: "smooth" });
      // Set focus on the input element
      const input = ref.current.querySelector("input");
      if (input) {
        input.focus();
      }
    }
  };

  useEffect(() => {
    if (Object.keys(errors).length > 0) {
      // Short timeout to ensure DOM has updated
      setTimeout(() => {
        if (errors.FirstName) {
          setFocusOnError(firstNameRef);
        } else if (errors.LastName) {
          setFocusOnError(lastNameRef);
        } else if (errors.Email) {
          setFocusOnError(emailRef);
        } else if (errors.Password) {
          setFocusOnError(passwordRef);
        }
      }, 100);
    }
  }, [errors]);

  const handleRegister = async (e) => {
    e.preventDefault();
    //resets error messages
    setErrors({});

    // Add validation for required fields
    if (!firstName || !lastName || !email || !password) {
      setErrors({
        FirstName: !firstName ? "First name is required" : "",
        LastName: !lastName ? "Last name is required" : "",
        Email: !email ? "Email is required" : "",
        Password: !password ? "Password is required" : "",
      });
      return;
    }

    //if register ok - navigate to login page
    try {
      await AuthService.register(firstName, lastName, email, password);
      navigate("/login");
    } catch (error) {
      //if register not ok
      //any messages from backend?
      if (error.response?.data) {
        //if error messages exists - set errors 
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
      <Form onSubmit={handleRegister} noValidate>
        <Form.Group
          className="mb-3"
          controlId="formFirstName"
          ref={firstNameRef}
        >
          <Form.Label>First name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter first name"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required
            aria-describedby="firstNameError"
            aria-invalid={errors.FirstName ? "true" : "false"}
          />
          {errors.FirstName && (
            <p id="firstNameError" className="text-danger" role="alert">
              {errors.FirstName}
            </p>
          )}
        </Form.Group>
        <Form.Group className="mb-3" controlId="formLastName" ref={lastNameRef}>
          <Form.Label>Last name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter last name"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            required
            aria-describedby="lastNameError"
            aria-invalid={errors.LastName ? "true" : "false"}
          />
          {errors.LastName && (
            <p id="lastNameError" className="text-danger" role="alert">
              {errors.LastName}
            </p>
          )}
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicEmail" ref={emailRef}>
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            aria-describedby="emailError"
            aria-invalid={errors.Email ? "true" : "false"}
          />
          {errors.Email && (
            <p id="emailError" className="text-danger" role="alert">
              {errors.Email}
            </p>
          )}
        </Form.Group>
        <Form.Group
          className="mb-3"
          controlId="formBasicPassword"
          ref={passwordRef}
        >
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            aria-describedby="passwordError"
            aria-invalid={errors.Password ? "true" : "false"}
          />
          {errors.Password && (
            <p id="passwordError" className="text-danger" role="alert">
              {errors.Password}
            </p>
          )}
        </Form.Group>
        <Button variant="primary" type="submit">
          Register
        </Button>

        {/* if defined error message is not connected with any field */}
        {errors[""] && (
          <p className="text-danger" role="alert">
            {Array.isArray(errors[""]) ? errors[""].join(" ") : errors[""]}
          </p>
        )}
        {/* if error is defiend as general*/}
        {errors.general && (
          <p className="text-danger" role="alert">
            {errors.general}
          </p>
        )}
      </Form>
    </div>
  );
};

export default RegisterPage;