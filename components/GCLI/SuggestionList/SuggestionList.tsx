import React, {useEffect, useRef, useState} from 'react';
import {type} from "../data";
import '../gcli.css'
import {Suggestion} from "./Sugestion";
import {SuggestionType} from "./types";

interface SuggestionListProps {
    onSearchResultSelect: any;
    onSearchResultsKeyDown: any;
    onActionKeyDown:any;
    loadingSuggestions: boolean
    suggestions: Array<SuggestionType>
    highlightedIndex: number | null;
    selectedAction: number
    displayAction: boolean
}

export const SuggestionList = ({onSearchResultSelect, onSearchResultsKeyDown, onActionKeyDown, selectedAction, highlightedIndex, loadingSuggestions, suggestions, displayAction}: SuggestionListProps) => {
    return (
                <section className={!displayAction ? 'list result-list' : 'list action-list'}>
                    <div id="my-list" role='list' className='list-search-results__wrapper'>
                        {
                            loadingSuggestions && (
                                <div className='list-search-results__loading'>
                                    <div className='lds-dual-ring'/>
                                </div>
                            )
                        }
                        {
                            !loadingSuggestions && suggestions.map((suggestion, i:number) => (
                                <React.Fragment key={suggestion.type+ '_' + suggestion.id}>
                                    {(!displayAction || i === highlightedIndex) &&  (
                                        <Suggestion
                                            key={suggestion.id}
                                            active={i === highlightedIndex}
                                            item={suggestion}
                                            onClick={(e) => onSearchResultSelect(suggestion)}
                                            onKeyDown={(e) => onSearchResultsKeyDown(e, suggestion.id)}
                                            defaultAction={type.find(e => e.name === suggestion.type)?.defaultAction}
                                        />
                                    )}

                                </React.Fragment>
                            ))
                        }
                    </div>

                    {/*{displayAction && (*/}
                    {/*    <ul style={{padding: '0', margin: '0', width: '50%'}} role={'listbox'} >*/}
                    {/*        {suggestions[highlightedIndex || 0].actions.map((action, index) => (*/}
                    {/*            <AvailableAction*/}
                    {/*                active={selectedAction === index}*/}
                    {/*                action={action}*/}
                    {/*                // todo add click selection*/}
                    {/*                onKeyDown={onActionKeyDown} key={action}/>*/}
                    {/*        ))}*/}
                    {/*    </ul>*/}

                    {/*)}*/}

                </section>

            )
}

