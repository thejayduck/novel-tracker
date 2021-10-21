import styles from "styles/Login.module.scss";

export default function FeatureItem({ title, children, icon }) {
  return (
    <div className={`${styles.featureItem} flex flexColumn flexRight`}>
      <i className={`${icon}`} />
      <h2> {title} </h2>
      <div className={styles.details}>
        <p> {children} </p>
      </div>
    </div>
  );
}
