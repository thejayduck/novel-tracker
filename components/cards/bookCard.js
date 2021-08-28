import styles from '../../styles/components/BookCard.module.scss'

export default function BookCard({ data }) {
    return (
        <div className={styles.bookWrap}>
            <div className={styles.book}>
                <img className="skeleton" width={200} height={300} src={data.image} />
            </div>
            <div className={styles.title}>
                <span>{data.title}</span>
                {/* <div className={`skeleton skeletonText`} />
                <div className={`skeleton skeletonText`} /> */}
            </div>
        </div>
    );
}