import React, { useState, useEffect, useRef, useLayoutEffect } from "react";
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
  //Fields - text area/ input

  // useEffect(() => {
  //   fetch("/api/categories")
  //     .then((response) => {
  //       console.log("response ", response);
  //       return response.json();
  //     })
  //     .then((data) => {
  //       console.log("data", data);
  //       setCategories(data);
  //       console.log("FIRST ", data[0]);
  //       const catObj = data[0];
  //       setCategory(catObj);
  //       console.log("CHOSEN CAT init ", category);
  //     });
  // }, []);

  useLayoutEffect(() => {
    fetch("/api/categories")
      .then((response) => {
        console.log("response ", response);
        return response.json();
      })
      .then((data) => {
        console.log("data", data);
        setCategories(data);
        console.log("FIRST ", data[0]);
        const catObj = data[0];
        setCategory(catObj);
        console.log("CHOSEN CAT init ", category);
      });
  }, []);

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
          id={props.name}
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
      //     `${category.name}`: {category.fields}: {values},
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
          <div>
            <input type="text" placeholder="Name-Of-Tech" ref={inputItemRef} />
          </div>
          <div className="dropdown">
            <Dropdown handleChange={handleChosenCategory} choice={category} />
          </div>
          <div className="fieldsContainer">
            {JSON.stringify(category.fields)}
          </div>
          <button type="submit"> Save </button>
        </form>
      </div>
      <Link to="/compare">Compare techs in this category</Link>
    </div>
  );
}

// {JSON.stringify(category.fields)}

// {category.fields.map((f, i) => {
//   return (
//     <Field
//       key={f + i}
//       field={f}
//       val={f}
//       ind={i}
//       handleChange={handleField}
//     />
//   )
// })}

// {
//   categories.filter((c) => c === category)['fields'].map((field, i) => {
//   <Field key={f + i} handleChange={handleField} ind={i} val={f}/>
// })}

// <label>
//   Name Of Technology:
//   <input type="text" placeholder="Name-Of-Tech" ref={inputItemRef} />
// </label>
