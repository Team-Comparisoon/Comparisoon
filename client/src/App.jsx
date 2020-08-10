import React, { Component, useState, useEffect } from "react";

class App extends Component {
  render() {
    return (
      <div>
        <h1>Hi</h1>
      </div>
    );
  }
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