import { useEffect, useState } from "react";
import axios from "axios";
import { Heading } from "@chakra-ui/react";

import Todo from "./components/Todo";
import CreateTodo from "./components/CreateTodo";
import styles from "./Todos.module.css";

const TodoPage = () => {
  const [todos, setTodos] = useState([]);
  const [shouldHideCompletedTodos, setShouldHideCompletedTodos] =
    useState(false);

  useEffect(() => {
    const fetchTodos = async () => {
      try {
        // Ideally, URI would not be hardcoded.
        const { data } = await axios.get("http://localhost:3001/todos");
        setTodos([...data]);
      } catch (err) {
        console.error(err);
      }
    };
    fetchTodos();
  }, []);

  const toggleTodoCompletedStatus = async (todoId) => {
    try {
      const todoToUpdate = todos.find((todo) => todoId === todo.id);
      await axios.put(`http://localhost:3001/todos/${todoId}`, {
        ...todoToUpdate,
        completed: !todoToUpdate.completed,
      });

      setTodos(
        todos.map((todo) => {
          if (todo.id === todoId) {
            return { ...todo, completed: !todo.completed };
          }
          return todo;
        })
      );
    } catch (err) {
      console.error(err);
    }
  };

  const editTodo = (updatedTodo) => {
    // Change edits within the React app when input changes while editing to avoid constant API calls.
    setTodos(
      todos.map((todo) => {
        if (todo.id === updatedTodo.id) {
          return { ...updatedTodo };
        }
        return todo;
      })
    );
  };

  const saveTodoEdits = async (updatedTodo) => {
    // Save edits to Firestore (either by clicking the submit edits button or the edit button again).
    try {
      await axios.put(`http://localhost:3001/todos/${updatedTodo.id}`, {
        ...updatedTodo,
      });
    } catch (err) {
      console.error(err);
    }
  };

  const deleteTodo = async (todoId) => {
    try {
      await axios.delete(`http://localhost:3001/todos/${todoId}`);
      setTodos(todos.filter((todo) => todo.id !== todoId));
    } catch (err) {
      console.error(err);
    }
  };

  const createTodo = async (newTodo) => {
    try {
      const { data } = await axios.post("http://localhost:3001/todos", {
        ...newTodo,
      });
      const updatedTodos = [...todos];
      updatedTodos.unshift(data);
      setTodos(updatedTodos);
    } catch (err) {
      console.error(err);
    }
  };

  // If the user has chosen to hide completed todos we must filter out the completed todos, else return all todos.
  const returnTodoListDependentOnHidingCompletedTodosStatus = () =>
    shouldHideCompletedTodos ? todos.filter((todo) => !todo.completed) : todos;

  return (
    <>
      <CreateTodo createTodo={createTodo} />
      <div className={styles["todosListHeader"]}>
        {todos.length === 0 ? (
          <Heading>Please add some todos to the list!</Heading>
        ) : (
          <>
            <Heading>My Todos:</Heading>
            <div className={styles["hideCompletedTodosToggle"]}>
              <label>
                <input
                  type="checkbox"
                  checked={shouldHideCompletedTodos}
                  onChange={() =>
                    setShouldHideCompletedTodos(!shouldHideCompletedTodos)
                  }
                />
                Hide completed todos
              </label>
            </div>
          </>
        )}
      </div>
      {returnTodoListDependentOnHidingCompletedTodosStatus().map((todo) => {
        return (
          <Todo
            key={todo.id}
            todo={todo}
            toggleCompletedStatus={toggleTodoCompletedStatus}
            editTodo={editTodo}
            deleteTodo={deleteTodo}
            saveTodoEdits={saveTodoEdits}
          />
        );
      })}
    </>
  );
};

export default TodoPage;
