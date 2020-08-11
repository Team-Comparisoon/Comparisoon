import React, { Component, useState, useEffect } from "react";
import { Link } from "react-router-dom";
// import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

// 2 buttons with Links on them
export default function ComparePage() {
  // const history = useHistory();
  // const goMain = () => history.push('categories');
  return (
    <div>
      <h1>Comparison of Technologies in the Category!!!</h1>
      <button>
        <Link to="/items/new">Create New Technology</Link>
      </button>
    </div>
  );
}