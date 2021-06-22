import styles from '../../styles/components/ToolTip.module.css'
import React from 'react';

export default function ToolTip({ children, toolTip }) {
    const child = React.Children.only(children);

    return (
        <>
            {toolTip == undefined
                ? children :
                <div className={styles.toolTip}>
                    <div>
                        {child}
                        <i className="fas fa-question" />
                    </div>
                    <span className={styles.toolTipText}>{toolTip}</span>
                </div>
            }
        </>
    );
}