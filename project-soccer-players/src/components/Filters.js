import React from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useSelector, useDispatch } from 'react-redux';
import { playersActions } from '../store/players-slice';
import { countries, positions } from '../utils/constants';
import './Filters.scss';

const Filters = () => {
  const dispatch = useDispatch();

  const {
    searchValue,
    position,
    nationality,
    ratingMin,
    ratingMax,
    ageMin,
    ageMax,
    heightMin,
    heightMax,
    weightMin,
    weightMax,
    injuredCheck,
  } = useSelector((state) => state.players.filterConfig);

  const clearFiltersHandler = () => {
    dispatch(
      playersActions.filterSelected({
        searchValue: '',
        position: 'All',
        nationality: 'All',
        ratingMin: '',
        ratingMax: '',
        ageMin: '',
        ageMax: '',
        heightMin: '',
        heightMax: '',
        weightMin: '',
        weightMax: '',
        injuredCheck: false,
      })
    );
  };

  const formSubmissionHandler = (event) => {
    event.preventDefault();
  };

  return (
    <div className="filterBox">
      <Form onSubmit={formSubmissionHandler}>
        <div className="mt-3 d-flex justify-content-end">
          <button
            className="btn btn-link p-0 m-0 d-inline align-baseline clearAll"
            onClick={clearFiltersHandler}
          >
            Clear Filters
          </button>
        </div>
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
          <Form.Label>Name</Form.Label>
          <div className="row">
            <div className="col-12">
              <Form.Control
                type="search"
                placeholder="..."
                value={searchValue}
                onChange={(event) =>
                  dispatch(
                    playersActions.filterSelected({
                      searchValue: event.target.value,
                    })
                  )
                }
              />
            </div>
          </div>
        </Form.Group>

        <Form.Label>Position</Form.Label>
        <Form.Select
          className="mb-3"
          value={position}
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
          value={nationality}
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
        <Form.Label>Rating</Form.Label>
        <div className="row mb-3">
          <div className="col-6">
            <Form.Control
              type="search"
              placeholder="Min"
              value={ratingMin}
              onChange={(event) =>
                dispatch(
                  playersActions.filterSelected({
                    ratingMin: event.target.value,
                  })
                )
              }
            />
          </div>
          <div className="col-6">
            <Form.Control
              type="search"
              placeholder="Max"
              value={ratingMax}
              onChange={(event) =>
                dispatch(
                  playersActions.filterSelected({
                    ratingMax: event.target.value,
                  })
                )
              }
            />
          </div>
        </div>
        <Form.Label>Age</Form.Label>
        <div className="row mb-3">
          <div className="col-6">
            <Form.Control
              type="search"
              placeholder="Min"
              value={ageMin}
              onChange={(event) =>
                dispatch(
                  playersActions.filterSelected({ ageMin: event.target.value })
                )
              }
            />
          </div>
          <div className="col-6">
            <Form.Control
              type="search"
              placeholder="Max"
              value={ageMax}
              onChange={(event) =>
                dispatch(
                  playersActions.filterSelected({ ageMax: event.target.value })
                )
              }
            />
          </div>
        </div>
        <Form.Label>Height (cm)</Form.Label>
        <div className="row mb-3">
          <div className="col-6">
            <Form.Control
              type="search"
              placeholder="Min"
              value={heightMin}
              onChange={(event) =>
                dispatch(
                  playersActions.filterSelected({
                    heightMin: event.target.value,
                  })
                )
              }
            />
          </div>
          <div className="col-6">
            <Form.Control
              type="search"
              placeholder="Min"
              value={heightMax}
              onChange={(event) =>
                dispatch(
                  playersActions.filterSelected({
                    heightMax: event.target.value,
                  })
                )
              }
            />
          </div>
        </div>
        <Form.Label>Weight (kg)</Form.Label>
        <div className="row mb-3">
          <div className="col-6">
            <Form.Control
              type="search"
              placeholder="Min"
              value={weightMin}
              onChange={(event) =>
                dispatch(
                  playersActions.filterSelected({
                    weightMin: event.target.value,
                  })
                )
              }
            />
          </div>
          <div className="col-6">
            <Form.Control
              type="search"
              placeholder="Min"
              value={weightMax}
              onChange={(event) =>
                dispatch(
                  playersActions.filterSelected({
                    weightMax: event.target.value,
                  })
                )
              }
            />
          </div>
        </div>
        <div className="mb-3 checkBox_border">
          <Form.Check id="injuredCheck">
            <Form.Check.Input
              checked={injuredCheck}
              onChange={() =>
                dispatch(
                  playersActions.filterSelected({ injuredCheck: !injuredCheck })
                )
              }
            ></Form.Check.Input>
            <Form.Check.Label>Just non-injured players</Form.Check.Label>
          </Form.Check>
        </div>
      </Form>
    </div>
  );
};

export default Filters;
