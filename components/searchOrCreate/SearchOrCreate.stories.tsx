import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.min.css";
import 'primeflex/primeflex.css';
import "primeicons/primeicons.css";


import React from 'react';
import {ComponentMeta, ComponentStory} from '@storybook/react';

import {faUserNinja} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import SearchOrCreateComponent from "./SearchOrCreateComponent";

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
    title: 'Components/Search or create',
    component: SearchOrCreateComponent,
} as ComponentMeta<typeof SearchOrCreateComponent>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof SearchOrCreateComponent> = (args) => <SearchOrCreateComponent {...args} />;

const searchAsync = function (where: any, maxResults: string) {
    return new Promise((resolve, reject) => {
        resolve({
            content: [
                {
                    id: "1",
                    firstName: "John",
                    lastName: "Doe",
                },
                {
                    id: "2",
                    firstName: "John",
                    lastName: "Deer",
                }
            ],
            totalElements: 2
        });
    });
}

export const Example = Template.bind({});
Example.args = {
    resourceLabel: "users",
    value: 'initial selected item',
    searchItemTemplate: (e: any) => {
        return <>
            <span className="mr-3"><FontAwesomeIcon icon={faUserNinja}/></span>
            <span className="mr-3">{e.firstName} {e.lastName}</span>
        </>
    },
    searchData: (where: any, maxResults: string) => {
        return searchAsync(where, maxResults);
    },
    onInputValueChanged: (e: any) => {
        console.log(e);
    },
    onItemSelected: (e: any) => {
        console.log(e);
    },
    maxResults: 5
};