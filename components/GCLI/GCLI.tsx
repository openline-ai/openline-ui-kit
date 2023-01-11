import React from 'react';
import {GCLIContextProvider} from "./context/GCLIContext";
import {GCLIInput} from "./GCLIInput";
import './poc.css'


export const GCLI = () => {


    return (
       <GCLIContextProvider>
           <GCLIInput />
       </GCLIContextProvider>
    );
}

