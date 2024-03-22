import axios from "axios";
import { useEffect, useState } from "react";
import Loading from "../Loading";

export default function SuperAdminPanel({ user }) {
  const userId = user._id;
  const [usersNumber, setUsersNumber] = useState();
  const [dbNumber, setDbNumber] = useState();
  const [postsNumber, setPostsNumber] = useState();
  const [loading, setLoading] = useState(false);

  const getUsersNumber = async () => {
    try {
      setLoading(true);
      const res = await axios.get(
        `http://localhost:8080/api/superAdmin/getUsersNumber/${userId}`
      );

      const { usersNumber } = res.data;
      const { dbNumber } = res.data;
      //   console.log(res.data);

      setUsersNumber(usersNumber);
      setDbNumber(dbNumber);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const getPostsNumber = async () => {
    try {
      setLoading(true);
      const res = await axios.get(
        `http://localhost:8080/api/superAdmin/getPostsNumber/${userId}`
      );
      // console.log(res.data);
      const { postsNumber } = res.data;
      //   console.log(res.data);

      setPostsNumber(postsNumber);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getUsersNumber();
    getPostsNumber();
    // eslint-disable-next-line
  }, []);

  return (
    <>
      <div className="col-lg-5 col-xl-4">
        <div className="card shadow mb-4">
          <div className="card-header d-flex justify-content-between align-items-center">
            <h6 className="text-primary fw-bold m-0">Super Admin Panel</h6>
            {/* <div className="dropdown no-arrow">
              <button
                className="btn btn-link btn-sm dropdown-toggle"
                aria-expanded="false"
                data-bs-toggle="dropdown"
                type="button"
              >
                <i className="fas fa-ellipsis-v text-gray-400" />
              </button>
              <div className="dropdown-menu shadow dropdown-menu-end animated--fade-in">
                <p className="text-center dropdown-header">dropdown header:</p>
                <a className="dropdown-item" href="#">
                  &nbsp;Action
                </a>
                <a className="dropdown-item" href="#">
                  &nbsp;Another action
                </a>
                <div className="dropdown-divider" />
                <a className="dropdown-item" href="#">
                  &nbsp;Something else here
                </a>
              </div>
            </div> */}
          </div>
          <div className="card-body" style={{ minHeight: "165px" }}>
            {(loading && <Loading />) || (
              <>
                <div className="row">
                  <div className="col">
                    <div className="mb-3">
                      <strong>Total Website Users: {usersNumber}</strong>
                    </div>
                    <div className="mb-3">
                      <strong>Total Databases: {dbNumber}</strong>
                    </div>
                    <div className="mb-3">
                      <strong>Total Posts: {postsNumber}</strong>
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
