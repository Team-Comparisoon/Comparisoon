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
  const [category, setCategory] = useState(''); //Individual Category (id)
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
          for (let i = 0; i < data.length; i++) {
              console.log("data.name", data[i].name);
              console.log("data.id", data[i].id);
              console.log("data.fields: ", data[i].fields);
              for (let f of data[i].fields) {
                console.log('F ', f);
              }
          }
          setCategories(data);
      })
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
    setCategory(e.target.value);
  }

  // const handleField = (e) => {

  // }

  const Dropdown = (props) => {
    return (
      <div>
      <select onChange={props.handleChange}>
          {categories.map((c, i) => {
            return (
              <option key={i} value={c.name}>{c.name}</option>
            )
          })}
      </select>
      </div>
    )
  }

  //Create field components
  const Field = (props) => {
    return (
      <div>
        <label>
          <input
            id={props.ind}
            type="text"
            onChange={props.handleChange}
            value={props.val}
          />
      </label>
      </div>
    )
  }

  return (
    <div>
      <form>
          <label>
              Name Of Technology:
              <input
                  type="text"
                  placeholder="Name-Of-Tech"
                  ref={inputItemRef}
              />
          </label>
          <div>
            <Dropdown handleChange={handleChosenCategory}/>
          </div>
          <div>
            {console.log("category: ", category)}
            { 
              categories.filter((c) => c === category)['fields'].map((field, i) => {
              <Field key={f + i} handleChange={handleField} ind={i} val={f}/>
            })}
          </div>
          <button onClick = {mergeAllStates}>
        <Link to="/compare">Save</Link>
      </button>
      </form>
    </div>
  )
}