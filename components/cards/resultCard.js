import styles from '../../styles/components/CardElement.module.css'

import CardElement from './cardElement';
import Button from '../ui/button';

export default function ResultCard({ entry, onClick, userInfo }) {
    return (
        <CardElement entry={entry}>
            <div
                className={styles.viewDetailsWrap}
                onClick={() => onClick(entry)}
            >
                <a className={styles.viewDetails} title="View Details">
                    View Details
                </a>
                {userInfo &&
                    <div className={styles.buttonWrap}>
                        <Button text="Add Book" icon="fas fa-fw fa-plus" onClick={(e) => {
                            window.alert("Unimplemented");
                            e.stopPropagation();
                        }} />
                    </div>
                }
            </div>
        </CardElement>
    );
}