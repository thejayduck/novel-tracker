import styles from '@styles/components/BookCard.module.scss'

export default function BookCard({ data }) {
    return (
        <a className={styles.bookWrap}>
            <div className={styles.book}>
                <img className="skeleton" width={200} height={300} src={data.image} />
            </div>
            <div className={styles.title}>
                <p>{data.title}</p>
                {/* <div className={`skeleton skeletonText`} />
                <div className={`skeleton skeletonText`} /> */}
            </div>
        </a>
    );
}