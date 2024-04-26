"use client";

import "@/app/dashboard.min.css";
import axios from "axios";
import Cookies from "js-cookie";
import Script from "next/script";
import { useEffect, useState } from "react";

const INITIAL_NEW_TODO = {
  todo: "",
  description: "",
  priority: "",
  status: false,
  userId: "",
};

const INITIAL_DELETE_TODO = {
  todoId: "",
  userId: "",
};

export default function Todo() {
  const [user, setUser] = useState();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);

  const token = Cookies.get("token");

  const [toDos, setToDos] = useState();
  const [newToDo, setNewToDo] = useState(INITIAL_NEW_TODO);

  const getUser = async () => {
    try {
      setLoading(true);
      const response = await fetch("/api/users/user", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (response) {
        const userData = await response.json();
        const { user } = userData;
        if (user) {
          setUser(user);
          INITIAL_NEW_TODO.userId = user._id;
          INITIAL_DELETE_TODO.userId = user._id;
        }
      }
    } catch (err) {
      // console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const getTodos = async () => {
    try {
      // setLoading(true);
      const response = await axios.get("/api/toDos/todo");
      const todos = response.data.todos.toReversed();
      const filteredToDos1 = todos.filter((todo) => todo.status === false);
      if (response.data) {
        setToDos(todos);
      }
    } catch (err) {
      // console.log(err);
    } finally {
      setLoading(false);
    }
  };

  function handleToDoChange(e) {
    const { name, value } = e.target;
    setNewToDo((prev) => ({ ...prev, [name]: value }));
  }

  async function handleToDoSubmit(e) {
    e.preventDefault();
    try {
      setLoading(true);
      setError(null);
      setMessage(null);
      const url = "http://localhost:8080/api/user/postToDo";
      const payload = newToDo;
      const response = await axios.post(url, payload, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setMessage(response.data.message);
      setNewToDo((prev) => ({ ...prev, todo: "", description: "" }));
      getTodos();
    } catch (err) {
      setError(err.response.data.message);
    } finally {
      setLoading(false);
    }
  }

  async function handleToDoStatusChange(todoId, status) {
    try {
      //   setLoading(true);
      const url = `http://localhost:8080/api/user/changeToDoStatus`;
      const payload = { toDoId: todoId, status };
      const response = await axios.put(url, payload, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      getTodos();
    } catch (err) {
      setError(err.response.data.message);
    } finally {
      setLoading(false);
    }
  }

  async function handleToDoDelete(todoId) {
    try {
      const url = `http://localhost:8080/api/user/deleteTodo`;
      const payload = { todoId: todoId, userId: user._id };
      const response = await axios.post(url, payload, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      getTodos();
    } catch (err) {
      setError(err.response.data.message);
    }
  }

  useEffect(() => {
    getUser();
    getTodos();
  }, []);

  return (
    <>
      <div className="col-lg-12 ">
        <div className="row mx-3">
          <div className="col">
            <div className="card shadow mb-3">
              <div className="card-header d-flex py-3">
                <div className="col-6 text-Start">
                  <h2>Todo</h2>
                </div>
                <div className="col-6 text-end">
                  <button
                    className="btn text-secondary fw-bold m-0"
                    data-bs-toggle="modal"
                    data-bs-target="#toDoModal"
                  >
                    Add Task
                  </button>
                </div>
              </div>
              <div className="card-body">
                <div className="row">
                  <p className="fs-5 fw-bold">Todo Data</p>
                </div>
                {loading && (
                  <>
                    <div className="d-flex justify-content-center text-center">
                      <div
                        className="spinner-border text-primary"
                        role="status"
                      >
                        <span className="visually-hidden">Loading...</span>
                      </div>
                    </div>
                  </>
                )}
                {!loading && (
                  <>
                    <div className="accordion" id="accordionExample">
                      <div className="accordion-item">
                        <h2 className="accordion-header">
                          <button
                            className="accordion-button collapsed fs-5 fw-bolder"
                            type="button"
                            data-bs-toggle="collapse"
                            data-bs-target="#collapseTwo"
                            aria-expanded="false"
                            aria-controls="collapseTwo"
                          >
                            Active Tasks
                          </button>
                        </h2>
                        <div
                          id="collapseTwo"
                          className="accordion-collapse collapse"
                          data-bs-parent="#accordionExample"
                        >
                          <div className="accordion-body">
                            {!toDos && (
                              <li className="list-group-item text-center">
                                <h6 className="text-secondary">
                                  No Active Task.
                                </h6>
                              </li>
                            )}
                            {toDos &&
                              toDos.filter((todo) => todo.status === false)
                                .length === 0 && (
                                <li className="list-group-item text-center">
                                  <h6 className="text-secondary">
                                    No Active Task.
                                  </h6>
                                </li>
                              )}
                            {toDos &&
                              toDos
                                .filter((todo) => todo.status === false)
                                .map((todo) => (
                                  <li
                                    key={todo._id}
                                    className="list-group-item"
                                  >
                                    <div className="row align-items-center no-gutters">
                                      <div className="col me-2">
                                        <h6 className="mb-0">
                                          {(todo.status && (
                                            <strong
                                              style={{
                                                textDecoration: "line-through",
                                              }}
                                            >
                                              {todo.todo}
                                            </strong>
                                          )) || <strong>{todo.todo}</strong>}
                                        </h6>
                                        <span className="text-xs">
                                          {`${new Date(
                                            todo.createdAt
                                          ).toLocaleTimeString({
                                            hour: "numeric",
                                            hour12: true,
                                          })}, ${new Date(
                                            todo.createdAt
                                          ).toDateString()}`}
                                        </span>
                                      </div>
                                      <div className="col-auto">
                                        <div className="form-check">
                                          <input
                                            className="form-check-input"
                                            type="checkbox"
                                            id="formCheck-1"
                                            {...(todo.status && {
                                              checked: true,
                                            })}
                                            onChange={(e) =>
                                              handleToDoStatusChange(
                                                todo._id,
                                                e.target.checked
                                              )
                                            }
                                          />
                                          <label className="form-check-label" />
                                        </div>
                                      </div>
                                    </div>
                                  </li>
                                ))}
                          </div>
                        </div>
                      </div>
                      <div className="accordion-item">
                        <h2 className="accordion-header">
                          <button
                            className="accordion-button collapsed fs-5 fw-bolder"
                            type="button"
                            data-bs-toggle="collapse"
                            data-bs-target="#collapseThree"
                            aria-expanded="false"
                            aria-controls="collapseThree"
                          >
                            Finished Tasks
                          </button>
                        </h2>
                        <div
                          id="collapseThree"
                          className="accordion-collapse collapse"
                          data-bs-parent="#accordionExample"
                        >
                          <div className="accordion-body">
                            {!toDos && (
                              <li className="list-group-item text-center">
                                <h6 className="text-secondary">
                                  No Finished Task.
                                </h6>
                              </li>
                            )}
                            {toDos &&
                              toDos.filter((todo) => todo.status === true)
                                .length === 0 && (
                                <li className="list-group-item text-center">
                                  <h6 className="text-secondary">
                                    No Finished Task.
                                  </h6>
                                </li>
                              )}
                            {toDos &&
                              toDos
                                .filter((todo) => todo.status === true)
                                .map((todo) => (
                                  <li
                                    key={todo._id}
                                    className="list-group-item"
                                  >
                                    <div className="row align-items-center no-gutters">
                                      <div className="col me-2">
                                        <h6 className="mb-0">
                                          <strong>{todo.todo}</strong>
                                        </h6>
                                        <span className="text-xs">
                                          {`${new Date(
                                            todo.updatedAt
                                          ).toLocaleTimeString({
                                            hour: "numeric",
                                            hour12: true,
                                          })}, ${new Date(
                                            todo.updatedAt
                                          ).toDateString()}`}
                                        </span>
                                      </div>
                                      <div className="col-auto d-flex">
                                        <div className="form-check">
                                          <input
                                            className="form-check-input"
                                            type="checkbox"
                                            id="formCheck-1"
                                            {...(todo.status && {
                                              checked: true,
                                            })}
                                            onChange={(e) =>
                                              handleToDoStatusChange(
                                                todo._id,
                                                e.target.checked
                                              )
                                            }
                                          />
                                          <label className="form-check-label" />
                                        </div>
                                        <div className="">
                                          <button
                                            type="button"
                                            className="btn-close"
                                            onClick={(e) => {
                                              e.preventDefault();
                                              handleToDoDelete(todo._id);
                                            }}
                                          ></button>
                                        </div>
                                      </div>
                                    </div>
                                  </li>
                                ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* add todo modal */}
      <div
        className="modal fade"
        id="toDoModal"
        tabIndex="-1"
        aria-labelledby="toDoModal"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Add Task
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
                onClick={() => {
                  setError(null);
                  setMessage(null);
                }}
              ></button>
            </div>
            <div className="modal-body">
              {error && (
                <div className="alert alert-danger" role="alert">
                  {error}
                </div>
              )}
              {message && (
                <div className="alert alert-success" role="alert">
                  {message}
                </div>
              )}
              <form onSubmit={handleToDoSubmit}>
                <div className="mb-3">
                  <label className="form-label" htmlFor="name">
                    <strong>ToDo:</strong>
                  </label>
                  <input
                    onChange={handleToDoChange}
                    className="form-control"
                    type="text"
                    id="name"
                    value={newToDo.todo}
                    placeholder="Task Name"
                    name="todo"
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label" htmlFor="name">
                    <strong>Description:</strong>
                  </label>
                  <input
                    onChange={handleToDoChange}
                    className="form-control "
                    type="text"
                    id="description"
                    placeholder="Description"
                    value={newToDo.description}
                    name="description"
                  />
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
                onClick={() => {
                  setError(null);
                  setMessage(null);
                }}
              >
                Close
              </button>
              <form onSubmit={handleToDoSubmit}>
                <button type="submit" className="btn btn-primary">
                  {(loading && (
                    <div
                      className="spinner-border spinner-border-sm"
                      role="status"
                    >
                      <span className="visually-hidden">Loading...</span>
                    </div>
                  )) ||
                    "Add Task"}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
      {/* add todo modal close */}
      <Script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js"></Script>
    </>
  );
}
