import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
// import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
// , useHistory

// 2 buttons with Links on them
export default function NewCategory() {
  const [categoryName, setCategoryName] = useState("");
  const [fields, setFields] = useState(["pros", "cons"]);
  const inputCategoryRef = useRef(null);
  const inputFieldRef = useRef(null);

  // add another little component for the field to the bottom of container
  const handleNewField = (e) => {
    const fieldsArr = fields.push(inputFieldRef.current.value);
    setFields(fieldsArr);
  };

  const handleSaveCategory = (e) => {
    saveCategory().then(status => {
      // check if responding with status code 200?
      console.log('Status ', status);
    }).catch((err) => {
      // give user an error message on unsuccessful Post req
      console.log('Error ', err);
    })
  };

  // pass in data from the filled up form
  // data in format { name: ‘frontend library’, fields: [‘data flow’, etc.] }
  // category doesn't exist for the user
  // no duplicates in fields
  // async/ await??
  const saveCategory = (data) => {
    const response  = fetch('/api/categories', {
      method: 'POST',
      body: JSON.stringify(data)
    });
    return response.json();
  }

  return (
    <div className="newCategory">
      <h1>New Category Fill Up!!!</h1>
      <form className="" onClick={handleSaveCategory}>
        <input type="text" ref={inputCategoryRef} placeholder="Category Name"></input>
        <h4>Fields for the category:</h4>
        <div>
          <input type="text" ref={inputFieldRef} placeholder="Field Name"></input>
          <br></br>
          <button onClick={handleNewField}>+Add Field</button>
        </div>
        <button type="submit">Save</button>
      </form>
    </div>
  );
}

// instead of form submission have onClick for button with Link?
// <Link to="/categories">Save category</Link>

// component for field?
// function Field() {
//   return (
//     <div>

//     </div>
//   )
// }



// const history = useHistory();
// const goMain = () => history.push('categories');

// <button onClick={goMain} type='button'/></div>
// <Redirect to='/categories'>Save category</Redirect>
// <Link to="/categories">Save category</Link>
