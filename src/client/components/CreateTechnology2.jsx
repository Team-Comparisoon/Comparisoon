import React, { Component, useState, useEffect } from "react";
import { Link } from "react-router-dom";
// import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

// 2 buttons with Links on them
export default function NewTechnology(props) {

  /*
  {
    "name": React,
    "fields": {
      "FrontendLibrary:" {"pros": "....", "cons": "...", "dataflow": "upwards"}
      "Server:" {"pros": "....", "cons": "...", "dataflow": "upwards"}
    }
  } 

  {

  }
  */
  //GET Req

  //Save - Post Req.
  const [globalState, setState] = useState(
    {
      "name": "", //Need to fill this in based on textarea Inputs.
      "fields": {}
    }
  );
  
  const [technology, settechnology] = useState(""); //"React"
  const [categories, setCategories] = useState(""); //"Frontend"
  const [pros, setPros] = useState(""); //"Awesomeness, data flows awesome"
  const [cons, setCons] = useState(""); //"No Cons"
  //OnClick, merge all states into globalState (using setState)
  //Post req. to DB
  //If came from view 2, go back to view 2 (With Updated name; Maybe use useHistory?)
  //If came from view 4, go back to view 4 (Updated view 5; useHistory)


  //Need to handle categories before handling pros, cons, and other fields.
  const handleCategories = (e) => {
    const { value } = e.target;
    setCategories(currentState => (
        {...currentState, value}
      )
    ) 
  }
  
  // console.log("categories: ", categories);

  const handletechnology = (e) => {
    const { value } = e.target;
    console.log("~~~vals :", value);
    settechnology(currentState => (
        {...currentState, value}
      )
    )  
  }
  

  /*
  {
    "name": React,
    "fields": {
      "FrontendLibrary:" {"pros": "....", "cons": "...", "dataflow": "upwards"}
      "Server:" {"pros": "....", "cons": "...", "dataflow": "upwards"}
    }
  } 
  */

  const mergeAllStates = (e) => {
    let technologyValue = technology.value;
    console.log("technology value: ", technologyValue);
    let addtechnology = {
      ...setState.name,
      technologyValue
    }
    console.log("~~~addtech: ", addtechnology);
    setState(addtechnology);

    console.log("global state: ", globalState);

    // let updatedState = {
    //     ...setState,
    // }
    // setState(currentState => (
    //     {
    //       ...currentState,
    //       currentState["name"] = technology,
    //       currentState["fields"][categories] = {},

    //     }
    //   )
    // )
  }
  
  console.log("Tech Obj: ", technology);

  const handlePros = (e) => {
    // const { value } = e.target;
    // settechnologyObj(currentState => {
    //   ...currentState,
    //   currentState[fields]  
    // }) 
  }

  const handleCons = (e) => {
    const { value } = e.target;
    // prosChange(value);
    // console.log("name: ", name);
    console.log("value: ", value);
    // prosChange(value); //pros state will now update to value.
  }

  const handleChange = (e) => {
    const { value } = e.target;
    // prosChange(value);
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
          Name Of Technology: 
          <input 
            type="text"
            name="Name-Of-Tech"
            onChange={e => handletechnology(e)}
          />
        </label>
      </form>

      <form>
        <label>
          Categories: 
          <textarea 
            type="text"
            name="Categories"
            onChange={e => handleCategories(e)}
          />
        </label>
      </form>
{/* 
      <form>
        <label>
          Pros: 
          <textarea 
            type="text"
            name="pros"
            onChange={e => handleChange(e)}
          />
        </label>
      </form>

      <form>
        <label>
          Cons: 
          <textarea 
            type="text"
            name="pros"
            onChange={e => handleChange(e)}
          />
        </label>
      </form> */}

      <form>
        <label>
        Add New Field:
        <input type="text" name="name" />
          </label>
        <input type="submit" value="Submit" />
      </form>

      <button onClick = {mergeAllStates}>
        <Link to="/compare">Save</Link> 
      </button>

      {/*Just to test how the item data would look.*/}
      {/* <div style={{ marginTop: 20 }}>{JSON.stringify(inputList)}</div> */}

    </div>
  );

  // const [inputList, setInputList] = useState([{ firstName: "", lastName: "" }]);
 
  // // handle input change
  // const handleInputChange = (e, index) => {
  //   console.log("E target: ", e.target);
  //   const { name, value } = e.target;
  //   console.log("name: ", name );
  //   console.log("value: ", value );
  //   const list = [...inputList];
  //   list[index][name] = value;
  //   setInputList(list);
  // };
 
  // // handle click event of the Remove button
  // const handleRemoveClick = index => {
  //   const list = [...inputList];
  //   list.splice(index, 1);
  //   setInputList(list);
  // };
 
  // // handle click event of the Add button
  // const handleAddClick = () => {
  //   setInputList([...inputList, { firstName: "", lastName: "" }]);
  // };
 
  // return (
  //   <div className="App">
  //     <h3>TEST!</h3>
  //     {inputList.map((x, i) => {
  //       console.log("X: ", x);
  //       return (
  //         <div className="box">
  //           <input
  //             name="firstName"
  //  placeholder="Enter First Name"
  //             value={x.firstName}
  //             onChange={e => handleInputChange(e, i)}
  //           />
  //           <input
  //             className="ml10"
  //             name="lastName"
  //  placeholder="Enter Last Name"
  //             value={x.lastName}
  //             onChange={e => handleInputChange(e, i)}
  //           />
  //           <div className="btn-box">
  //             {inputList.length !== 1 && <button
  //               className="mr10"
  //               onClick={() => handleRemoveClick(i)}>Remove</button>}
  //             {inputList.length - 1 === i && <button onClick={handleAddClick}>Add</button>}
  //           </div>
  //         </div>
  //       );
  //     })}
  //     <div style={{ marginTop: 20 }}>{JSON.stringify(inputList)}</div>
  //   </div>
  // );
}


