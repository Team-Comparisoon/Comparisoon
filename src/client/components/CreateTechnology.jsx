import React, { Component, useState, useEffect } from "react";
import { Link } from "react-router-dom";
// import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

// 2 buttons with Links on them
export default function NewTechnology() {
  return (
    <div>
      <h1>New Technology Fill Up!!!</h1>
      <button>
        <Link to="/compare">Save</Link>
      </button>
    </div>
  );
}