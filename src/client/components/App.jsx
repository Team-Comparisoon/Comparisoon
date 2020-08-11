import React, { Component, useState, useEffect } from "react";
import { BrowserRouter as Router , 
          Switch, 
          Route, 
} from "react-router-dom";

import Categories from './Categories.jsx';
import CreateCategory from './CreateCategory.jsx';
import Technologies from './Technologies.jsx';
import Login from './Login.jsx';
import Compare from './Compare.jsx';

function App() {
  // "/login" - OAuth
  // "/categories/{categoryID}"
  // "/technologies/{technologyID}"
  // "/compare"
    return (
      <Router>
        <div>
        <Switch>
          <Route exact path="/login">
            <Login />
          </Route>
          <Route path="/categories" component = {Categories}>
            {/* <Categories /> */}
          </Route>
          <Route exact path="/categories/new">
            <CreateCategory />
          </Route>
          <Route exact path="/compare/:categoryID">
            <Compare />
          </Route>
          <Route exact path="/technologies">
            <Technologies />
          </Route>
        </Switch>
        </div>
      </Router>
    );
}

//Hooks don't work in classes
//useState - returns an array with 2 values.
//Use array destructuring
// 1. Current State (count).
// 2. Function (allow us to update our state).

// function App() {
//   const [count, setCount] = useState(4);

//   //Everytime we call setCount (update) function, it re-renders our component with a new value for our count.
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



export default App;