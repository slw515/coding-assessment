import { useEffect } from "react";
import axios from 'axios';

const TodoList = () => {
    useEffect(() => {
        const fetchTodos = async () => {
            const { data } = await axios.get('http://localhost:3001/todos');
            console.log(data);
        }
        fetchTodos();
    }, [])

    return <></>
}

export default TodoList;