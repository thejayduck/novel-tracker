import styles from "styles/components/Card.module.scss";

import Card, { CardProps } from "./card";

export default function VolumeCard({ data }: CardProps) {
  return (
    <>
      <Card data={data} isClickable={false}>
        <div title="Reading" className={styles.readIndicator}>
          <span>Reading</span>
        </div>
      </Card>
    </>
  );
}
