import React from "react";

// once logged in, redirect to Landing Page (view 2)
// implement anchor tag with proper endpoint for backend to pick up
export default function Login() {
  return (
    <div className="loginPage">
      <h1>***COMPARISOON***</h1>
      <a href="/login" className="githubBtn">
        Sign in to GITHUB
      </a>
    </div>
  );
}

// <h3>You need to log in first!</h3>