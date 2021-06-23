import styles from '../../styles/components/ToolTip.module.css'
import React from 'react';

export interface ToolTipProps {
    toolTip: string,
    children: React.ReactChild,
}

export default function ToolTip({ children, toolTip }: ToolTipProps) {
    return (
        <div className={styles.toolTip}>
            <div>
                {children}
                <i className="fas fa-question" />
            </div>
            <span className={styles.toolTipText}>{toolTip}</span>
        </div>
    );
}