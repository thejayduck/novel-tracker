import styles from '../../styles/components/BookCard.module.scss'

export default function BookCard({ data }) {
    return (
        <div className={styles.bookWrap}>
            <div className={styles.book}>
                <img width={200} height={300} src={data.image} />
            </div>
            <span>{data.title}</span>
        </div>
    );
}