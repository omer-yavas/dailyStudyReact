import React from 'react';
import { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useSelector, useDispatch } from 'react-redux';
import { filterActions } from '../store/filter-slice';
import { playersActions } from '../store/players-slice';
import { countries } from '../utils/constants';
import { positions } from '../utils/constants';
import { ages } from '../utils/constants';
import { height } from '../utils/constants';
import { weight } from '../utils/constants';

const Filters = () => {
  const dispatch = useDispatch();
  const [query, setQuery] = useState('');

  const clearFiltersHandler = () => {
    setQuery('');
    dispatch(
      playersActions.filterSelected({
        searchValue: '',
        position: 'All',
        nationality: 'All',
        ageMin: 0,
        ageMax: 100,
        heightMin: 100,
        heightMax: 250,
        weightMin: 0,
        weightMax: 200,
        injuredCheck: false,
      })
    );
  };

  const formSubmissionHandler = (event) => {
    event.preventDefault();
    dispatch(playersActions.filterSelected({ searchValue: `${query}` }));
  };

  return (
    <div>
      <Form onSubmit={formSubmissionHandler}>
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
          <Form.Label>Search Player</Form.Label>
          <div className="row">
            <div className="col-8">
              <Form.Control
                type="search"
                placeholder="..."
                value={query}
                onChange={(event) => setQuery(event.target.value)}
              />
            </div>
            <div className="col-1">
              <Button
                variant="primary"
                onClick={() =>
                  dispatch(
                    playersActions.filterSelected({ searchValue: `${query}` })
                  )
                }
              >
                Search
              </Button>
            </div>
          </div>
        </Form.Group>

        <Form.Label>Position</Form.Label>
        <Form.Select
          className="mb-3"
          aria-label="Default select example"
          onChange={(event) =>
            dispatch(
              playersActions.filterSelected({ position: event.target.value })
            )
          }
        >
          {positions.map((position, index) => {
            return <option key={index}>{position}</option>;
          })}
        </Form.Select>
        <Form.Label>Nationality</Form.Label>
        <Form.Select
          className="mb-3"
          aria-label="Default select example"
          onChange={(event) =>
            dispatch(
              playersActions.filterSelected({ nationality: event.target.value })
            )
          }
        >
          {countries.map((country, index) => {
            return <option key={index}>{country}</option>;
          })}
        </Form.Select>
        <Form.Label>Age</Form.Label>
        <div className="row mb-3">
          <div className="col-6">
            <Form.Select
              aria-label="Default select example"
              onChange={(event) =>
                dispatch(
                  playersActions.filterSelected({ ageMin: event.target.value })
                )
              }
            >
              <option>Min</option>
              {ages.map((age, index) => {
                return <option key={index}>{age}</option>;
              })}
            </Form.Select>
          </div>
          <div className="col-6">
            <Form.Select
              aria-label="Default select example"
              onChange={(event) =>
                dispatch(
                  playersActions.filterSelected({ ageMax: event.target.value })
                )
              }
            >
              <option>Max</option>
              {ages.map((age, index) => {
                return <option key={index}>{age}</option>;
              })}
            </Form.Select>
          </div>
        </div>
        <Form.Label>Height (cm)</Form.Label>
        <div className="row mb-3">
          <div className="col-6">
            <Form.Select
              aria-label="Default select example"
              onChange={(event) =>
                dispatch(
                  playersActions.filterSelected({
                    heightMin: event.target.value,
                  })
                )
              }
            >
              <option>Min</option>
              {height.map((height, index) => {
                return <option key={index}>{height}</option>;
              })}
            </Form.Select>
          </div>
          <div className="col-6">
            <Form.Select
              aria-label="Default select example"
              onChange={(event) =>
                dispatch(
                  playersActions.filterSelected({
                    heightMax: event.target.value,
                  })
                )
              }
            >
              <option>Max</option>
              {height.map((height, index) => {
                return <option key={index}>{height}</option>;
              })}
            </Form.Select>
          </div>
        </div>
        <Form.Label>Weight (kg)</Form.Label>
        <div className="row mb-3">
          <div className="col-6">
            <Form.Select
              aria-label="Default select example"
              onChange={(event) =>
                dispatch(
                  playersActions.filterSelected({
                    weightMin: event.target.value,
                  })
                )
              }
            >
              <option>Min</option>
              {weight.map((weight, index) => {
                return <option key={index}>{weight}</option>;
              })}
            </Form.Select>
          </div>
          <div className="col-6">
            <Form.Select
              aria-label="Default select example"
              onChange={(event) =>
                dispatch(
                  playersActions.filterSelected({
                    weightMax: event.target.value,
                  })
                )
              }
            >
              <option>Max</option>
              {weight.map((weight, index) => {
                return <option key={index}>{weight}</option>;
              })}
            </Form.Select>
          </div>
        </div>
        <div className="mb-3 checkBox_border">
          <Form.Check id="injuredCheck">
            <Form.Check.Input
              onChange={() =>
                dispatch(playersActions.filterSelected({ injuredCheck: true }))
              }
            ></Form.Check.Input>
            <Form.Check.Label>Just non-injured players</Form.Check.Label>
          </Form.Check>
        </div>
        <div className="mt-3">
          <Button variant="warning" onClick={clearFiltersHandler}>
            Clear Filters
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default Filters;
