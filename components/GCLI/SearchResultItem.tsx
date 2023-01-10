import React, {KeyboardEventHandler, MouseEventHandler, useEffect, useRef, useState} from 'react';
import { contacts, companies as companiesData, contracts as contractsData, type } from './data';
import './poc.css';
// import { ActionItem, ActionList } from './ActionList';

type Suggestion = {
    name: string,
    actions: string[]
};

type Props = {
    item: Suggestion,
    active: boolean,
    onKeyDown: KeyboardEventHandler<HTMLDivElement>,
    onClick: MouseEventHandler<HTMLDivElement>,
    defaultAction: string | undefined // todo
    actionMode: boolean // todo
};

export const AutocompleteResultItem = ({ item, active, onKeyDown, onClick, defaultAction, actionMode }: Props) => {
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (ref.current && active && !actionMode) {
            ref.current.focus();
        }
    }, [active, actionMode]);

    return (
        <div
            tabIndex={0}
            ref={ref}
            className={`item ${active ? 'active' : ''} list_item`}
            role="listitem"
            onKeyDown={onKeyDown}
            onClick={onClick}
        >
            {item.name}
            {!actionMode && (
                <span className="list_item--action">{defaultAction}</span>
            )}
        </div>
    );
};