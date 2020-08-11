import React, { Component, useState, useEffect } from "react";
import { Link } from "react-router-dom";
// import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

// 2 buttons with Links on them
function Categories() {
  return (
    <div>
      <h1>Categories!!!</h1>
      <button>
        <Link to="/categories/new">Define new category</Link>
      </button>
      <button>
        <Link to="/items/new">Define new technology</Link>
      </button>
    </div>
  );
}

export default Categories;
