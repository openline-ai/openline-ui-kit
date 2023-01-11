import React from 'react';
import {ComponentMeta, ComponentStory} from '@storybook/react';

import {GCLI as GCLIInput} from "./GCLI";
import {faUserNinja} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
    title: 'Components/GCLI Input',
    component: GCLIInput,
} as ComponentMeta<typeof GCLIInput>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof GCLIInput> = (args) => <GCLIInput />;

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