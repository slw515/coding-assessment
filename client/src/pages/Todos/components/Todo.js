import {
  Card,
  CardHeader,
  CardBody,
  Text,
  IconButton,
  Input,
  Button,
} from "@chakra-ui/react";
import { DeleteIcon, EditIcon } from "@chakra-ui/icons";
import { useState } from "react";

import styles from "../Todos.module.css";

const Todo = ({
  todo,
  toggleCompletedStatus,
  editTodo,
  deleteTodo,
  saveTodoEdits,
}) => {
  const { id, title, description, completed } = todo;

  const [isEditingTodo, setIsEditingTodo] = useState(false);

  const returnCompletedStyles = () =>
    completed ? `${styles["title"]} ${styles["completed"]}` : styles["title"];

  const onEditButtonOrSaveEditButtonClick = () => {
    if (isEditingTodo) {
      saveTodoEdits(todo);
    }

    setIsEditingTodo(!isEditingTodo);
  };

  return (
    <Card className={styles["todoCardContainer"]}>
      <CardHeader className={styles["todoHeaderContainer"]}>
        {isEditingTodo ? (
          <Input
            value={title}
            type={"text"}
            aria-label="Update todo title"
            onChange={(e) => editTodo({ ...todo, title: e.target.value })}
          />
        ) : (
          <Text className={returnCompletedStyles()}>{title}</Text>
        )}
        <div className={styles["todoCompletedCheckbox"]}>
          <label>
            <input
              type="checkbox"
              checked={completed}
              onChange={() => toggleCompletedStatus(id)}
            />
            Todo completed
          </label>
        </div>
        <IconButton
          colorScheme="blue"
          aria-label="Edit todo"
          icon={<EditIcon />}
          onClick={() => onEditButtonOrSaveEditButtonClick()}
        />
        <IconButton
          colorScheme="red"
          aria-label="Delete todo"
          icon={<DeleteIcon />}
          onClick={() => deleteTodo(id)}
        />
      </CardHeader>
      <CardBody>
        {isEditingTodo ? (
          <Input
            value={description}
            aria-label="Update todo description"
            type={"text"}
            onChange={(e) => editTodo({ ...todo, description: e.target.value })}
          />
        ) : (
          <Text size={"sm"} className={returnCompletedStyles()}>
            {description}
          </Text>
        )}
        {isEditingTodo && (
          <Button onClick={() => onEditButtonOrSaveEditButtonClick()}>
            Save Edits
          </Button>
        )}
      </CardBody>
    </Card>
  );
};

export default Todo;
