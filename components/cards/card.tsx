import styles from "styles/components/Card.module.scss";

import { PropsWithChildren } from "react";


export interface CardProps {
  data: {
    _id: any,
    cover_url: string,
    title_native: string,
  },
  isClickable?: boolean,
}

export default function Card({ data, children, isClickable }: PropsWithChildren<CardProps>) {

  return (
    <div className={styles.bookWrap}>
      <a className={styles.book} href={isClickable ? `/books/${data._id}` : "#"}>
        <img className="skeleton" width={200} height={300} src={data?.cover_url || "https://dummyimage.com/200x300/000/ffffff.png&text=+No+Cover"} />
      </a>
      {isClickable && <a className={styles.title} href={`/books/${data._id}`}>
        <p>{data?.title_native}</p>
      </a>}
      {children}
    </div>
  );
}
