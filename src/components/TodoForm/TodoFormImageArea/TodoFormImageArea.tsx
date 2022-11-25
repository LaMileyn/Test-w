import React, {FC, useRef, useState} from 'react';
import styles from './TodoFormImageArea.module.less';
import cn from "classnames";

import {ref, uploadBytes, getDownloadURL} from 'firebase/storage'
import {storage} from "../../../firebase";
import {nanoid} from "nanoid";

interface IProps {
    handleSetPhoto: (src: string) => void,
    initialPhoto: string | null
}

const TodoFormImageArea: FC<IProps> = ({handleSetPhoto, initialPhoto}) => {

    const [isDrag, setIsDrag] = useState(false)
    const [photo, setPhoto] = useState<string | null>(initialPhoto)

    const fileRef = useRef<HTMLInputElement>(null)

    const onDragStartHandler = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault()
        setIsDrag(true)
    }
    const onDragLeaveHandler = (e: React.DragEvent<HTMLDivElement>) => {
        setIsDrag(false)
    }
    const onDragDropHandler = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault()
        const file = e.dataTransfer.files[0];
        setNewImage(file)
        setIsDrag(false)

    }
    const setNewImage = (file: File) => {
        const imageRef = ref(storage, `images/${file.name + nanoid()}`)
        uploadBytes(imageRef, file)
            .then(data => getDownloadURL(ref(storage, data.metadata.fullPath)))
            .then(data => {
                handleSetPhoto(data)
                setPhoto(data)
            })
    }
    const handleChangePhoto = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files!;
        setNewImage(files[0])
    }

    return (
        <div>
            {photo
                ? <div className={styles.imageArea}>
                    <img src={photo} alt=""/>
                    <button type={"button"} onClick={() => fileRef?.current?.click()}>Изменить фото</button>
                    <button type={"button"} onClick={() => setPhoto(null)}>Удалить фото</button>
                </div>
                : <div className={cn(styles.inputArea, {[styles.active]: isDrag})} onDragStart={onDragStartHandler}
                       onDragOver={onDragStartHandler}
                       onDragLeave={onDragLeaveHandler}
                       onDrop={onDragDropHandler}
                >
                    <label  htmlFor="file__form" className={styles.label}>
                        <input ref={fileRef} hidden type="file" id={"file__form"} onChange={handleChangePhoto}/>
                    </label>
                    {!isDrag ? <p>Нажмите или перенесите файлы в заданную область</p>
                        : <p>Отпустите чтобы загрузить изображение</p>}
                </div>

            }
        </div>
    );
}

export default TodoFormImageArea;