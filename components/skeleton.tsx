import styles from "styles/components/Skeleton.module.scss";

export interface SkeletonProps {
  count?: number
}

export function Skeleton({count = 1}: SkeletonProps){
  return (
    <span className={styles.skeletonText}>

    </span>
  );
}