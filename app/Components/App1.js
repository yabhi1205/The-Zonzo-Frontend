"use client"

import React, { useState } from "react";
import "./CSS/App.css";

// A custom hook to handle form inputs
function useFormInput(initialValue) {
  const [value, setValue] = useState(initialValue);

  function handleChange(e) {
    setValue(e.target.value);
  }

  return {
    value,
    onChange: handleChange,
  };
}

// A custom hook to handle form validation
function useFormValidation(inputs) {
  const [errors, setErrors] = useState({});

  function validate() {
    let valid = true;
    let newErrors = {};

    // Check for valid name
    if (!inputs.firstName.value.trim()) {
      newErrors.firstName = "First name is required";
      valid = false;
    }
    if (!inputs.lastName.value.trim()) {
      newErrors.lastName = "Last name is required";
      valid = false;
    }

    // Check for valid email
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    if (!inputs.email.value.trim()) {
      newErrors.email = "Email is required";
      valid = false;
    } else if (!emailRegex.test(inputs.email.value)) {
      newErrors.email = "Email is invalid";
      valid = false;
    }

    // Check for valid password
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\da-zA-Z]).{8,63}$/;
    if (!inputs.password.value) {
      newErrors.password = "Password is required";
      valid = false;
    } else if (!passwordRegex.test(inputs.password.value)) {
      newErrors.password =
        "Password must have at least one uppercase letter, one lowercase letter, one symbol, one number and be between 8 and 63 characters long";
      valid = false;
    }

    // Check for password match
    if (!inputs.repeatPassword.value) {
      newErrors.repeatPassword = "Repeat password is required";
      valid = false;
    } else if (inputs.password.value !== inputs.repeatPassword.value) {
      newErrors.repeatPassword = "Passwords do not match";
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  }

  return {
    errors,
    validate,
  };
}

function App() {
  // State for the active tab
  const [activeTab, setActiveTab] = useState("signup");

  // Form inputs
  const firstName = useFormInput("");
  const lastName = useFormInput("");
  const email = useFormInput("");
  const password = useFormInput("");
  const repeatPassword = useFormInput("");

  // Form validation
  const { errors, validate } = useFormValidation({
    firstName,
    lastName,
    email,
    password,
    repeatPassword,
  });

  // Form submission handler
  function handleSubmit(e) {
    e.preventDefault();
    if (validate()) {
      // Submit the form data
      console.log({
        firstName: firstName.value,
        lastName: lastName.value,
        email: email.value,
        password: password.value,
      });
      // Clear the form inputs
      firstName.setValue("");
      lastName.setValue("");
      email.setValue("");
      password.setValue("");
      repeatPassword.setValue("");
    }
  }

  return (
    <div className="App">
      <div className="card">
        <div className="tabs">
          <button
            className={`tab ${activeTab === "login" ? "active" : ""}`}
            onClick={() => setActiveTab("login")}
          >
            Login
          </button>
          <button
            className={`tab ${activeTab === "signup" ? "active" : ""}`}
            onClick={() => setActiveTab("signup")}
          >
            Signup
          </button>
        </div>
        <div className="form">
          <form onSubmit={handleSubmit}>
            {activeTab === "signup" && (
              <>
                <div className="input-group">
                  <label
                    htmlFor="firstName"
                    className={firstName.value ? "active" : ""}
                  >
                    First Name
                  </label>
                  <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    {...firstName}
                  />
                  {errors.firstName && (
                    <span className="error">{errors.firstName}</span>
                  )}
                </div>
                <div className="input-group">
                  <label
                    htmlFor="lastName"
                    className={lastName.value ? "active" : ""}
                  >
                    Last Name
                  </label>
                  <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    {...lastName}
                  />
                  {errors.lastName && (
                    <span className="error">{errors.lastName}</span>
                  )}
                </div>
              </>
            )}
            <div className="input-group">
              <label htmlFor="email" className={email.value ? "active" : ""}>
                Email
              </label>
              <input type="email" id="email" name="email" {...email} />
              {errors.email && <span className="error">{errors.email}</span>}
            </div>
            <div className="input-group">
              <label
                htmlFor="password"
                className={password.value ? "active" : ""}
              >
                Password
              </label>
              <input type="password" id="password" name="password" {...password} />
              {errors.password && (
                <span className="error">{errors.password}</span>
              )}
            </div>
            {activeTab === "signup" && (
              <div className="input-group">
                <label
                  htmlFor="repeatPassword"
                  className={repeatPassword.value ? "active" : ""}
                >
                  Repeat Password
                </label>
                <input
                  type="password"
                  id="repeatPassword"
                  name="repeatPassword"
                  {...repeatPassword}
                />
                {errors.repeatPassword && (
                  <span className="error">{errors.repeatPassword}</span>
                )}
              </div>
            )}
            <div className="input-group">
              <input type="submit" value={activeTab === "login" ? "Login" : "Signup"} />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default App;
