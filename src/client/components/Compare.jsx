import React, { Component, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

// import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

// grid-template-columns: 100px 50px 100px;
//   grid-template-rows: 80px auto 80px;
//   column-gap: 10px;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(${(props) => props.columns}, minmax(2rem, auto));
  border: ${(props) => props.border};
  color: ${(props) => props.color};
`;
const Cell = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0.5rem;
  background-color: ${(props) => props.backgroundColor || 'white'};
  color: ${(props) => props.color || 'black'};
  box-sizing: border-box;
`;
const Col = styled.div`
  color: ${(props) => props.color};
  flex: ${(props) => props.size};
`;

// we need to pass category name to this component?
export default function ComparePage() {
  // const history = useHistory();
  // const goMain = () => history.push('categories');
  const [state, setState] = useState([]);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    fetch(`/api/compare/${category.id}`)
      .then((response) => {
        console.log('Response:  ', response);
        return response.json();
      })
      .then((data) => {
        if (!data || data === undefined) setHasError(true);
        // data = {'React' : {'pros': value , 'cons': value , 'key': value, 'otherkey' : values},
        //          'Vue' :  {'pros': value,  'cons': value, 'key': value , 'otherkey' : values}
        //          }
        console.log('Data :', data);
        setState(data);
        console.log('state: ', state);
      })
      .catch((err) => {
        console.log('Error : ', err);
        setHasError(true);
      });
  }, []);

  // eslint-disable-next-line consistent-return
  const renderFields = (props) => {
    // get outer objects keys, it's an array
    const outerArr = Object.keys(state);
    const fields = [];
    for (let i = 0; i < outerArr.length; i++) {
      // at array[0] , get all of those inner object keys, it's an array
      fields.push(Object.keys(outerArr[i]));
    }
    // return THAT array
    const fieldsArr = fields.filter((field, i) => fields.indexOf(field) === i);
    return fieldsArr;
  };

  function renderNames() {
    const technologyNames = state;
    console.log('Technologies(renderNames)', technologyNames);
    const names = Object.keys(technologyNames);
    return names;
  }

  return (
    <div className="Compare">
      <h1>You're Category Grid</h1>
      <Grid color="blue" columns={names.length + 1}>
        <Cell>I'm the Empty Cell</Cell>
        {names.map((technology) => {
          return <Cell className="technology-name">{technology}</Cell>;
        })}
        <Col color="red" rows={fieldsArr.length + 1}>
          <Cell>Fields:</Cell>
          {fieldsArr.map((field) => {
            return <Cell className="field-name">{field}</Cell>;
          })}
        </Col>
      </Grid>
    </div>
  );
}
