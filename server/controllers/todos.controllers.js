const firebase = require("../firestore_db");
const firestore = firebase.firestore();

const getTodos = async () => {
  try {
    const { docs } = await firestore.collection("todos").get();
    return docs.map((todoDoc) => {
      const todo = todoDoc.data();
      const id = todoDoc.id;
      return { id, ...todo };
    });
  } catch (error) {
    throw new Error(error);
  }
};

const createTodo = async (newTodo) => {
  try {
    const res = await firestore.collection("todos").add({
      ...newTodo,
    });
    return { ...newTodo, id: res.id };
  } catch (error) {
    throw new Error(error);
  }
};

const updateTodo = async (updatedTodo) => {
  try {
    await firestore.collection("todos").doc(updatedTodo.id).update(updatedTodo);
    return "Successfully updated todo!";
  } catch (error) {
    throw new Error(error);
  }
};

const deleteTodo = async (todoId) => {
  try {
    await firestore.collection("todos").doc(todoId).delete();
    return "Successfully deleted todo!";
  } catch (error) {
    throw new Error(error);
  }
};

module.exports = {
  getTodos,
  createTodo,
  updateTodo,
  deleteTodo,
};
