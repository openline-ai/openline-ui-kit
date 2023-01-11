import React, { createContext, useState } from 'react';
import {GCLIInputMode} from "../types";

const InputContext = createContext({
    mode: '',
    selectedItems: [],
    highlightedItem: ''
});

const GCLIContextProvider = ({ children }: {children: React.ReactNode}) => {
    const [mode, setMode] = useState<GCLIInputMode>('default');
    const [selectedItems, setSelectedItems] = useState([]);
    const [highlightedItem, setHighlightedItem] = useState('');

    const onChangeMode = (newMode:GCLIInputMode) => {
        setMode(newMode);
    }

    const updateSelectedItems = (newItems) => {
        setSelectedItems([...newItems]);
    }

    const updateHighlightedItem = (newItem) => {
        setHighlightedItem(newItem);
    }

    return (
        <InputContext.Provider value={{
            highlightedItem,
            mode,
            selectedItems,
            onChangeMode,
            updateHighlightedItem,
            updateSelectedItems
        }}>
            {children}
        </InputContext.Provider>
    );
}

export { InputContext, GCLIContextProvider };