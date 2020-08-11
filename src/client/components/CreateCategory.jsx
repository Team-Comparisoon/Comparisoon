import React, { Component, useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
// import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

// 2 buttons with Links on them
export default function NewCategory() {
  const history = useHistory();
  const goMain = () => history.push('categories');
  return (
    <div>
      <h1>New Category Fill Up!!!</h1>
      <Link to="/categories">Save category</Link>
    </div>
  );
}

// <button onClick={goMain} type='button'/></div>
// <Redirect to='/categories'>Save category</Redirect>
// <Link to="/categories">Save category</Link>