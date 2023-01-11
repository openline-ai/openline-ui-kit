
import React, {KeyboardEventHandler, useEffect, useRef, useState} from 'react';

import {contacts} from "./data";
import {getSuggestions} from "./poc_only_helpers";
import {SuggestionList} from "./SuggestionList";
import './poc.css'
import {useGCLI} from "./context/GCLIContext";

// TODO
// Filtering:
// 1. executing filter action on enter is liniting next filter options to specific context eg. organisation
// 2. executing filter action on comma is grouping objects, no action executed (allows to execute action on all of those objects)
// objects should be initially of the same type

// TODO
//   add result context change mechanism

export const GCLIInput = () => {
    // TODO action simulation to be removed!

    const {
        mode,
        selectedItems,
        highlightedItemIndex,
        onChangeMode,
        onHighlightedItemChange,
        onSelectNextSuggestion,
        onSelectPrevSuggestion
    } = useGCLI()



    //fixme
    const [groupType, setGroupType] = useState<null | string>(null);

    // todo use input value to create fill in effect on navigate through results by keyboard ??? do we even need that? is this a proper use case
    const [inputValue, setInputValue] = useState('');
    const [query, setQuery] = useState('');
    // todo change name - this is for the options that are already selected
    const [selectedOptions, setSelectedOptions] = useState<Array<string>>([]);
    const [suggestions, setSuggestions] = useState<Array<any>>([]);
    const [messageRecipients, setMessageRecipients] = useState(contacts);
    const [messageMode, setMessageMode] = useState(false);
    const [displayAction, setDisplayActions] = useState(false);
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
        if(!query && !groupType) {
            setSuggestions([])
        } else {
            const newOptions = getSuggestions(query).filter(e=> !selectedOptions.find(name => name === e.name))
            if(!groupType) {
                setSuggestions(newOptions)
            } else {
                // POC just to see if works
                setSuggestions(newOptions.filter(e => e.type === groupType))
                const abc = newOptions.filter(e => e.type === groupType)
                console.log('ABC', abc, groupType)
            }

        }
    },[query, groupType])

    const sendMessage = (recipient:any, message:string) => {
        // Send the message to the recipient here
        console.log(`Sending message "${message}" to ${recipient.name}`);
        setMessageMode(false)
        setMessageRecipients(contacts)
    }

    // HANDLERS FOR GENERAL ACTIONS

    const handleSearchResultSelect = (name:string, defaultAction:string) => {
        setSelectedOptions([...selectedOptions, name])
        // setContext({...context, context: name, type: defaultAction === 'Open' ? 'Preview' :  'Filtered list'})

    }
    console.log('SUGGESTIONS', suggestions)
    // END HANDLERS FOR GENERAL ACTIONS
    const handleFocusInputEndOfText = (currentTarget:any) => {
        if(currentTarget === null) {
            return
        }
        // focus end of the input text
        setTimeout(() => {
            inputRef?.current?.focus()
            return currentTarget.setSelectionRange(currentTarget.value.length, currentTarget.value.length)
        }, 0)
    }
    const handleCreateGroup = (event: KeyboardEvent) => {
        console.log('HERE group', )
        event.preventDefault()
        event.stopPropagation()
        if (groupType === null || mode !== 'group') {
            onChangeMode('group')
            setGroupType(suggestions[0].type)
        }
        setSelectedOptions([...selectedOptions, suggestions[highlightedItemIndex ? highlightedItemIndex : 0].name])

        handleFocusInputEndOfText(event.currentTarget)
        setTimeout(() => {
            return setQuery('')
        },0)
    }

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

    const handleInputKeyDown: KeyboardEventHandler = (event:KeyboardEvent) => {
        const { key, currentTarget, target } = event
        switch (key) {
            case 'Enter':
                setSelectedOptions([...selectedOptions, suggestions[0].name])
                handleQueryChange('')
                // setContext({...context, context: suggestions[0].name, type: suggestions[0].type})
                break;
            case ',':
                handleCreateGroup(event)
                break;
            case 'Backspace':
                if(!!selectedOptions.length && target?.value?.length === 0) {
                    const newSelected = selectedOptions.slice(0, -1)
                    setSelectedOptions(newSelected)
                }
                break;
            case 'ArrowDown':
                onSelectNextSuggestion({suggestions, currentIndex: highlightedItemIndex, onIndexSelect: onHighlightedItemChange})
                break;
            case 'ArrowUp':
                // code for ArrowUp action

                break;
            case 'ArrowRight':
                // code for ArrowRight action
                if (mode === 'group') {
                    setSuggestions([])
                }
                break;
        }
    }


    const handleSearchResultsKeyDown = (event: KeyboardEvent, option:string) => {
        const {key, currentTarget} = event
        switch(key) {
            case 'Enter':
                // execute action
                console.log('Enter action selection')
                // todo manage input state o
                setSelectedOptions([...selectedOptions, option])
                break;
            case 'ArrowDown':
                onSelectNextSuggestion({suggestions, currentIndex: highlightedItemIndex, onIndexSelect: onHighlightedItemChange})
                break;
            case 'ArrowUp':
                onSelectPrevSuggestion({currentIndex: highlightedItemIndex, onIndexSelect: onHighlightedItemChange})
                if(highlightedItemIndex === 0) {
                    // focus end of the input text
                    setTimeout(() => {
                        inputRef?.current?.focus()
                        return currentTarget.setSelectionRange(currentTarget.value.length, currentTarget.value.length)
                    }, 0)
                    if(displayAction) {
                        setDisplayActions(false)
                    }
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
            case ',':
                handleCreateGroup(event)
                break
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
                        className={`input_pill input_pill--${mode}`}
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


            {dropdownOpen && query !== '' && (
                <SuggestionList
                    onSearchResultSelect={handleSearchResultSelect}
                    onSearchResultsKeyDown={handleSearchResultsKeyDown}
                    onActionKeyDown={handleActionKeyDown}
                    suggestions={suggestions}
                    selectedAction={selectedAction}
                    mode={mode}
                    displayAction={displayAction}
                    highlightedIndex={highlightedItemIndex}
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
                {/*<h1>{context.context}</h1>*/}
                {/*<h2>{context.type}</h2>*/}
            </div>
            {/* END TO BE COMPLETELY REMOVED AND SWAPPED WITH REAL LIFE NAV AND EXECUTIONS */}

        </div>
    );
}

