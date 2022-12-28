const firebase = require('../db');
const firestore = firebase.firestore();

const getTodos = async () => {
    try {        
        const {docs} = await firestore.collection('todos').get();
        console.log(docs);
        return docs;
    } catch(error) {
        throw new Error(error);
    }
}

const createTodo = () => {
    return new Promise(function (resolve, reject) {
        resolve(2);
    });
};

const updateTodo = () => {
    return new Promise(function (resolve, reject) {
        resolve(2);
    });
};

const deleteTodo = () => {
    return new Promise(function (resolve, reject) {
        resolve(2);
    });
};
  
module.exports = {
    getTodos,
    createTodo,
    updateTodo,
    deleteTodo
}