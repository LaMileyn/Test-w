import React, {Dispatch, FC, SetStateAction} from 'react';
import styles from './Header.module.less';

interface IProps {
    setShowForm : Dispatch<SetStateAction<boolean>>,
    showForm : boolean
}

const Header: FC<IProps> = ({ showForm, setShowForm}) => {
    return (
        <div className={styles.header}>
            <h1>TodoList</h1>
            {
                !showForm && <button
                    onClick={ () => setShowForm(true)}
                    className={styles.btn}>Создать todo</button>
            }
        </div>
    );
}

export default Header;