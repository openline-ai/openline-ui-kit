import React, {useState} from 'react';
import {type} from "../data";
import '../poc.css'
import {AvailableAction} from "../AvailableActionList/AvailableAction";
import {Suggestion} from "./Sugestion";
import {GCLIInputMode, SuggestionType} from "./types";

interface SuggestionListProps {
    onSearchResultSelect: any;
    onSearchResultsKeyDown: any;
    onActionKeyDown:any;
    suggestions: Array<SuggestionType>
    highlightedIndex: number;
    selectedAction: number
    mode: GCLIInputMode
    displayAction: boolean
}

export const SuggestionList = ({onSearchResultSelect, onSearchResultsKeyDown, onActionKeyDown, selectedAction, highlightedIndex, suggestions, mode, displayAction}: SuggestionListProps) => {
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const dropdownRef = React.useRef(null);

    const handleDropdownToggle = () => {
        setDropdownOpen(!dropdownOpen);
    };


    return (
                <section className={!displayAction ? 'list result-list' : 'list action-list'}>
                    <div id="my-list" role='list' className='list-search-results__wrapper'>
                        {
                            mode !== 'message' && suggestions.map((suggestion, i:number) => (
                                <React.Fragment  key={suggestion.name}>
                                    {(!displayAction || i === highlightedIndex) &&  (
                                        <Suggestion
                                            key={suggestion.name}
                                            active={i === highlightedIndex}
                                            item={suggestion}
                                            onClick={(e) => onSearchResultSelect(suggestion.name)}
                                            onKeyDown={(e) => onSearchResultsKeyDown(e, suggestion.name)}
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
                                <AvailableAction
                                    active={selectedAction === index}
                                    action={action}
                                    // todo add click selection
                                    onKeyDown={onActionKeyDown} key={action}/>
                            ))}
                        </ul>

                    )}

                </section>

            )
}

