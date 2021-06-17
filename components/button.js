import styles from '../styles/components/Button.module.css'

export default function Button() {
    return (
        <div className={styles.newBook} onClick={() => alert("I have been pressed")}>
            <a title="Add New Book" className="fas fa-plus" />
        </div>
    );

}