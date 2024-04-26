import "@/app/dashboard.min.css";
import Link from "next/link";
import { useState } from "react";

export default function DbsTable({ dbs }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const [itemsPerPage, setItemsPerPage] = useState(10);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const firstItem = indexOfFirstItem + 1;

  const filteredDbs = dbs
    .filter((db) => {
      return db.dbId.name.toLowerCase().includes(searchTerm.toLowerCase());
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
          <table
            className="table table-striped table-hover my-0"
            id="dataTable"
          >
            <thead>
              <tr>
                <th>Name</th>
                <th>Role</th>
                <th>Posts</th>
                <th>Users</th>
                <th>Created At</th>
                <th>More</th>
              </tr>
            </thead>
            <tbody>
              {filteredDbs.map((db) => {
                return (
                  <tr key={db._id}>
                    <td>{db.dbId.name}</td>
                    <td>{db.dbRole}</td>
                    <td>{db.dbId.posts.length}</td>
                    <td>{db.dbId.users.length}</td>
                    <td>{new Date(db.dbId.createdAt).toString()}</td>
                    <td>
                      <Link
                        href={`/dashboard/tables/table/${db.dbId._id}`}
                        className="btn btn-primary"
                      >
                        More
                      </Link>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <div className="row">
          <div className="col-md-6 align-self-center">
            <p
              id="dataTable_info"
              className="dataTables_info"
              role="status"
              aria-live="polite"
            >
              {(dbs.length < indexOfLastItem &&
                `Showing ${firstItem} to ${dbs.length} of ${dbs.length}`) ||
                `Showing ${firstItem} to ${indexOfLastItem} of ${dbs.length}`}
            </p>
          </div>
          <div className="col-md-6">
            <nav className="d-lg-flex justify-content-lg-end dataTables_paginate paging_simple_numbers">
              <ul className="pagination">
                {Array.from({ length: Math.ceil(dbs.length / itemsPerPage) })
                  .map((_, i) => {
                    return i + 1;
                  })
                  .map((number) => {
                    return (
                      <li key={number} className="page-item">
                        <a
                          className="page-link"
                          href="#"
                          onClick={() => setCurrentPage(number)}
                        >
                          {number}
                        </a>
                      </li>
                    );
                  })}
              </ul>
            </nav>
          </div>
        </div>
      </div>
    </>
  );
}
