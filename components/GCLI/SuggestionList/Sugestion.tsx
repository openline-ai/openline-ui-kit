import React, {KeyboardEventHandler, MouseEventHandler, useEffect, useRef } from 'react';
import '../gcli.css';
import {SuggestionType} from "./types";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faAt, faBuildingColumns, faMap, faUser} from "@fortawesome/free-solid-svg-icons";

type Props = {
    item: SuggestionType,
    active: boolean,
    onKeyDown: KeyboardEventHandler<HTMLDivElement>,
    onClick: MouseEventHandler<HTMLDivElement>,
    defaultAction: string | undefined // todo
};

export const Suggestion = ({ item, active, onKeyDown, onClick, defaultAction }: Props) => {
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (ref.current && active) {
            ref.current.focus();
        }
    }, [active]);

    return (
        <div
            tabIndex={0}
            ref={ref}
            className={`item ${active ? 'active' : ''} list_item`}
            role="listitem"
            onKeyDown={onKeyDown}
            onClick={onClick}
        >
            <div className='list_item_icon'>
                {
                    item.type === 'CONTACT' &&
                    <FontAwesomeIcon icon={faUser}/>
                }
                {
                    item.type === 'ORGANIZATION' &&
                    <FontAwesomeIcon icon={faBuildingColumns}/>
                }
                {
                    item.type === 'EMAIL' &&
                    <FontAwesomeIcon icon={faAt}/>
                }
                {
                    item.type === 'STATE' &&
                    <FontAwesomeIcon icon={faMap}/>
                }
            </div>
            <div className='list_item_text'>{item.display}</div>
            <div className="list_item_action">

<div></div>
<div>{defaultAction}</div>
            </div>
        </div>
    );
};