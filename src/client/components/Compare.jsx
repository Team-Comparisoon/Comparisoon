import React, { Component, useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
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
  const { categoryId } = useParams();

  useEffect(() => {
    fetch(`/api/compare/${categoryId}`)
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
      })
      .catch((err) => {
        console.log('Error : ', err);
        setHasError(true);
      });
  }, []);

  // eslint-disable-next-line consistent-return
  const renderInputs = () => {
    if (state.length === 0) return;
    // get outer objects keys, it's an array
    const itemNames = Object.keys(state);
    console.log('items', itemNames);
    // get fieldNames by checking keys of first item
    const fields = Object.keys(state[itemNames[0]]);
    console.log('fields:', fields);
    const inputs = [];
    fields.forEach((field) => {
      inputs.push(field);
      itemNames.forEach((itemName) => {
        inputs.push(state[itemName][field]);
      });
    });
    return inputs.map((input) => {
      return <Cell className="input">{input}</Cell>;
    });
  };

  function renderNames() {
    if (state.length === 0) return 0;
    const technologyNames = state;
    console.log('TechnologyNames', technologyNames);
    const names = Object.keys(technologyNames);
    return names.map((technology) => {
      return <Cell className="technology-name">{technology}</Cell>;
    });
  }

  const namesArr = renderNames();

  return (
    <div className="Compare">
      <h1>You're Category Grid</h1>
      <Grid color="blue" columns={namesArr.length + 1}>
        <Cell>I'm the Empty Cell</Cell>
        {state.length !== 0 && namesArr}
        {state.length !== 0 && renderInputs()}
      </Grid>
    </div>
  );
}
