//@ts-nocheck
import React, {KeyboardEventHandler, useEffect, useRef, useState} from 'react';

import {contacts} from "./data";
import {getSuggestions} from "./poc_only_helpers";
import {SuggestionList} from "./SuggestionList";
import {GCLIInputMode} from "./types";
import './poc.css'

// TODO
// Filtering:
// 1. executing filter action on enter is liniting next filter options to specific context eg. organisation
// 2. executing filter action on comma is grouping objects, no action executed (allows to execute action on all of those objects)
// objects should be initially of the same type


export const GCLIInput = () => {
    // TODO action simulation to be removed!
    const [context, setContext] = useState({
        context: 'main page',
        type: 'page',
        filters: []
    });

    const [mode, setMode] = useState<GCLIInputMode>('default');
    // todo use input value to create fill in effect on navigate through results by keyboard ??? do we even need that? is this a proper use case
    const [inputValue, setInputValue] = useState('');
    const [query, setQuery] = useState('');
    // todo change name - this is for the options that are already selected
    const [selectedOptions, setSelectedOptions] = useState<Array<string>>([]);
    const [suggestions, setSuggestions] = useState<Array<any>>([]);
    const [messageRecipients, setMessageRecipients] = useState(contacts);
    const [messageMode, setMessageMode] = useState(false);
    const [displayAction, setDisplayActions] = useState(false);
    const [highlightedIndex, setHighlightedIndex] = useState(-1);
    const [selectedAction, setSelectedAction] = useState(-1);

    const inputRef = useRef(null)


    // TODO CLEAN UP ^ V
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const dropdownRef = React.useRef(null);

    const handleDropdownToggle = () => {
        setDropdownOpen(!dropdownOpen);
    };

    const handleQueryChange = (option) => {
        setInputValue(option);
        setQuery(option);
    }

    useEffect(() => {
        if(!query) {
            setSuggestions([])
        }else {
            setSuggestions(getSuggestions(query))

        }
    },[query])


    const sendMessage = (recipient:any, message:string) => {
        // Send the message to the recipient here
        console.log(`Sending message "${message}" to ${recipient.name}`);
        setMessageMode(false)
        setMessageRecipients(contacts)
    }

    // HANDLERS FOR GENERAL ACTIONS

    const handleSearchResultSelect = (name:string, defaultAction:string) => {
        setSelectedOptions([...selectedOptions, name])
        setContext({...context, context: name, type: defaultAction === 'Open' ? 'Preview' :  'Filtered list'})

    }

    // END HANDLERS FOR GENERAL ACTIONS

    const handleInputChange = (event: any) => {

        const { value } = event.target;
        handleQueryChange(value)


        // Check if the input value matches the pattern "lorem ipsum -> Jane Doe"
        const messageRegex = /^[\d\D]*(\\to)/;
        const recipientRegex = /\\to\s+(.+)/;

        const messageMatch = value.match(messageRegex);
        const recipientMatch = value.match(recipientRegex);

        if (!messageMatch && messageMode) {
            setMessageMode(false)
            setMessageRecipients(contacts)
        }
        if (messageMatch) {
            // @ts-ignore
            setMessageMode(true)
            const recipient = recipientMatch[1];
            console.log('recipient', recipient)
            const recipientUserOptions = contacts.filter(user => user.name.toLowerCase().includes(recipient.toLowerCase()));
            setMessageRecipients(recipientUserOptions)
            console.log('recipientUser', recipientUserOptions)
            // alert('sending message')
            // if (recipientUser) {
            //     // Send the message to the recipient user
            //     sendMessage(recipientUser, 'lorem ipsum');
            // }
        }
    }

    const handleInputKeyDown: KeyboardEventHandler = ({ key, currentTarget, target }) => {
        switch (key) {
            case 'Enter':
                setSelectedOptions([...selectedOptions, suggestions[0].name])
                handleQueryChange('')
                setContext({...context, context: suggestions[0].name, type: suggestions[0].type})
                break;
            case ',':
                setMode('filter')
                const newFilter = [...context?.filters, suggestions[0].name]
                setContext({...context, context: suggestions[0].name, type: 'filter', filters: newFilter})
                setSelectedOptions([...selectedOptions, suggestions[0].name])
                setTimeout(() => {
                    return handleQueryChange('')
                },0)
                break;
            case 'Backspace':
                if(!!selectedOptions.length && target.value.length === 0) {
                    const newSelected = selectedOptions.slice(0, -1)
                    setSelectedOptions(newSelected)
                }
                break;
            case 'ArrowDown':
                const nextIndex = highlightedIndex === null ? 0 : highlightedIndex + 1;
                setHighlightedIndex(nextIndex % suggestions.length);
                break;
            case 'ArrowUp':
                // code for ArrowUp action
                break;
            case 'ArrowRight':
                // code for ArrowRight action
                break;
        }
    }


    const handleSearchResultsKeyDown = ({key, currentTarget}, option:string) => {
        console.group('handleSearchResultsKeyDown')
        switch(key) {
            case 'Enter':
                // execute action
                console.log('Enter action selection')
                // todo manage input state o
                setSelectedOptions([...selectedOptions, option])
                break;
            case 'ArrowDown':
                // has next item
                if(suggestions.length -1 >= highlightedIndex) {
                    // select next
                    setHighlightedIndex(highlightedIndex + 1)
                    setInputValue(suggestions[highlightedIndex + 1]?.name)
                } else {
                    // go to top of the list ???
                    setHighlightedIndex(0)
                    setInputValue(suggestions[0].name)
                }
                break;
            case 'ArrowUp':
                // focus input when prev element does not exist & close actions list if opened
                if(highlightedIndex === 0) {
                    setHighlightedIndex(-1)
                    // focus end of the input text
                    setTimeout(() => {
                        inputRef?.current?.focus()
                        return currentTarget.setSelectionRange(currentTarget.value.length, currentTarget.value.length)
                    }, 0)
                    if(displayAction) {
                        setDisplayActions(false)
                    }
                }
                // select prev
                if(highlightedIndex !== 0) {
                    setHighlightedIndex(highlightedIndex - 1)
                    setInputValue(suggestions[highlightedIndex - 1].name)
                }
                break;
            case 'ArrowRight':
                console.log('Arrow Right action')
                setDisplayActions(true)
                setSelectedAction(0)
                break;
            case 'ArrowLeft':
                // close action dropdown, back to results
                console.log('Arrow right action')
                setDisplayActions(false)
                break;
        }
        console.groupEnd()
    }
    const handleActionKeyDown: KeyboardEventHandler = ({key}) => {
        switch (key) {
            case 'Enter':
                // execute action
                console.log('Enter action')
                break;
            case 'ArrowDown':
                // select next
                console.log('Arrow down action')
                setSelectedAction(selectedAction + 1)
                break;
            case 'ArrowUp':
                // select prev
                console.log('Arrow up action')
                setSelectedAction(selectedAction - 1)
                break;
            case 'ArrowLeft':
                // close action dropdown, back to results
                console.log('Arrow left on action list')
                setDisplayActions(false)
                setSelectedAction(-1)
                break;
            default:
                break;
        }
    }


    const handleDeselect = (value: string) => {
        setSelectedOptions(selectedOptions.filter((option) => option !== value));
    };

    return (
        <div className='poc_wrapper'>
            {/* SELECTED OPTIONS */}
            <div className='input_wrapper'>
                {selectedOptions.map((option) => (
                    <span
                        key={option}
                        onClick={() => handleDeselect(option)}
                        className='input_pill'
                    >
                {option}
                 </span>
                ))}

                <input
                    className='input'
                    // style={{width: '300px'}}
                    type="text"
                    value={query}
                    onChange={(event) => handleInputChange(event)}
                    onKeyDown={handleInputKeyDown}
                    list="my-list"
                    ref={inputRef}
                    onFocus={() => setDropdownOpen(true)}
                />

                {/*TODO show this instead of input - priority low*/}
                {/*<div>{inputValue}</div>*/}

            </div>
            {/* END SELECTED OPTIONS */}


            {dropdownOpen && (
                <SuggestionList
                    onSearchResultSelect={handleSearchResultSelect}
                    onSearchResultsKeyDown={handleSearchResultsKeyDown}
                    onActionKeyDown={handleActionKeyDown}
                    suggestions={suggestions}
                    highlightedIndex={highlightedIndex}
                    selectedAction={selectedAction}
                    mode={mode}
                    displayAction={displayAction}
                />
            )}


            {mode === 'message' && messageRecipients.map(user => (
                <div className='list_item'
                     role={"button"}
                     tabIndex={0}
                     key={user.id}
                     style={{padding: '8px 0', display: !inputValue ? "none" : 'flex', width: '100%', justifyContent: 'space-between', alignItems: 'center' }}>
                    {user.name}
                </div>
            ))}

            {/* TO BE COMPLETELY REMOVED AND SWAPPED WITH REAL LIFE NAV AND EXECUTIONS */}
            <div className='content_representation'>
                <h1>{context.context}</h1>
                <h2>{context.type}</h2>
            </div>
            {/* END TO BE COMPLETELY REMOVED AND SWAPPED WITH REAL LIFE NAV AND EXECUTIONS */}

        </div>
    );
}

