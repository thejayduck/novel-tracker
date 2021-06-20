import styles from '../../styles/components/ToolTip.module.css'
import React from 'react';

export default function ToolTip({ children, toolTip }) {
    const child = React.Children.only(children);

    return (
        <>
            {toolTip == undefined
                ? children :
                <div className={styles.toolTip}>
                    {child}
                    <i className="far fa-question-circle" />
                    <span className={styles.toolTipText}>{toolTip}</span>
                </div>
            }
        </>
    );
}