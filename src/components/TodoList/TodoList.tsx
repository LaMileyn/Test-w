import React, {FC} from 'react';
import {ITodo} from "../../types/todo";
import TodoListItem from "./TodoListItem/TodoListItem";
import styles from './TodoList.module.less';

interface IProps {
    todos: ITodo[],
    updateTodo: (data: Omit<ITodo, "id" | "done">, id: string) => void,
    deleteTodo: (id: string) => void,
    changeTodoDone: (todo : ITodo) => void,
}

const TodoList: FC<IProps> = ({todos, deleteTodo, changeTodoDone, updateTodo}) => {
    return (
        <div className={styles.todoList}>
            {todos.map(todo => <TodoListItem
                todo={todo}
                key={todo.id}
                deleteTodo={deleteTodo}
                updateTodo={updateTodo}
                changeTodoDone={changeTodoDone}
            />)}
            { todos.length === 0 && <p>Список дел пуст</p>}
        </div>
    );
}

export default React.memo(TodoList);