import React, { Component, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import '../styles/categories.scss';
import styled from 'styled-components';
// import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

// 2 buttons with Links on them
function Categories() {
    const [state, setState] = useState([]);
    const [hasError , setHasError] = useState(false);

    useEffect(() => {
        fetch('/api/categories')
            .then(response => response.json())
                .then(data => {
                  
                  console.log('data.name', data.name)
                  console.log('data.id' , data.id);
                  console.log('data: ' , data)
                    state = setState(data);
                  let {name , id} = state; 
                  })
                    .catch(err => setHasError(true))
    }, [state])

  return (
    <div className="mainContainer">
      <h1>Categories!!!</h1>
      <div>
      { hasError? <div> Oh, no! There was an error.</div> 
        :(state.map( (name , id) => {
          console.log('category' , category);
             <li className="category">
                    <Link to={{
                        pathname: `/categories/:category.${id}`,
                        state: {name}
                    }}/>
                    {category.name}
             </li>

        }))
      }
      </div>
      <button>
        <Link to="/categories/new">Define new category</Link>
      </button>
      <button>
        <Link to="/technologies/new">Define new technology</Link>
      </button>
    </div>
  );
}
export default Categories;