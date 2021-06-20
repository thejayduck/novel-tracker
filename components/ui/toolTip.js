import styles from '../../styles/components/ToolTip.module.css'
import React from 'react';

export default function ToolTip({ children, toolTip }) {
    console.log(React.Children.count(children));

    const childMap = React.Children.map(children, child => {
        <addInfoIcon>
            {child}
        </addInfoIcon>
    });

    console.log(childMap)
    return (
        <>
            {toolTip == undefined
                ? children :
                <div class={styles.toolTip}>
                    {/* {childMap} */}
                    <span span className={styles.toolTipText}>{toolTip}</span>
                </div>
            }
        </>
    );
}

export function addInfoIcon({ children }) {
    return (
        <>
            {children}
            <i class="far fa-question-circle" />
        </>
    );

}