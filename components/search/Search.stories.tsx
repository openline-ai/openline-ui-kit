import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.min.css";
import 'primeflex/primeflex.css';
import "primeicons/primeicons.css";


import React from 'react';
import {ComponentMeta, ComponentStory} from '@storybook/react';

import SearchComponent from "./SearchComponent";
import {faUserNinja} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
    title: 'Components/Search',
    component: SearchComponent,
} as ComponentMeta<typeof SearchComponent>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof SearchComponent> = (args) => <SearchComponent {...args} />;

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
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Example.args = {
    resourceLabel: "users",
    searchBy: [{label: 'First name', field: 'FIRST_NAME'}, {label: 'Last name', field: 'LAST_NAME'}],
    value: 'initial selected item',
    itemTemplate: (e: any) => {
        return <>
            <span className="mr-3"><FontAwesomeIcon icon={faUserNinja}/></span>
            <span className="mr-3">{e.firstName} {e.lastName}</span>
        </>
    },
    searchData: (where: any, maxResults: string) => {
        return searchAsync(where, maxResults);
    },
    onItemSelected: (e: any) => {
        console.log(e);
    },
    maxResults: 5
};