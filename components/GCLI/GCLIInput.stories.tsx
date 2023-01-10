import React from 'react';
import {ComponentMeta, ComponentStory} from '@storybook/react';

import {GCLI as GCLIInput} from "./GCLI";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faGlobe} from "@fortawesome/free-solid-svg-icons";

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
    title: 'Components/GCLI Input',
    component: GCLIInput
} as ComponentMeta<typeof GCLIInput>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof GCLIInput> = (args) => <GCLIInput {...args}/>;

export const Example = Template.bind({});
Example.args = {
    label: 'Everything',
    icon: <FontAwesomeIcon icon={faGlobe}/>,
    onItemsChange: (items: any[]) => {
        console.log('selected')
        console.log(items);
    },
    queryData: (searchTerm: string) => {
        console.log('in args')
        return [
            {
                "score": 2.222111225128174,
                "result": {
                    "id": "1",
                    "type": "CONTACT",
                    "display": "John Doe",
                    "data": null
                }
            },
            {
                "score": 1.5847069025039673,
                "result": {
                    "id": "1",
                    "type": "STATE",
                    "display": "Alabama",
                    "data": [
                        {
                            "key": "code",
                            "value": "AL",
                            "display": null
                        }
                    ]
                }
            },
            {
                "score": 1.5732121467590332,
                "result": {
                    "id": "1",
                    "type": "EMAIL",
                    "display": "tt@gg.ww",
                    "data": null
                }
            },
            {
                "score": 1.5732121467590332,
                "result": {
                    "id": "1",
                    "type": "ORGANIZATION",
                    "display": "aa@bb.cc",
                    "data": null
                }
            }
        ]
    }
};