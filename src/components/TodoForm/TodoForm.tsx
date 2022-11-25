import React, { FC, useState} from 'react';
import styles from './TodoForm.module.less'
import {ITodo} from "../../types/todo";
import TodoFormImageArea from "./TodoFormImageArea/TodoFormImageArea";

interface IProps {
    successCb : (data : Omit<ITodo, "id" | "done">) => void,
    cancelCb : () => void,
    initialData? : Omit<ITodo, "id" | "done">
}

const initial: Omit<ITodo, "id" | "done"> = {
    description: "",
    endDate: "",
    title: "",
    photo : ""
}

const TodoForm: FC<IProps> = ({cancelCb, initialData,successCb }) => {

    const [state, setState] = useState(initialData ?? initial)
    const [validateError,setValidateError] = useState<string | null>(null)

    const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        setValidateError(null)
        const {name, value} = e.target;
        setState({...state, [name]: value})
    }

    const handleSetPhoto = (photo : string) =>{
        setState({...state,photo})
    }
    const handleSubmit = (e : React.FormEvent<HTMLFormElement>) =>{
        e.preventDefault()
        const isValid = state.title.trim().length > 0
            && state.description.trim().length > 0
            && state.endDate.trim().length > 0
        if (isValid) {
            setState(initial)
            successCb(state)
        }
        else{
            setValidateError("Пожалуйста, проверьте, что поля заполнены верно!")
        }
    }

    return (
        <form className={styles.form} onSubmit={handleSubmit}>
            <div className={styles.form__field}>
                <label htmlFor="title">Заголовок</label>
                <input id={"title"}
                       name={"title"}
                       value={state.title}
                       type="text"
                       onChange={handleChangeInput}
                       placeholder={"Введите заголовок"}/>
            </div>
            <div className={styles.form__field}>
                <label htmlFor="desc">Описание</label>
                <input id={"desc"}
                       name={"description"}
                       type="text"
                       value={state.description}
                       onChange={handleChangeInput}
                       placeholder={"Введите описание"}/>
            </div>
            <div className={styles.form__field}>
                <label htmlFor="date">Дата окончания</label>
                <input id={"date"}
                       name={"endDate"}
                       type="date"
                       value={state.endDate}
                       onChange={handleChangeInput}
                       placeholder={"Введите дату окончания"}/>
            </div>
            <div className={styles.form__field}>
                <label htmlFor="date">Фото ( не обязательно )</label>
                <TodoFormImageArea handleSetPhoto={handleSetPhoto} initialPhoto={state.photo} />
            </div>
            { validateError && <p className={styles.form__error}>{validateError}</p> }
            <button type={"submit"} className={styles.form__createBtn}>{ initialData ? "Изменить" : "Создать"}</button>
            <button type={"button"} onClick={cancelCb} className={styles.form__cancelBtn}>Отмена</button>
        </form>
    );
}

export default TodoForm;