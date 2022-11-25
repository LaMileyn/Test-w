import React, {FC, useState} from 'react';
import {ITodo} from "../../../types/todo";
import cn from 'classnames'
import dayjs from "dayjs";
import styles from './TodoListItem.module.less'
import TodoForm from "../../TodoForm/TodoForm";

interface IProps {
    todo: ITodo,
    updateTodo: (data: Omit<ITodo, "id" | "done">, id: string) => void,
    deleteTodo: (id: string) => void,
    changeTodoDone: (todo: ITodo) => void,
}


const TodoListItem: FC<IProps> = ({todo, updateTodo, changeTodoDone, deleteTodo}) => {

    const [isEdit, setIsEdit] = useState(false);

    const handleUpdate = (data: Omit<ITodo, "id" | "done">) => {
        updateTodo(data, todo.id)
        setIsEdit(false)
    }

    return (
        isEdit
            ? <TodoForm successCb={handleUpdate} initialData={todo} cancelCb={() => setIsEdit(false)}/>
            : <div className={cn(styles.todoItem, {
                [styles.done]: todo.done
            })}>
                <div className={styles.todoItem__top}>
                    <div>
                        <input type="checkbox" checked={todo.done} onChange={() => changeTodoDone(todo)}/>
                        <span>{todo.title}</span>
                    </div>
                    <span className={cn({
                        [styles.todoItem__outOfDate] : new Date().getTime() >= new Date(todo.endDate).getTime()
                    })}>{dayjs(todo.endDate).format("YYYY-MM-DD")}</span>
                </div>
                <div className={styles.todoItem__description}>
                    <p>Описание: {todo.description}</p>
                </div>

                {
                    todo.photo.length > 0 && <div className={styles.todoItem__photo}>
                        <img src={todo.photo} alt=""/>
                    </div>
                }
                <div className={styles.controls}>
                    <button className={cn(styles.edit, styles.btn)} onClick={() => setIsEdit(true)} disabled={todo.done}>
                        Изменить
                    </button>
                    <button className={cn(styles.delete, styles.btn)} onClick={() => deleteTodo(todo.id)}>
                        Удалить
                    </button>
                </div>
            </div>

    );
}

export default TodoListItem;