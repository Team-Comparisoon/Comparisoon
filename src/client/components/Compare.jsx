import React, { Component, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { unstable_renderSubtreeIntoContainer } from 'react-dom';
// import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

// we need to pass category name to this component?
export default function ComparePage() {
  // const history = useHistory();
  // const goMain = () => history.push('categories');
  const [state, setState] = useState([]);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    fetch(`/api/compare`)
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

  function renderFields(state) {
    // for each key in the outer object
    const technologies = state;

    for (let technology in technologies) {
      // grab the keys of that key (object.keys(key)?) , returns an array of keys
      const fields = Object.keys(technology[key]);
      console.log('fields', fields);
      // map through that array
      // return a row for each key.
      return fields.map((field) => {
        return (
          <Row className="field-names" color="green">
            {field}
          </Row>
        );
      });
    }
  }

  function renderNames(state) {
    const technologies = state;
    console.log('Technologies(renderNames)', technologies);
    const names = Object.keys(technologies);

    return technologies.map((technology) => {
      return (
        <Col className="technology-name" color="blue">
          {technology}
        </Col>
      );
    });
  }

  const Grid = styled.div`
    border: ${(props) => props.border};
    color: ${(props) => props.color};
  `;
  const Row = styled.div`
    display: flex;
    color: ${(props) => props.color};
  `;
  const Col = styled.div`
    color: ${(props) => props.color};
  `;
  setHasError(true);
  return (
    <div className="compare-container">
      <h1 className="compare-header">`Category: ${category}`</h1>
      <>
        {hasError ? (
          <div>Oh, no. An error</div>
        ) : (
          <Grid border="1mm solid black">
            <Col className="technology-fields-column" color="red">
              Fields:
              {renderFields()}
            </Col>
            <Row className="technology-names-row">{renderNames()}</Row>
            <Row className="technology-values">
              <Col size={2} color="white">
                Double the size
              </Col>
              <Col size={1} color="blue">
                Of ME
              </Col>
            </Row>
          </Grid>
        )}
        ;
        <button type="button">
          <Link to="/items/new">Create New Technology</Link>
        </button>
      </>
    </div>
  );
}
