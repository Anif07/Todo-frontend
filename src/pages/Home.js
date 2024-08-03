import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaRegCircle, FaRegCircleCheck } from "react-icons/fa6";
import { RiDeleteBin6Line } from "react-icons/ri";
import { HiMiniPencilSquare } from "react-icons/hi2";
import "../styles/todos.css";
import Navbar from "../components/navbar";
const Home = ({ token }) => {
  const [todos, setTodos] = useState([]);
  const [title, setTitle] = useState("");
  const [isUpdating, setIsUpdating] = useState(false);
  const [updatingId, setUpdatingId] = useState("");
  const api = "http://localhost:8080/todos";

  const fetchTodos = async () => {
    const response = await axios.get(api, {
      headers: { Authorization: `Bearer ${token}` },
    });
    setTodos(response.data);
  };

  useEffect(() => {
    fetchTodos();
  }, [token]);

  const handleInput = (e) => {
    setTitle(e.target.value);
  };

  const handleAddTodo = async (e) => {
    e.preventDefault();
    if (!title.trim()) return;
    const response = await axios.post(
      api,
      { title },
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    fetchTodos();
    setTitle("");
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${api}/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchTodos();
    } catch (error) {
      console.error("Error deleting todo:", error);
    }
  };

  const handleUpdate = async (id, title, isCompleted) => {
    try {
      await axios.put(
        `${api}/${id}`,
        { title: title, isCompleted: isCompleted },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      fetchTodos();
    } catch (error) {
      console.error("Error updating todo:", error);
    }
  };

  const modifyHandle = async (id, title) => {
    setTitle(title);
    setIsUpdating(true);
    setUpdatingId(id);
  };

  const cancelHandle = () => {
    setTitle("");
    setIsUpdating(false);
  };

  const updateButton = async (e) => {
    e.preventDefault();
    try {
      const todo = todos.find((todo) => todo._id === updatingId);
      await handleUpdate(updatingId, title, todo.isCompleted);
      setTitle("");
      setIsUpdating(false);
    } catch (error) {
      console.error("Error updating todo:", error);
    }
  };

  return (
    <>
      {" "}
      <Navbar />
      <div>
        <div className="main-cont">
          <h1>Todo List</h1>
          <div className="todo-cont">
            <div>
              <form
                onSubmit={isUpdating ? updateButton : handleAddTodo}
                className="form"
              >
                <input
                  name="todo"
                  placeholder="Enter Task"
                  value={title}
                  onChange={handleInput}
                  className="toto-input"
                />
                <div>
                  {isUpdating ? (
                    <>
                      <button
                        type="button"
                        onClick={cancelHandle}
                        className="btn cancel-btn"
                      >
                        Cancel
                      </button>
                      <button type="submit" className="btn update-btn">
                        Update
                      </button>
                    </>
                  ) : (
                    <button type="submit" className="btn add-btn">
                      Add
                    </button>
                  )}
                </div>
              </form>
            </div>
            <div className="todos-cont">
              {todos.map((obj, index) => (
                <div className="task" key={index}>
                  <div
                    className="check"
                    onClick={() =>
                      handleUpdate(obj._id, obj.title, !obj.isCompleted)
                    }
                  >
                    {obj.isCompleted ? <FaRegCircleCheck /> : <FaRegCircle />}
                  </div>
                  <p
                    className={
                      obj.isCompleted ? "completed-todo" : "incomplete-todo"
                    }
                  >
                    {obj.title}
                  </p>
                  <div
                    className="update"
                    onClick={() => modifyHandle(obj._id, obj.title)}
                  >
                    <HiMiniPencilSquare />
                  </div>
                  <div className="delete" onClick={() => handleDelete(obj._id)}>
                    <RiDeleteBin6Line />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
