import React from 'react';
import styled from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';
import { filterActions } from '../store/filter-slice';
import { FaCheck } from 'react-icons/fa';

const Filters = () => {
  const dispatch = useDispatch();
  const categories = useSelector((state) => state.filter.categories);
  const injuryStatus = useSelector((state) => state.filter.injuryStatus);
  const textPlayerSearch = useSelector(
    (state) => state.filter.textPlayerSearch
  );
  const chosenCategory = useSelector((state) => state.filter.chosenCategory);

  return (
    <Wrapper>
      <div className="content">
        <form onSubmit={(e) => e.preventDefault()}>
          {/* search input-----updated */}
          <div className="form-control">
            <input
              type="text"
              name="text"
              value={textPlayerSearch}
              placeholder="search"
              onChange={() => {
                dispatch(filterActions.searchByText());
              }}
              className="search-input"
            />
          </div>
          {/* end of search input----updated */}
          {/* category>>>>position */}
          <div className="form-control">
            <h5>Position</h5>
            <div>
              {categories.map((c, index) => {
                return (
                  <button
                    key={index}
                    onClick={() => {
                      dispatch(filterActions.categorySelected());
                    }}
                    type="button"
                    name="category"
                    className={`${
                      chosenCategory === c.toLowerCase() ? 'active' : null
                    }`}
                  >
                    {c}
                  </button>
                );
              })}
            </div>
          </div>
          {/* end of category >>>position*/}
          {/* company >>>> age */}
          <div className="form-control">
            <h5>Age</h5>
            <select
              name="min"
              value={17}
              onChange={() => {
                dispatch(filterActions.minAgeSelected());
              }}
              className="company"
            >
              {[17, 18, 19, 20].map((c, index) => {
                return (
                  <option key={index} value={c}>
                    {c}
                  </option>
                );
              })}
            </select>
            <select
              name="max"
              value={35}
              onChange={() => {
                dispatch(filterActions.maxAgeSelected());
              }}
              className="company"
            >
              {[31, 32, 33, 34, 35, 36, 37].map((c, index) => {
                return (
                  <option key={index} value={c}>
                    {c}
                  </option>
                );
              })}
            </select>
          </div>
          {/* end of company>>>> age */}
          {/* colors 
          <div className="form-control">
            <h5>colors</h5>
            <div className="colors">
              {colors.map((c, index) => {
                if (c === 'all') {
                  return (
                    <button
                      key={index}
                      name="color"
                      onClick={updateFilters}
                      data-color="all"
                      className={`${
                        color === 'all' ? 'all-btn active' : 'all-btn'
                      }`}
                    >
                      all
                    </button>
                  );
                }
                return (
                  <button
                    key={index}
                    name="color"
                    style={{ background: c }}
                    className={`${
                      color === c ? 'color-btn active' : 'color-btn'
                    }`}
                    data-color={c}
                    onClick={updateFilters}
                  >
                    {color === c ? <FaCheck /> : null}
                  </button>
                );
              })}
            </div>
          </div>
          {/* end of colors */}
          {/* price 
          <div className="form-control">
            <h5>price</h5>
            <p className="price">{formatPrice(price)}</p>
            <input
              type="range"
              name="price"
              onChange={updateFilters}
              min={min_price}
              max={max_price}
              value={price}
            />
          </div>
          {/* end of price */}
          {/* shipping >>>>injured*/}
          <div className="form-control shipping">
            <label htmlFor="injured">Injured</label>
            <input
              type="checkbox"
              name="injured"
              id="injured"
              checked={injuryStatus}
              onChange={() => {
                dispatch(filterActions.injuredToggle());
              }}
            />
          </div>
          {/* end of  shipping >>>>injured*/}
        </form>
        <button
          type="button"
          className="clear-btn"
          onClick={() => {
            dispatch(filterActions.clearFilters());
          }}
        >
          clear filters
        </button>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  .form-control {
    margin-bottom: 1.25rem;
    h5 {
      margin-bottom: 0.5rem;
    }
  }
  .search-input {
    padding: 0.5rem;
    background: var(--clr-grey-10);
    border-radius: var(--radius);
    border-color: transparent;
    letter-spacing: var(--spacing);
  }
  .search-input::placeholder {
    text-transform: capitalize;
  }

  button {
    display: block;
    margin: 0.25em 0;
    padding: 0.25rem 0;
    text-transform: capitalize;
    background: transparent;
    border: none;
    border-bottom: 1px solid transparent;
    letter-spacing: var(--spacing);
    color: var(--clr-grey-5);
    cursor: pointer;
  }
  .active {
    border-color: var(--clr-grey-5);
  }
  .company {
    background: var(--clr-grey-10);
    border-radius: var(--radius);
    border-color: transparent;
    padding: 0.25rem;
  }
  .colors {
    display: flex;
    align-items: center;
  }
  .color-btn {
    display: inline-block;
    width: 1rem;
    height: 1rem;
    border-radius: 50%;
    background: #222;
    margin-right: 0.5rem;
    border: none;
    cursor: pointer;
    opacity: 0.5;
    display: flex;
    align-items: center;
    justify-content: center;
    svg {
      font-size: 0.5rem;
      color: var(--clr-white);
    }
  }
  .all-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: 0.5rem;
    opacity: 0.5;
  }
  .active {
    opacity: 1;
  }
  .all-btn .active {
    text-decoration: underline;
  }
  .price {
    margin-bottom: 0.25rem;
  }
  .shipping {
    display: grid;
    grid-template-columns: auto 1fr;
    align-items: center;
    text-transform: capitalize;
    column-gap: 0.5rem;
    font-size: 1rem;
  }
  .clear-btn {
    background: var(--clr-red-dark);
    color: var(--clr-white);
    padding: 0.25rem 0.5rem;
    border-radius: var(--radius);
  }
  @media (min-width: 768px) {
    .content {
      position: sticky;
      top: 1rem;
    }
  }
`;

export default Filters;
