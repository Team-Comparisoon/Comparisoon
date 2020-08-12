import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
// import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
// , useHistory

// 2 buttons with Links on them
export default function NewCategory() {
  // const [categoryName, setCategoryName] = useState("");
  // make frontend add pros and cons fields?
  const [fields, setFields] = useState(["pros", "cons"]);
  // increment on every addFiled button click
  const [count, setCount] = useState(1);
  const inputCategoryRef = useRef(null);
  // const inputFieldsRef = useRef(null);
  const inputFieldsRef = useRef([]);

  // useLayoutEffect(() => {
  //   effect
  //   return () => {
  //     cleanup
  //   };
  // }, [input]);

  // add another little component for the field to the bottom of container
  const handleNewField = (e) => {
    e.preventDefault();
    const fieldsArr = fields.push("");
    setFields(fieldsArr);
    // inputFieldsRef.current.value.push(e.target.value);
    // inputFieldsRef.current.value.push("");
    const newC = count + 1;
    setCount(newC);
    console.log("COUNT, FIELDS ", count, fields);
    // const fieldsArr = fields.push(inputFieldRef.current.value);
    // setFields(fieldsArr);
  };

  const handleSaveCategory = (e) => {
    // if (inputCategoryRef.current.value && inputFieldsRef.current.value) {
    if (inputCategoryRef.current.value && fields) {
      e.preventDefault();
      const data = {
        name: inputCategoryRef.current.value,
        fields: fields,
      };
      inputCategoryRef.current.value = "";
      setFields([]);
      const newC = 0;
      setCount(newC);
      console.log("DATA TO SAVE ", data);
      saveCategory(data)
        .then((status) => {
          // check if responding with status code 200?
          console.log("Status ", status);
        })
        .catch((err) => {
          // give user an error message on unsuccessful Post req
          console.log("Error ", err);
        });
    }
  };

  // pass in data from the filled up form
  // data in format { name: ‘frontend library’, fields: [‘data flow’, etc.] }
  // category doesn't exist for the user
  // no duplicates in fields
  // async/ await??
  const saveCategory = (data) => {
    console.log("DATA TO SAVE ", data);
    const response = fetch("/api/categories", {
      method: "POST",
      body: JSON.stringify(data),
    });
    console.log("RESPONSE ", response);
    // return response.json();
  };

  // const handleGoBackMainClick = () => {
  //   //
  // }

  console.log("CATEGORY ", inputCategoryRef);
  return (
    <div className="mainContainer newCategory">
      <div>
        <h1>Fill up information for the category:</h1>
      </div>
      <div className="inputArea">
        <form onClick={handleSaveCategory}>
          <input
            type="text"
            ref={inputCategoryRef}
            placeholder="Category Name"
          ></input>
          <h4>Fields you would want to compare:</h4>
          <div className="fieldsContainer">
            <Field key={count} ind={count} />
            <br></br>
            <button onClick={handleNewField}>Add Field</button>
          </div>
          <button type="submit">Save</button>
        </form>
      </div>
      <Link className="btn" to="/categories">
        Back to Categories
      </Link>
    </div>
  );
}

// {fields.forEach((f) => {
//   <Field key={count} ind={count} />
// })}
// onClick={handleGoBackMainClick}
// {fields.map((el) => (
//   <Field key={fields.indexOf(el)} fieldName={el} />
// ))}

// instead of form submission have onClick for button with Link?
// <Link to="/categories">Save category</Link>

// ref={inputFieldsRef}
// component for field?
function Field(props) {
  return (
    <div>
      <input type="text" placeholder={`Field-${props.ind} Name`}></input>
    </div>
  );
}

// ref={inputFieldRef}

// const history = useHistory();
// const goMain = () => history.push('categories');

// <button onClick={goMain} type='button'/></div>
// <Redirect to='/categories'>Save category</Redirect>
// <Link to="/categories">Save category</Link>
