import styles from "styles/components/Card.module.scss";

import { useApi } from "lib/clientHelpers";

interface CardProps {
  data: {
    _id: any,
    cover_url: string,
    title_native: string,
  },
  hasAddButton: boolean,
}

export default function Card({ data, hasAddButton }: CardProps) {
  const api = useApi();
  return (
    <div className={styles.bookWrap}>
      <a className={styles.book} href={`/books/${data._id}`}>
        <img className="skeleton" width={200} height={300} src={data?.cover_url || "https://dummyimage.com/200x300/000/ffffff.png&text=+No+Cover"} />
      </a>
      <a className={styles.title} href={`/books/${data._id}`}>
        <p>{data?.title_native}</p>
      </a>
      
      {hasAddButton &&
        <a title="Add to Library" className={styles.editButton} onClick={() => api.addBook(data._id)}>
          <i className="bx bx-plus bx-sm" />
        </a>
      }
    </div>
  );
}