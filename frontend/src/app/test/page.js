"use client";

import axios from "axios";
import { useState } from "react";

// const INITIAL_DATA = {
//   name: "",
//   email: "",
//   password: "",
//   username: "",
// };

// export default function Test() {
//   const [data, setData] = useState(INITIAL_DATA);

//   function handleChange(e) {
//     const { name, value } = e.target;
//     setData((prev) => ({ ...prev, [name]: value }));
//   }
//   // console.log(db);

//   async function handleSubmit(e) {
//     e.preventDefault();
//     try {
//       const url = `http://localhost:8080/api/db/test`;
//       const payload = { ...data };
//       const response = await axios.post(url, payload);
//       // console.log(response.data);
//     } catch (err) {
//       console.log(err);
//     }
//   }

//   return (
//     <>
//       <form onSubmit={handleSubmit}>
//         <label>
//           Enter your name:
//           <input type="text" name="name" onChange={handleChange} />
//         </label>
//         <label>
//           Enter your email:
//           <input type="text" name="email" onChange={handleChange} />
//         </label>
//         <label>
//           Enter your password:
//           <input type="text" name="password" onChange={handleChange} />
//         </label>
//         <label>
//           Enter your password:
//           <input type="text" name="username" onChange={handleChange} />
//         </label>
//         <button className="btn btn-primary btn-sm" type="submit">
//           Create Database
//         </button>
//       </form>
//     </>
//   );
// }

const INITIAL_DATA = {
  name: "newDB",
  userId: "1",
};

const MAX_NUMBER = 10;

export default function Test() {
  const [data, setData] = useState(INITIAL_DATA);
  const [fieldsNum, setFieldsNum] = useState(0);

  function handleChange(e) {
    const { name, value } = e.target;
    setData((prev) => ({ ...prev, [name]: value }));
  }

  function handleFieldsNum(e) {
    const { name, value } = e.target;
    setFieldsNum(value);
    setData((prev) => ({ ...prev, [name]: value }));
  }

  console.log(data);
  console.log(fieldsNum);

  return (
    <>
      <div className="col">
        <div
          className="row mx-6"
          style={{ maxWidth: "600px", marginLeft: "200px", marginTop: "100px" }}
        >
          <h1>Create a new database</h1>
          <form>
            <div className="mb-3">
              <label htmlFor="exampleInputEmail1" className="form-label">
                Number of fields
              </label>
              <input
                className="form-control"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
                onChange={handleFieldsNum}
                name="fieldsNum"
              />
            </div>

            {(fieldsNum <= MAX_NUMBER &&
              Array.from({ length: fieldsNum }).map((_, index) => (
                <div key={index} className="mb-3" id={index}>
                  <label htmlFor="exampleInputEmail1" className="form-label">
                    Field {index + 1}
                  </label>
                  <input
                    className="form-control"
                    id={index}
                    name={`tH${index + 1}`}
                    aria-describedby="emailHelp"
                    onChange={handleChange}
                  />
                </div>
              ))) || (
              <div>Number of fields should be less than {MAX_NUMBER}</div>
            )}

            <div className="mb-3">
              <label htmlFor="exampleInputPassword1" className="form-label">
                Password
              </label>
              <input
                type="password"
                className="form-control"
                id="exampleInputPassword1"
              />
            </div>
            <button type="submit" className="btn btn-primary">
              Submit
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

// {Array.from({ length: fieldsNum }).map((_, index) => (
//   <div key={index} className="mb-3">
//     <label htmlFor="exampleInputEmail1" className="form-label">
//       Field {index + 1}
//     </label>
//     <input
//       type="email"
//       className="form-control"
//       id="exampleInputEmail1"
//       aria-describedby="emailHelp"
//     />
//   </div>
// ))}
