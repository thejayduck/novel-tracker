import styles from "styles/components/Card.module.scss";

import { useApi } from "lib/clientHelpers";

import Card, { CardProps } from "./card";

export default function SearchCard({ data }: CardProps) {
  const api = useApi();
  return (
    <Card data={data} isClickable={true}>
      <a title="Add to Library" className={styles.editButton} onClick={() => api.addBook(data._id)}>
        <i className="bx bx-plus bx-sm" />
      </a>
    </Card>
  );
}
