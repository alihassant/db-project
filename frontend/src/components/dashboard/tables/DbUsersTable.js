import "@/app/dashboard.min.css";
import Link from "next/link";
import { useState } from "react";

export default function DbUsersTable({ dbId, users }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  //   let itemsPerPage = 10;

  const [itemsPerPage, setItemsPerPage] = useState(10);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const firstItem = indexOfFirstItem + 1;
  const totalPages = Math.ceil(users.length / itemsPerPage);

  const filteredUsers = users
    .filter((user) => {
      return user.name.toLowerCase().includes(searchTerm.toLowerCase());
    })
    .slice(indexOfFirstItem, indexOfLastItem);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleItemsPerPage = (e) => {
    setItemsPerPage(e.target.value);
  };

  return (
    <>
      <div className="card-body">
        <div className="row">
          <div className="col-md-6 text-nowrap">
            <div
              id="dataTable_length"
              className="dataTables_length"
              aria-controls="dataTable"
            >
              <label className="form-label">
                Show&nbsp;
                <select
                  defaultValue={10}
                  onChange={handleItemsPerPage}
                  className="d-inline-block form-select form-select-sm"
                >
                  <option value={10}>10</option>
                  <option value={25}>25</option>
                  <option value={50}>50</option>
                  <option value={100}>100</option>
                </select>
                &nbsp;
              </label>
            </div>
          </div>
          <div className="col-md-6">
            <div
              className="text-md-end dataTables_filter"
              id="dataTable_filter"
            >
              <label className="form-label">
                <input
                  type="search"
                  className="form-control form-control-sm"
                  aria-controls="dataTable"
                  placeholder="Search"
                  value={searchTerm}
                  onChange={handleSearch}
                />
              </label>
            </div>
          </div>
        </div>
        <div
          className="table-responsive table mt-2"
          id="dataTable"
          role="grid"
          aria-describedby="dataTable_info"
        >
          <table className="table table-striped my-0" id="dataTable">
            <thead>
              <tr>
                <th>Name</th>
                <th>Role</th>
                <th>Email</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map((user) => {
                // INITIAL_REMOVE_USER.removeUserId = user?._id;
                return (
                  <tr key={user._id}>
                    <td>{user.name}</td>
                    <td>{user.role}</td>
                    <td>{user.email}</td>
                    <td>
                      <Link
                        href={`/dashboard/tables/table/${dbId}/users/${user.userId}`}
                        className="btn btn-primary"
                      >
                        {" "}
                        See More
                      </Link>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <div className="row">
          {(users.length === 0 && (
            <div className="col-md-12">
              <p className="text-center">No users found</p>
            </div>
          )) || (
            <div className="col-md-6 align-self-center">
              <p
                id="dataTable_info"
                className="dataTables_info"
                role="status"
                aria-live="polite"
              >
                {(searchTerm !== "" &&
                  `Showing ${firstItem} to ${filteredUsers.length} of ${filteredUsers.length}`) ||
                  `Showing ${firstItem} to ${indexOfLastItem} of ${users.length}`}
              </p>
            </div>
          )}

          <div className="col-md-6">
            <nav className="d-lg-flex justify-content-lg-end dataTables_paginate paging_simple_numbers">
              <ul className="pagination">
                <li className="page-item ">
                  <button
                    className="page-link"
                    onClick={() => {
                      if (currentPage > 1) {
                        setCurrentPage(currentPage - 1);
                      }
                    }}
                  >
                    Previous
                  </button>
                </li>
                {Array.from({ length: Math.ceil(users.length / itemsPerPage) })
                  .map((_, i) => {
                    return i + 1;
                  })
                  .map((number) => {
                    return (
                      <li key={number} className="page-item ">
                        <button
                          className={`page-link ${
                            currentPage === number && "active"
                          }`}
                          onClick={() => setCurrentPage(number)}
                        >
                          {number}
                        </button>
                      </li>
                    );
                  })}
                <li className="page-item">
                  <button
                    className="page-link"
                    onClick={() => {
                      if (currentPage < totalPages) {
                        setCurrentPage(currentPage + 1);
                      }
                    }}
                  >
                    Next
                  </button>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </div>
    </>
  );
}
