import React from 'react';
import {ComponentMeta, ComponentStory, Meta, StoryObj} from '@storybook/react';

import {GCLI as GCLIInput} from "./GCLI";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faGlobe} from "@fortawesome/free-solid-svg-icons";

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta: Meta<typeof GCLIInput> = {
    title: 'Components/GCLI Input',
    component: GCLIInput,
};

type Story = StoryObj<typeof GCLIInput>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
export const Example: Story = {
    args: {
        label: 'Everything',
        icon: <FontAwesomeIcon icon={faGlobe}/>,
        onItemsChange: (items: any[]) => {
            console.log('selected')
            console.log(items);
        },
        loadSuggestions: (searchTerm: string) => {
        },
        loadingSuggestions: false,
        suggestionsLoaded: [
            {
                "id": "1",
                "type": "CONTACT",
                "display": "John Doe",
                "data": null
            }
        ],
    },
};

export default meta;