import React, { Component, useState, useEffect } from "react";
import { Link } from "react-router-dom";
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
                    setState(data.categories)})
                    .catch(err => setHasError(true))
    }, [])

  return (
    <div>
      <h1>Categories!!!</h1>
      <>
      { hasError? <div> Oh, no! There was an error.</div> 
        : ( state.map( (category) => {
             <li>
                    <Link to={{
                        pathname: '/categories/:categoryID',
                        state: {category.id}
                    }}/>
                    {category.name}
             </li>

        }))
      }
      </>
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