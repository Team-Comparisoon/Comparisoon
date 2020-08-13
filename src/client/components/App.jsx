import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";

import Categories from "./Categories.jsx";
import CreateCategory from "./CreateCategory.jsx";
import CreateTechnology from "./CreateTechnology.jsx";
import Login from "./Login.jsx";
import Compare from "./Compare.jsx";

function App() {
  // "/login" - OAuth
  // "/categories/{categoryID}"
  // "/technologies/{technologyID}"
  // "/compare"

  console.log('COOKIES ', document.cookie);
  // const loggedIn = document.cookie
  //   .split(";")
  //   .some((item) => item.trim().startsWith("id="));
  // modify later!
  const loggedIn = true;
  // const loggedIn = false;
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          {loggedIn ? <Categories /> : <Redirect to="/login" />}
        </Route>
        <Route exact path="/login">
          <Login />
        </Route>
        <Route exact path="/categories">
          <Categories />
        </Route>
        <Route exact path="/categories/new">
          <CreateCategory />
        </Route>
        <Route exact path="/compare">
          <Compare />
        </Route>
        <Route exact path="/technologies/new">
          <CreateTechnology />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;

// { useState, useEffect }

// <Route exact path="/compare/:categoryID">
//   <Compare />
// </Route>

//Hooks don't work in classes
//useState - returns an array with 2 values.
//Use array destructuring
// 1. Current State (count).
// 2. Function (allow us to update our state).

// function App() {
//   const [count, setCount] = useState(4);

//   //Every time we call setCount (update) function, it re-renders our component with a new value for our count.
//   //If you're chaining setCount (update) function, use function version inside parameter.
//   function decrementCount() {
//     setCount(count - 1);
//   }

//   function incrementCount() {
//     setCount(count + 1);
//   }

//   return (
//     <div>
//       <button onClick={decrementCount}>-</button>
//       <span>{count}</span>
//       <button onClick={incrementCount}>+</button>
//     </div>
//   )
// }
