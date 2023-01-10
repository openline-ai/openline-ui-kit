
// @ts-ignore
import React, {useEffect, useRef} from "react";

// @ts-ignore
export const ActionItem = ({ action, active, onKeyDown,}) => {
    const ref = useRef(null)
    console.log('ACTIVE', active)
    useEffect(() => {
        if(ref.current) {
            if(active) {
                ref.current?.focus()
            }
        }
    },[active])

    return (
        <li
            tabIndex={0}
            ref={ref}
            className={`list_item`}
            onClick={() => console.log('EXECUTING ACTION')}
            role="listitem"
            onKeyDown={onKeyDown}
        >
            {action}
        </li>
    )
};
// @ts-ignore
export const ActionList = ({ actionOptions, active, onKeyDown}) => {
    return (
        <ul style={{padding: '0', margin: '0', width: '50%'}} role={'listbox'} >
            {actionOptions.map(action => (
                <ActionItem
                    onKeyDown={onKeyDown}
                    action={action}
                    active={active}
                    key={action}/>
            ))}
        </ul>
    )
};