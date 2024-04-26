import axios from "axios";
import Cookies from "js-cookie";
import Link from "next/link";
import { useEffect, useState } from "react";

const INITIAL_NEW_TODO = {
  todo: "",
  description: "",
  priority: "",
  status: false,
  userId: "",
};

export default function ToDo({ user }) {
  const userId = user._id;
  INITIAL_NEW_TODO.userId = userId;

  const token = Cookies.get("token");

  const [toDos, setToDos] = useState();
  const [filteredToDos, setFilteredToDos] = useState([]);
  const [newToDo, setNewToDo] = useState(INITIAL_NEW_TODO);
  const [error, setError] = useState(null);
  const [message, setMessage] = useState(null);
  const [loading, setLoading] = useState(false);

  const getTodos = async () => {
    try {
      setLoading(true);
      const response = await axios.get("/api/toDos/todo");
      const todos = response.data.todos.toReversed();
      const filteredToDos1 = todos.filter((todo) => todo.status === false);
      if (response.data) {
        setToDos(todos);
        setFilteredToDos(filteredToDos1);
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
      setNewToDo(INITIAL_NEW_TODO);
      getTodos();
    } catch (err) {
      // console.log(err);
      setError(err.response.data.message);
    } finally {
      setLoading(false);
    }
  }

  async function handleToDoStatusChange(todoId, status) {
    try {
      setLoading(true);
      const url = `http://localhost:8080/api/user/changeToDoStatus`;
      const payload = { toDoId: todoId, status };
      const response = await axios.put(url, payload, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      getTodos();
    } catch (err) {
      // console.log(err);
      setError(err.response.data.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    getTodos();
  }, []);

  return (
    <>
      <div className="card shadow mb-4">
        <div className="card-header d-flex  ">
          <div className="col-6 py-2">
            <Link
              href={"/dashboard/todo"}
              className="text-primary fs-6 fw-bold m-0 "
            >
              Todo List
            </Link>
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
        <ul className="list-group list-group-flush">
          {toDos &&
            toDos.filter((todo) => todo.status === false).length === 0 && (
              <li className="list-group-item text-center">
                <h6 className="text-secondary">No Active Task.</h6>
              </li>
            )}
          {!toDos && !loading && (
            <li className="list-group-item text-center mt-2">
              <h6 className="text-secondary">No Active Task.</h6>
            </li>
          )}
          {toDos &&
            toDos
              .filter((todo) => todo.status === false)
              .slice(0, 4)
              .map((todo) => (
                <li key={todo._id} className="list-group-item">
                  <div className="row align-items-center no-gutters">
                    <div className="col me-2">
                      <h6 className="mb-0">
                        {(todo.status && (
                          <strong style={{ textDecoration: "line-through" }}>
                            {todo.todo}
                          </strong>
                        )) || <strong>{todo.todo}</strong>}
                      </h6>
                      <span className="text-xs">
                        {`${new Date(todo.createdAt).toLocaleTimeString({
                          hour: "numeric",
                          hour12: true,
                        })}, ${new Date(todo.createdAt).toDateString()}`}
                      </span>
                    </div>
                    <div className="col-auto">
                      <div className="form-check">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          id="formCheck-1"
                          {...(todo.status && { checked: true })}
                          onChange={(e) =>
                            handleToDoStatusChange(todo._id, e.target.checked)
                          }
                        />
                        <label className="form-check-label" />
                      </div>
                    </div>
                  </div>
                </li>
              ))}
          {!loading && filteredToDos.length > 4 && (
            <li className="list-group-item text-center">
              <a className="btn btn-link" href="/dashboard/todo">
                Show More
              </a>
            </li>
          )}
          {!toDos && loading && (
            <>
              <div className="d-flex justify-content-center py-3">
                <div className="spinner-border text-primary" role="status">
                  <span className="visually-hidden">Loading...</span>
                </div>
              </div>
            </>
          )}
        </ul>
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
    </>
  );
}
