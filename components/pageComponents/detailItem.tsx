import styles from "styles/Book.module.scss";

import React from "react";

export default function DetailItem({ title, value }) {
  return (
    <div className={`${styles.detailItem}`}>
      <p title={title}>{title}</p>
      <span title={value} >{value}</span>
    </div>
  );
}
