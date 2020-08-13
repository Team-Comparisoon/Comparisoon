import React, { Component, useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";

export default function NewTechnology(props) {
  /*
    {
      "name": React,
      "fields": {
        "FrontendLibrary:" {"pros": "....", "cons": "...", "dataflow": "upwards"}
        "Server:" {"pros": "....", "cons": "...", "dataflow": "upwards"}
      }
    }
  */

  const inputItemRef = useRef(null);
  const [categories, setCategories] = useState([]); //fetched data (together with fields, id, name), all categories
  const [category, setCategory] = useState({}); //Individual Category (id)
  const [values, setValues] = useState([]);

  //item name - input form
  //Categories - Dropdown
  //Fields - text area

  useEffect(() => {
    fetch("/api/categories")
      .then((response) => {
        console.log("response ", response);
        return response.json();
      })
      .then((data) => {
        console.log("data", data);
        // for (let i = 0; i < data.length; i++) {
        //     console.log("data.name", data[i].name);
        //     console.log("data.id", data[i].id);
        //     console.log("data.fields: ", data[i].fields);
        //     for (let f of data[i].fields) {
        //       console.log('F ', f);
        //     }
        // }
        setCategories(data);
        console.log("FIRST ", data[0]);
        const catObj = data[0];
        setCategory(catObj);
        console.log("CHOSEN CAT init ", category);
      });
  }, []);

  // console.log("categories: ", categories);
  // {fields.map((f, i) => {
  //   return (
  //     <Field
  //       key={f + i}
  //       val={f}
  //       ind={i}
  //       handleChange={handleFieldValue}
  //     />
  //   );
  // })}

  const handleChosenCategory = (e) => {
    // console.log("e.target: " , e.target.value);
    // console.log("categories: ", categories);
    const catObj = categories.filter((c) => c.name == e.target.value)[0];
    setCategory(catObj);
    console.log("CHOSEN CATEGORY ", catObj);
  };

  const handleField = (e) => {
    e.preventDefault();
    const valuesArr = [...values];
    valuesArr[e.target.id] = e.target.value;
    setValues(valuesArr);
  };

  const Dropdown = (props) => {
    return (
      <div>
        <select value={props.choice} onChange={props.handleChange}>
          {categories.map((c, i) => {
            return (
              <option key={i} value={c.name}>
                {c.name}
              </option>
            );
          })}
        </select>
      </div>
    );
  };

  //Create field components
  const Field = (props) => {
    return (
      <div>
        <label>{props.name}</label>
        <input
          id={props.ind}
          type="text"
          onChange={props.handleChange}
          value={props.val}
        />
      </div>
    );
  };

  const handleSaveTechnology = (e) => {
    e.preventDefault();
    if (inputItemRef.current.value && category && values) {
      // modify the structure!
      // const data = {
      //   name: inputItemRef.current.value,
      //   fields: {
      //     `${category}`: {’data flow’ :  value, ‘field2’: value },
      //   }
      // };
      fetch("/api/items", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })
        .then((status) => {
          // check if responding with status code 200?
          // status.ok should be true
          console.log("Status ", status);
          inputItemRef.current.value = "";
          setValues(["pros", "cons"]);
        })
        .catch((err) => {
          // give user an error message on unsuccessful Post req
          console.log("Error ", err);
        });
    }
  };

  return (
    <div>
      <div>
        <form onClick={handleSaveTechnology}>
          <label>
            Name Of Technology:
            <input type="text" placeholder="Name-Of-Tech" ref={inputItemRef} />
          </label>
          <div className="dropdown">
            <Dropdown handleChange={handleChosenCategory} choice={category} />
          </div>
          <div className="fieldsContainer">
            {category.fields.map((f, i) => {
              return (
                <Field
                  key={f + i}
                  field={f}
                  val={f}
                  ind={i}
                  handleChange={handleField}
                />
              );
            })}
          </div>
          <button type="submit"> Save </button>
        </form>
      </div>
      <Link to="/compare">Compare techs in this category</Link>
    </div>
  );
}

// {
//   categories.filter((c) => c === category)['fields'].map((field, i) => {
//   <Field key={f + i} handleChange={handleField} ind={i} val={f}/>
// })}
