import styles from "styles/components/Card.module.scss";

interface CardProps {
  data: {
    cover_url: string,
    title_native: string,
  },
}

export default function Card({ data }: CardProps) {
  return (
    <a className={styles.bookWrap}>
      <div className={styles.book}>
        <img className="skeleton" width={200} height={300} src={data?.cover_url || "https://dummyimage.com/200x300/000/ffffff.png&text=+No+Cover"} />
      </div>
      <div className={styles.title} >
        <p>{data?.title_native}</p>
      </div>
      <a title="Add to Library" className={styles.editButton}><i className="bx bx-plus bx-sm"/></a>
    </a>
  );
}