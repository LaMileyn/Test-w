import {useCallback, useEffect, useState} from "react";
import {ITodo} from "./types/todo";
import {nanoid} from "nanoid";
import TodoForm from "./components/TodoForm/TodoForm";
import TodoList from "./components/TodoList/TodoList";
import Header from "./components/Header/Header";
import {db} from './firebase'
import {query, collection, onSnapshot, updateDoc, deleteDoc, addDoc, doc} from 'firebase/firestore'
import './styles/main.less'

const App = () => {

    const [todos, setTodos] = useState<ITodo[]>([])
    const [showForm, setShowForm] = useState(false)

    /**
     *  Устанавливаем связь
     */
    useEffect(() => {
        const q = query(collection(db, "todos"))
        const unsubsribe = onSnapshot(q, (snapshot) => {
            const arr: ITodo[] = [];
            snapshot.forEach(d => arr.push({...d.data() as ITodo, id: d.id}))
            setTodos(arr)
        })
        return () => unsubsribe()
    }, [])

    /**
     *  Функция для создания todo
     */
    const createTodo = useCallback(async (data: Omit<ITodo, "id" | "done">) => {
        const newTodo = {
            ...data, id: nanoid(), done: false
        }
        await addDoc(collection(db, "todos"), newTodo)
        setShowForm(false)
    }, [])

    /**
     *  Функция для изменения в todo состояния "выполнен"
     */
    const changeTodoDone = useCallback(async (todo: ITodo) => {
        await updateDoc(doc(db, "todos", todo.id), {
            done: !todo.done
        } as Partial<ITodo>)
    }, [])

    /**
     *  Функция для изменения todo
     */
    const updateTodo = useCallback(async (data: Omit<ITodo, "id" | "done">, id: string) => {
        await updateDoc(doc(db, "todos", id), {
            ...data
        })
    }, [])

    /**
     *  Функция для удаления todo
     */
    const deleteTodo = useCallback(async (id: string) => {
        await deleteDoc(doc(db, 'todos', id))
    }, [])

    return (
        <div className="App">
            <Header setShowForm={setShowForm} showForm={showForm}/>
            {showForm && <TodoForm successCb={createTodo} cancelCb={ () => setShowForm(false)}/>}
            <TodoList todos={todos}
                      deleteTodo={deleteTodo}
                      updateTodo={updateTodo}
                      changeTodoDone={changeTodoDone}
            />
        </div>
    );
}

export default App;
