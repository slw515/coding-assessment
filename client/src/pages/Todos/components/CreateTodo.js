import { Card, Heading } from "@chakra-ui/react";
import { useState } from "react";

import styles from "../Todos.module.css";

const CreateTodo = ({ createTodo }) => {
  const [todoTitle, setTodoTitle] = useState("");
  const [todoDescription, setTodoDescription] = useState("");

  return (
    <Card
      className={styles["createTodo"]}
      onSubmit={(e) => {
        e.preventDefault();
        if (todoTitle.trim === "") {
          console.error("Every new todo must contain a title.");
          return;
        }
        setTodoTitle("");
        setTodoDescription("");
        createTodo({
          title: todoTitle,
          description: todoDescription,
          completed: false,
        });
      }}
    >
      <Heading className={styles["createTodoTitle"]}>Create A New Todo</Heading>
      <form>
        <label>
          Title:
          <input
            type="text"
            name="title"
            onChange={(e) => setTodoTitle(e.target.value)}
          />
        </label>
        <label>
          Description:
          <textarea
            type="text"
            name="description"
            cols={48}
            onChange={(e) => setTodoDescription(e.target.value)}
          />
        </label>
        <input type="submit" value="Submit" />
      </form>
    </Card>
  );
};

export default CreateTodo;
