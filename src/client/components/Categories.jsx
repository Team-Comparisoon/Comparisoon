import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../styles/categories.scss";
// import styled from 'styled-components';
// import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

// 2 buttons with Links on them
function Categories() {
  const [state, setState] = useState([]);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    fetch("/api/categories")
      .then((response) => {
        console.log("response ", response);
        return response.json();
      })
      .then((data) => {
        console.log("data", data);
        // for (let i = 0; i < data.length; i++) {
        //   console.log("data.name", data[i].name);
        //   console.log("data.id", data[i].id);
        // }
        setState(data);
        // console.log("state", state);
        // let {name , id} = state;
      })
      .catch((err) => {
        console.log("error", err);
        setHasError(true);
      });
  }, []);

  return (
    <div className="mainContainer">
      <h1>Categories!!!</h1>
      <div>
        {hasError ? (
          <div> Oh, no! There was an error.</div>
        ) : (
          state.map((category) => {
            return (
              <li className="category" key={category.id}>
                <Link
                  to={{
                    pathname: `/categories/${category.id}`,
                    state: { category },
                  }}
                >
                  {category.name}
                </Link>
              </li>
            );
          })
        )}
      </div>
      <button type="button">
        <Link to="/categories/new">Define new category</Link>
      </button>
      <button type="button">
        <Link to="/technologies/new">Define new technology</Link>
      </button>
    </div>
  );
}

export default Categories;

/*
const renderCategories = () => {
  return state.map((category) => {
    const { name, id } = category;

    return (
      <li className="category">
        <Link
          to={{
            pathname: `/categories/:category.${id}`,
            state: { category },
          }}
        />
        Hi, I'm an li and I work now, yay!!!
        {name}
      </li>
    );
  });
};

return (
  <div className="main-container">
    <h1>Categories</h1>
    <div className="categories">{renderCategories()}</div>
    <button>
      <Link to="/categories/new">Define new category</Link>
    </button>
    <button>
      <Link to="/technologies/new">Define new technology</Link>
    </button>
  </div>
);
*/
