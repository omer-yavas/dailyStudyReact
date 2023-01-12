import React from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useSelector, useDispatch } from 'react-redux';
import { filterActions } from '../store/filter-slice';

const Filters = () => {
  const dispatch = useDispatch();
  const categories = useSelector((state) => state.filter.categories);
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
          <Form.Control type="text" placeholder="Search" />
        </Form.Group>
        <Form.Select className="mb-3" aria-label="Default select example">
          <option>Position</option>
          <option value="1">Golakeeper</option>
          <option value="2">Defender</option>
          <option value="3">MiddlePlayer</option>
        </Form.Select>
        <Form.Select className="mb-3" aria-label="Default select example">
          <option>Nationality</option>
          <option value="1">Germany</option>
          <option value="2">France</option>
          <option value="3">USA</option>
        </Form.Select>
        <div className="row mb-3">
          <div className="col-6">
            <Form.Select aria-label="Default select example">
              <option>Min Age</option>
              <option value="1">16</option>
              <option value="2">17</option>
              <option value="3">18</option>
            </Form.Select>
          </div>
          <div className="col-6">
            <Form.Select aria-label="Default select example">
              <option>Max Age</option>
              <option value="1">33</option>
              <option value="2">34</option>
              <option value="3">35</option>
            </Form.Select>
          </div>
        </div>
        <div className="row mb-3">
          <div className="col-6">
            <Form.Select aria-label="Default select example">
              <option>Min Height</option>
              <option value="1">171</option>
              <option value="2">172</option>
              <option value="3">173</option>
            </Form.Select>
          </div>
          <div className="col-6">
            <Form.Select aria-label="Default select example">
              <option>Max Height</option>
              <option value="1">211</option>
              <option value="2">212</option>
              <option value="3">213</option>
            </Form.Select>
          </div>
        </div>
        <div className="row mb-3">
          <div className="col-6">
            <Form.Select aria-label="Default select example">
              <option>Min Weight</option>
              <option value="1">71</option>
              <option value="2">72</option>
              <option value="3">73</option>
            </Form.Select>
          </div>
          <div className="col-6">
            <Form.Select aria-label="Default select example">
              <option>Max Weight</option>
              <option value="1">111</option>
              <option value="2">112</option>
              <option value="3">113</option>
            </Form.Select>
          </div>
        </div>
        <div classname="mb-3">
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

// {<div className="content">
// <form onSubmit={(e) => e.preventDefault()}>
//   {/* search input-----updated */}
//   <div className="form-control">
//     <input
//       type="text"
//       name="text"
//       value={textPlayerSearch}
//       placeholder="search"
//       onChange={() => {
//         dispatch(filterActions.searchByText());
//       }}
//       className="search-input"
//     />
//   </div>
//   {/* end of search input----updated */}

//   {/* category>>>>position */}
//   <div className="form-control">
//     <h5>Position</h5>
//     <div>
//       {categories.map((c, index) => {
//         return (
//           <button
//             key={index}
//             onClick={() => {
//               dispatch(filterActions.categorySelected());
//             }}
//             type="button"
//             name="category"
//             className={`${
//               chosenCategory === c.toLowerCase() ? 'active' : null
//             }`}
//           >
//             {c}
//           </button>
//         );
//       })}
//     </div>
//   </div>
//   {/* end of category >>>position*/}

//   {/* nationality*/}
//   <div className="form-control">
//     <h5>Nationality</h5>
//     <select
//       name="nationalitySelector"
//       value="all"
//       onChange={() => {
//         dispatch(filterActions.nationalitySelected());
//       }}
//       className="company"
//     >
//       {['germany', 'france', 'turkey', 'usa'].map((c, index) => {
//         return (
//           <option key={index} value={c}>
//             {c}
//           </option>
//         );
//       })}
//     </select>
//   </div>
//   {/* Nationality */}

//   {/* company >>>> age */}
//   <div className="form-control">
//     <h5>Age</h5>
//     <select
//       name="min"
//       value={17}
//       onChange={() => {
//         dispatch(filterActions.minAgeSelected());
//       }}
//       className="company"
//     >
//       {[17, 18, 19, 20].map((c, index) => {
//         return (
//           <option key={index} value={c}>
//             {c}
//           </option>
//         );
//       })}
//     </select>
//     <select
//       name="max"
//       value={35}
//       onChange={() => {
//         dispatch(filterActions.maxAgeSelected());
//       }}
//       className="company"
//     >
//       {[31, 32, 33, 34, 35, 36, 37].map((c, index) => {
//         return (
//           <option key={index} value={c}>
//             {c}
//           </option>
//         );
//       })}
//     </select>
//   </div>
//   {/* end of company>>>> age */}

//   {/* Height*/}
//   <div className="form-control">
//     <h5>Height</h5>
//     <select
//       name="heightMinSelector"
//       value="all"
//       onChange={() => {
//         dispatch(filterActions.heightMinSelected());
//       }}
//       className="company"
//     >
//       {[180, 181, 182].map((c, index) => {
//         return (
//           <option key={index} value={c}>
//             {c}
//           </option>
//         );
//       })}
//     </select>
//     <select
//       name="heightMaxSelector"
//       value="all"
//       onChange={() => {
//         dispatch(filterActions.heightMaxSelected());
//       }}
//       className="company"
//     >
//       {[190, 191, 192].map((c, index) => {
//         return (
//           <option key={index} value={c}>
//             {c}
//           </option>
//         );
//       })}
//     </select>
//   </div>
//   {/* Height */}

//   {/* Weight*/}
//   <div className="form-control">
//     <h5>Height</h5>
//     <select
//       name="weightMinSelector"
//       value="all"
//       onChange={() => {
//         dispatch(filterActions.weightMinSelected());
//       }}
//       className="company"
//     >
//       {[180, 181, 182].map((c, index) => {
//         return (
//           <option key={index} value={c}>
//             {c}
//           </option>
//         );
//       })}
//     </select>
//     <select
//       name="weightMaxSelector"
//       value="all"
//       onChange={() => {
//         dispatch(filterActions.weightMaxSelected());
//       }}
//       className="company"
//     >
//       {[190, 191, 192].map((c, index) => {
//         return (
//           <option key={index} value={c}>
//             {c}
//           </option>
//         );
//       })}
//     </select>
//   </div>
//   {/* Weight */}

//   {/* shipping >>>>injured*/}
//   <div className="form-control shipping">
//     <label htmlFor="injured">Injured</label>
//     <input
//       type="checkbox"
//       name="injured"
//       id="injured"
//       checked={injuryStatus}
//       onChange={() => {
//         dispatch(filterActions.injuredToggle());
//       }}
//     />
//   </div>
//   {/* end of  shipping >>>>injured*/}
// </form>
// <button
//   type="button"
//   className="clear-btn"
//   onClick={() => {
//     dispatch(filterActions.clearFilters());
//   }}
// >
//   clear filters
// </button>
// </div>}
