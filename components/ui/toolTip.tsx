import styles from '../../styles/components/ToolTip.module.css'
import React from 'react';

export interface ToolTipProps {
    toolTip: string,
    children: React.ReactChild,
}

export default function ToolTip({ children, toolTip }: ToolTipProps) {
    const child = React.Children.only(children);

    return (
        <div className={styles.toolTip}>
            <div>
                {child}
                <i className="fas fa-fw fa-question" />
            </div>
            <span className={styles.toolTipText}>{toolTip}</span>
        </div>
    );
}