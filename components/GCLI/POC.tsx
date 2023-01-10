import React, {KeyboardEventHandler, useEffect, useRef, useState} from 'react';
import {contacts, companies as companiesData, contracts as contractsData, type} from "./data";
import './poc.css'
import {ActionItem, ActionList} from "./ActionItem";
import {AutocompleteResultItem} from "./SearchResultItem";


type Mode = 'default' | 'filter'

const AutocompleteInput = () => {
    // TODO action simulation to be removed!

    const [context, setContext] = useState({
        context: 'main page',
        type: 'page',
        filters: []
    });

    const [mode, setMode] = useState<Mode>('default');
    // todo add "query" to fill input when navigating by keyboard
    const [inputValue, setInputValue] = useState('');
    const [query, setQuery] = useState('');
    // todo change name - this is for the result list options
    const [selectedResult, setSelectedResult] = useState('');
    // todo change name - this is for the options that are already selected
    const [selectedOptions, setSelectedOptions] = useState<Array<string>>([]);
    const [suggestions, setSuggestions] = useState<Array<any>>([]);
    const [users, setUsers] = useState(contacts);
    const [messageRecipients, setMessageRecipients] = useState(users);
    const [messageMode, setMessageMode] = useState(false);
    const [companies, setCompanies] = useState(companiesData);
    const [contracts, setContracts] = useState(contractsData);
    const [displayAction, setDisplayActions] = useState(false);
    const [highlightedIndex, setHighlightedIndex] = useState(-1);
    const [selectedAction, setSelectedAction] = useState(-1);


    const [isKeyDown, setIsKeyDown] = useState(false);
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

    const getSuggestions = (input:string) => {
        const inputLowerCase = input.toLowerCase();
        const userSuggestions = users.filter(user =>
            user.name.toLowerCase().includes(inputLowerCase)
        );

        const companySuggestions = companies.filter(company =>
            company.name.toLowerCase().includes(inputLowerCase)
        );

        const contractsSuggestions = contracts.filter(contract =>
            contract.name.toLowerCase().includes(inputLowerCase)
        );
        return [
            ...userSuggestions.map(suggestion => ({
                ...suggestion,
                actions: type.find(e => e.name === suggestion.type)?.actions || []
            })),
            ...companySuggestions.map(suggestion => ({
                ...suggestion,
                actions: type.find(e => e.name === suggestion.type)?.actions || []
            })),
            ...contractsSuggestions.map(suggestion => ({
                ...suggestion,
                actions: type.find(e => e.name === suggestion.type)?.actions || []
            }))

        ];
    }

    const sendMessage = (recipient:any, message:string) => {
        // Send the message to the recipient here
        console.log(`Sending message "${message}" to ${recipient.name}`);
        setMessageMode(false)
        setMessageRecipients(users)
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
            setMessageRecipients(users)
        }
        if (messageMatch) {
            // @ts-ignore
            setMessageMode(true)
            const recipient = recipientMatch[1];
            console.log('recipient', recipient)
            const recipientUserOptions = users.filter(user => user.name.toLowerCase().includes(recipient.toLowerCase()));
            setMessageRecipients(recipientUserOptions)
            console.log('recipientUser', recipientUserOptions)
            // alert('sending message')
            // if (recipientUser) {
            //     // Send the message to the recipient user
            //     sendMessage(recipientUser, 'lorem ipsum');
            // }
        }
    }

    const handleInputKeyDown: KeyboardEventHandler = ({key, currentTarget, target}) => {
        if(key === 'Enter') {
            // execute action of first result
            setSelectedOptions([...selectedOptions, suggestions[0].name])
            // todo manage input state o
            handleQueryChange('')
            setContext({...context, context:suggestions[0].name, type: suggestions[0].type})
        }
        // FILTER []
        if(key === ',') {
            setMode('filter')
            console.log('Input Comma event', [...context?.filters, suggestions[0].name])
            const newFilter = [...context?.filters, suggestions[0].name]
            // @ts-ignore
            setContext({...context, context: suggestions[0].name, type: 'filter', filters: newFilter})
            console.log('context?.filters', context?.filters)
            setSelectedOptions([...selectedOptions, suggestions[0].name])

            setTimeout(() => {
                return handleQueryChange('')
            },0)

        }
        // Remove selection [x]
        if(key === 'Backspace') {
            console.log('Input Backspace event')
            // If the input value is an empty string and there are items selected remove last one
            if(!!selectedOptions.length && target.value.length === 0) {
                const newSelected = selectedOptions.slice(0, -1)
                setSelectedOptions(newSelected)
            }
        }

        if( key === 'ArrowDown') {
            // select next
            // preventDefault();
            const nextIndex = highlightedIndex === null ? 0 : highlightedIndex + 1;
            console.log('ABC ABC ABC ', nextIndex % suggestions.length)
            // @ts-ignore
            setHighlightedIndex(nextIndex % suggestions.length);
        }

        if( key === 'ArrowUp') {

            // select prev
            console.log('Arrow up action', currentTarget)

        }
        if( key === 'ArrowRight') {
            // view all actions of the fist result
            console.log('Arrow right action, we cannot display actions on arrow right because this messes with changing cursor position')
            // setDisplayActions(true)
            // setSelectedAction(selectedAction + 1)

        }
    }

    const handleSearchResultsKeyDown = ({key, currentTarget}, option:string) => {
        console.group('handleSearchResultsKeyDown')
        if(key === 'Enter') {
            // execute action
            console.log('Enter action selection')
            // todo manage input state o
            setSelectedOptions([...selectedOptions, option])
        }

        if( key === 'ArrowDown') {
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

        }

        if( key === 'ArrowUp') {
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
        }

        if( key === 'ArrowRight') {
            console.log('Arrow Right action')
            setDisplayActions(true)
            setSelectedAction(0)

        }
        if( key === 'ArrowLeft') {
            // close action dropdown, back to results
            console.log('Arrow right action')
            setDisplayActions(false)
        }

        console.groupEnd()

    }
    const handleActionKeyDown: KeyboardEventHandler = ({key}) => {
        if(key === 'Enter') {
            // execute action
            console.log('Enter action')
        }

        if( key === 'ArrowDown') {
            // select next
            console.log('Arrow down action')
            setSelectedAction(selectedAction + 1)
        }

        if( key === 'ArrowUp') {
            // select prev
            console.log('Arrow up action')
            setSelectedAction(selectedAction - 1)

        }

        if( key === 'ArrowLeft') {
            // close action dropdown, back to results
            console.log('Arrow left on action list')
            setDisplayActions(false)
            setSelectedAction(-1)
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
                    style={{width: '300px'}}
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
                <section className={!displayAction ? 'list result-list' : 'list action-list'}>
                    <div id="my-list" role='list' className='list-search-results__wrapper'>
                        {
                            !messageMode && suggestions.map((suggestion, i) => (
                                <React.Fragment  key={suggestion.name}>
                                    {(!displayAction || i === highlightedIndex) &&  (
                                        <AutocompleteResultItem
                                            key={suggestion.name}
                                            active={i === highlightedIndex}
                                            item={suggestion}
                                            onClick={(e) => handleSearchResultSelect(suggestion.name)}
                                            onKeyDown={(e) => handleSearchResultsKeyDown(e, suggestion.name)}
                                            defaultAction={type.find(e => e.name === suggestion.type)?.defaultAction}
                                            actionMode={displayAction}
                                        />
                                    )}


                                </React.Fragment>
                            ))
                        }
                    </div>

                    {displayAction && (
                        <ul style={{padding: '0', margin: '0', width: '50%'}} role={'listbox'} >
                            {suggestions[highlightedIndex || 0].actions.map((action, index) => (
                                <ActionItem
                                    active={selectedAction === index}
                                    action={action}
                                    // todo add click selection
                                    onKeyDown={handleActionKeyDown} key={action}/>
                            ))}
                        </ul>

                    )}

                </section>

            )}


            {messageMode && messageRecipients.map(user => (
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

export default AutocompleteInput;
