import React, {createContext, ReactNode, useContext, useState} from 'react';
import {GCLIInputMode} from "../types";



interface GCLIContextProviderProps {
    children: ReactNode
}

type onHighlightedItemChangeType = (newIndex: number | null) => void

interface GCLIContextInterface {
    mode: GCLIInputMode
    selectedItems: Array<any>
    highlightedItemIndex: null | number
    onChangeMode: (mode: GCLIInputMode) => void
    onHighlightedItemChange: (newIndex: number | null) => void
    onSelectNextSuggestion: (
        {suggestions, currentIndex, onIndexSelect}:
            {suggestions: Array<any>, currentIndex: null | number, onIndexSelect: (index: number) => void}) => void // fixme
    onSelectPrevSuggestion: (
        {currentIndex, onIndexSelect}:
            {currentIndex: null | number, onIndexSelect: (index: number) => void}) => void // fixme
}
const GCLIContext = createContext<GCLIContextInterface>({
    mode: "default",
    selectedItems: [],
    highlightedItemIndex: null,
    onChangeMode: (newMode) => {},
    onHighlightedItemChange: (index) => {},
    onSelectNextSuggestion: (data: any) => {},
    onSelectPrevSuggestion: (data: any) => {}
});


const GCLIContextProvider = ({ children }: GCLIContextProviderProps):JSX.Element => {
    const [mode, setMode] = useState<GCLIInputMode>('default');
    const [selectedItems, setSelectedItems] = useState([]);
    const [highlightedItemIndex, setHighlightedItemIndex] = useState<null | number>(null);

    const handleChangeMode = (newMode: GCLIInputMode) => {
        setMode(newMode);
    }

    const handleHighlightItem = (newItemIndex: number | null) => {
        console.log('HERE')
        setHighlightedItemIndex(newItemIndex);
    }

    //TODO fix types
    const handleSelectNextSuggestion = ({suggestions, currentIndex, onIndexSelect}) => {
        // select first item from the list -> if nothing is selected yet and there are available options
        if(currentIndex === null && suggestions?.length >= 0) {
            onIndexSelect(0)
        }
        // select next item if currently selected item is not last on the list
        if (suggestions.length - 1 >= currentIndex) {
            onIndexSelect(currentIndex + 1)
        } else {
            // go to top of the list ???
            onIndexSelect(0)
        }
    }

    const handleSelectPrevSuggestion = ({currentIndex, onIndexSelect}) => {
        // deselect list -> move focus back to input / previous context
        if(currentIndex === 0) {
            onIndexSelect(null)
        }
        // select prev
        if(currentIndex > 0) {
            onIndexSelect(currentIndex - 1)
        }
    }


    return (
        <GCLIContext.Provider value={{
            mode,
            selectedItems,
            highlightedItemIndex,
            onChangeMode: handleChangeMode,
            onHighlightedItemChange: handleHighlightItem,
            onSelectNextSuggestion: handleSelectNextSuggestion,
            onSelectPrevSuggestion: handleSelectPrevSuggestion,
        }}>
            {children}
        </GCLIContext.Provider>
    );
}

const useGCLI = () => {
    const { mode,
        selectedItems,
        highlightedItemIndex,
        onChangeMode,
        onHighlightedItemChange, onSelectNextSuggestion, onSelectPrevSuggestion } = useContext(GCLIContext)
    console.log(highlightedItemIndex)
    return {
        mode,
        selectedItems,
        highlightedItemIndex,
        onChangeMode,
        onHighlightedItemChange,
        onSelectNextSuggestion,
        onSelectPrevSuggestion
    }
}

export { GCLIContext, GCLIContextProvider, useGCLI };