import React from 'react';
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
  const injuryStatus = useSelector((state) => state.filter.injuryStatus);
  const textPlayerSearch = useSelector(
    (state) => state.filter.textPlayerSearch
  );
  const chosenCategory = useSelector((state) => state.filter.chosenCategory);

  return (
    <div>
      <Form>
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
          <Form.Label>Search Player</Form.Label>
          <Form.Control type="text" placeholder="..." />
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
          <Form.Check id="injuredCheck" label="Just non-injured players" />
        </div>
        <div className="mt-3">
          <Button variant="warning">Clear Filters</Button>
        </div>
      </Form>
    </div>
  );
};

export default Filters;
