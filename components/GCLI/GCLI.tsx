import React, {ReactNode} from 'react';
import {GCLIContextProvider} from "./context/GCLIContext";
import {GCLIInput} from "./GCLIInput";
import './gcli.css'

interface GCLIProps {
    label: string,
    icon?: ReactNode,
    queryData: (searchTerm: string) => Array<any>
    onItemsChange: (items: any[]) => void
}

export const GCLI = ({label, icon, queryData, onItemsChange}: GCLIProps) => {
    return (
        <GCLIContextProvider label={label} icon={icon} queryData={queryData} onItemsChange={onItemsChange}>
            <GCLIInput/>
        </GCLIContextProvider>
    );
}

