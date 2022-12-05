import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.min.css";
import 'primeflex/primeflex.css';
import "primeicons/primeicons.css";


import React from 'react';
import {ComponentMeta, ComponentStory} from '@storybook/react';
import GridComponent from "./GridComponent";
import {PaginatedRequest} from "./pagination";
import {Button} from "primereact/button";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCirclePlus} from "@fortawesome/free-solid-svg-icons";

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
    title: 'Components/Grid',
    component: GridComponent,
} as ComponentMeta<typeof GridComponent>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof GridComponent> = (args) => <GridComponent {...args} />;

const searchAsync = function (request: PaginatedRequest) {
    console.log(request.pagination);
    console.log(request.where);
    console.log(request.sort);
    return new Promise((resolve, reject) => {
        setTimeout(() => {
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
        }, 1000);
    });
}

export const Example = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Example.args = {
    gridTitle: 'My users',
    columns: [
        {
            field: 'firstName',
            label: 'First name',
            className: 'w50',
            editLink: true
        },
        {
            field: 'lastName',
            label: 'last name',
            className: 'w50'
        }
    ],
    filters: [{label: 'First name', field: 'FIRST_NAME'}, {label: 'Last name', field: 'LAST_NAME'}],
    sorting: [{label: 'First name', field: 'FIRST_NAME'}, {label: 'Last name', field: 'LAST_NAME'}],
    queryData: (request: PaginatedRequest) => {
        return searchAsync(request);
    },
    gridActions: <div className="flex align-items-center">
        <Button onClick={(e: any) => {}} className='p-button-text'>
            <FontAwesomeIcon icon={faCirclePlus} className="mr-2"/>Add a new user
        </Button>
    </div>
};