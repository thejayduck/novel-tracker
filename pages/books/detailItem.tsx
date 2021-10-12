import styles from "styles/Book.module.scss";

import React from "react";

export function DetailItem({ title, value }) {
  return (
    <div className={`${styles.detailItem}`}>
      <h3>{title}</h3>
      <span>{value}</span>
    </div>
  );
}
