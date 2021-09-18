import styles from "styles/components/BookCard.module.scss";

interface VolumeCardProps {
  data: {
    cover_url: string,
    title_native: string,
  },
}

export default function VolumeCard({ data }: VolumeCardProps) {
  return (
    <a className={styles.bookWrap}>
      <div className={styles.book}>
        <img width={200} height={300} src={data?.cover_url} />
      </div>
      < div className={styles.title} >
        <p>{data?.title_native}</p>
      </div>
    </a>
  );
}