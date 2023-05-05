import React, {KeyboardEventHandler, useEffect, useRef, useState} from 'react';

import {SuggestionList} from "./SuggestionList";
import './gcli.css'
import "../../styles/normalization.css";
import {useGCLI} from "./context/GCLIContext";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faAt, faBuildingColumns, faFilter, faMap, faRemove, faSearch, faUser} from "@fortawesome/free-solid-svg-icons";

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
        label,
        icon,
        loadSuggestions,
        loadingSuggestions,
        suggestionsLoaded,
        onItemsChange,
        highlightedItemIndex,
        onHighlightedItemChange,
        onSelectNextSuggestion,
        onSelectPrevSuggestion
    } = useGCLI()

    // todo use input value to create fill in effect on navigate through results by keyboard ??? do we even need that? is this a proper use case
    const [selectedValues, setSelectedValues] = useState([] as any[]);
    const [searchQuery, setSearchQuery] = useState('');

    const [suggestions, setSuggestions] = useState<Array<any>>([]);
    const [displayAction, setDisplayActions] = useState(false);
    const [selectedAction, setSelectedAction] = useState(-1);

    const inputRef = useRef<HTMLInputElement>(null)

    // TODO CLEAN UP ^ V
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const dropdownRef = React.useRef(null);

    useEffect(() => {
        if (!loadingSuggestions && suggestionsLoaded) {
            setSuggestions(suggestionsLoaded);
        }
    }, [loadingSuggestions, suggestionsLoaded]);

    useEffect(() => {
        if (!searchQuery) {
            setSuggestions([])
        } else {
            loadSuggestions(searchQuery);
        }
    }, [searchQuery])

    // HANDLERS FOR GENERAL ACTIONS
    const handleSearchResultSelect = (item: any, defaultAction: string) => {
        const items = [...selectedValues, item];
        setSelectedValues(items);
        onItemsChange(items);
        setSuggestions([]);
        setSearchQuery('');
        inputRef?.current?.focus();
    }

    // HANDLERS FOR GENERAL ACTIONS
    const handleAsSimpleSearch = () => {
        handleSearchResultSelect({
            "type": "GENERIC",
            "display": searchQuery
        }, 'FILTER');
    }
    // END HANDLERS FOR GENERAL ACTIONS

    const handleInputKeyDown = (event: KeyboardEvent) => {
        const {key, currentTarget, target} = event
        switch (key) {
            case 'Enter':
                handleAsSimpleSearch();
                break;
            case ',':
                // handleCreateGroup(event)
                break;
            case 'Backspace':
                // if(!!selectedOptions.length && target?.value?.length === 0) {
                //     const newSelected = selectedOptions.slice(0, -1)
                //     setSelectedOptions(newSelected)
                // }
                break;
            case 'ArrowDown':
                onSelectNextSuggestion({suggestions, currentIndex: highlightedItemIndex, onIndexSelect: onHighlightedItemChange})
                break;
            case 'ArrowUp':
                // code for ArrowUp action

                break;
            case 'ArrowRight':
                // code for ArrowRight action
                // if (mode === 'group') {
                //     setSuggestions([])
                // }
                break;
            case 'Escape':
                setDropdownOpen(false);
        }
    }
    const handleSearchResultsKeyDown = (event: KeyboardEvent, option: string) => {
        const {key, currentTarget} = event
        switch (key) {
            case 'Enter':
                // // execute action
                // console.log('Enter action selection')
                // // todo manage input state o
                // setSelectedOptions([...selectedOptions, option])
                break;
            case 'ArrowDown':
                onSelectNextSuggestion({suggestions, currentIndex: highlightedItemIndex, onIndexSelect: onHighlightedItemChange})
                break;
            case 'ArrowUp':
                onSelectPrevSuggestion({currentIndex: highlightedItemIndex, onIndexSelect: onHighlightedItemChange})
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
            case 'Escape':
                setDropdownOpen(false);
                break
        }
        console.groupEnd()
    }
    const handleActionKeyDown: KeyboardEventHandler = ({key}) => {
        console.log(key)
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

                break;
            default:
                break;
        }
    }

    return (
        <div className='gcli_wrapper'>
            <div className='input_wrapper'>

                <div className='input_label_icon'>

                    {icon &&
                        <div className='input_icon'>{icon}</div>
                    }

                    <div className='input_label'>{label}</div>

                </div>

                <div className='selected_terms_wrapper'>
                    {
                        selectedValues.map((e, index) => (
                            <div className='selected_term' key={index} onClick={() => {
                                setSelectedValues(selectedValues.filter((_, i) => i !== index));
                                onItemsChange(selectedValues.filter((_, i) => i !== index));
                            }
                            }>
                                <div className='list_item_icon'>
                                    {
                                        e.type === 'CONTACT' &&
                                        <FontAwesomeIcon icon={faUser}/>
                                    }
                                    {
                                        e.type === 'ORGANIZATION' &&
                                        <FontAwesomeIcon icon={faBuildingColumns}/>
                                    }
                                    {
                                        e.type === 'EMAIL' &&
                                        <FontAwesomeIcon icon={faAt}/>
                                    }
                                    {
                                        e.type === 'STATE' &&
                                        <FontAwesomeIcon icon={faMap}/>
                                    }
                                    {
                                        e.type === 'GENERIC' &&
                                        <FontAwesomeIcon icon={faFilter}/>
                                    }
                                </div>
                                <div className='selected_term_text'>{e.display}</div>
                                <FontAwesomeIcon icon={faRemove}/>
                            </div>
                        ))
                    }
                </div>

                <input
                    className='input'
                    type="text"
                    value={searchQuery}
                    onChange={(event) => {
                        setSearchQuery(event.target.value);
                        setDropdownOpen(true);
                        inputRef.current?.focus();
                    }}
                    onKeyDown={(event: any) => handleInputKeyDown(event)}
                    list="my-list"
                    ref={inputRef}
                />

                <div className='input_actions'>

                    {loadingSuggestions && <div className='loading'>Loading...</div>}
                    {!loadingSuggestions && searchQuery !== '' &&
                        <button className='search_button' onClick={handleAsSimpleSearch}>
                            <FontAwesomeIcon icon={faSearch} style={{marginRight: '10px'}}/> Search
                        </button>
                    }

                </div>

                {/*TODO show this instead of input - priority low*/}
                {/*<div>{inputValue}</div>*/}

            </div>
            {/* END SELECTED OPTIONS */}


            {dropdownOpen && searchQuery !== '' && (
                <SuggestionList
                    onSearchResultSelect={handleSearchResultSelect}
                    onSearchResultsKeyDown={handleSearchResultsKeyDown}
                    onActionKeyDown={handleActionKeyDown}
                    suggestions={suggestions}
                    selectedAction={selectedAction}
                    displayAction={displayAction}
                    highlightedIndex={highlightedItemIndex}
                />
            )}

        </div>
    );
}

