import React, { Component, useState, useEffect } from "react";
import { Link } from "react-router-dom";
// import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

// 2 buttons with Links on them
export default function NewTechnology(props) {

  const [pros, prosChange] = useState("");
  // const [cons, setCons] = useState("");

  const handleProsChange = (e) => {
    const { value } = e.target;
    // console.log("name: ", name);
    console.log("value: ", value);
    // prosChange(value); //pros state will now update to value.
  }

  const handleSubmit = (event) => {
    event.preventDefault();
  }
  
  return (
    <div>
      <h1>New Technology Fill Up!!!</h1>
      <form>
        <label>
          Pros: 
          <textarea 
            type="text"
            name="pros"
            onChange={e => handleProsChange(e)}
          />
        </label>
      </form>
  
      <button>
        <Link to="/compare">Save</Link> 
      </button>

      {/*Just to test how the item data would look.*/}
      {/* <div style={{ marginTop: 20 }}>{JSON.stringify(inputList)}</div> */}

    </div>
  );

  const [inputList, setInputList] = useState([{ firstName: "", lastName: "" }]);
 
  // handle input change
  const handleInputChange = (e, index) => {
    console.log("E target: ", e.target);
    const { name, value } = e.target;
    console.log("name: ", name );
    console.log("value: ", value );
    const list = [...inputList];
    list[index][name] = value;
    setInputList(list);
  };
 
  // handle click event of the Remove button
  const handleRemoveClick = index => {
    const list = [...inputList];
    list.splice(index, 1);
    setInputList(list);
  };
 
  // handle click event of the Add button
  const handleAddClick = () => {
    setInputList([...inputList, { firstName: "", lastName: "" }]);
  };
 
  return (
    <div className="App">
      <h3>TEST!</h3>
      {inputList.map((x, i) => {
        console.log("X: ", x);
        return (
          <div className="box">
            <input
              name="firstName"
   placeholder="Enter First Name"
              value={x.firstName}
              onChange={e => handleInputChange(e, i)}
            />
            <input
              className="ml10"
              name="lastName"
   placeholder="Enter Last Name"
              value={x.lastName}
              onChange={e => handleInputChange(e, i)}
            />
            <div className="btn-box">
              {inputList.length !== 1 && <button
                className="mr10"
                onClick={() => handleRemoveClick(i)}>Remove</button>}
              {inputList.length - 1 === i && <button onClick={handleAddClick}>Add</button>}
            </div>
          </div>
        );
      })}
      <div style={{ marginTop: 20 }}>{JSON.stringify(inputList)}</div>
    </div>
  );
}


