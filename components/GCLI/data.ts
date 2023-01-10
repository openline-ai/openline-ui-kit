
const contract_actions = [
    {
        "id": "1",
        "name": "open"
    },
    {
        "id": "a",
        "name": "call"
    },
    {
        "id": "2",
        "name": "call with..."
    },
    {
        "id": "3",
        "name": "message"
    },
    {
        "id": "4",
        "name": "message with..."
    },
    {
        "id": "5",
        "name": "send SMS"
    },
    {
        "id": "6",
        "name": "email"
    },
    {
        "id": "7",
        "name": "email at"
    },
    {
        "id": "8",
        "name": "Add to mailing list"
    },
    {
        "id": "9",
        "name": "schedule meeting"
    },
    {
        "id": "10",
        "name": "schedule meeting (video)"
    },
    {
        "id": "11",
        "name": "locate on map"
    },
    {
        "id": "12",
        "name": "copy to clipboard"
    },
    {
        "id": "13",
        "name": "add note"
    }
]

const type = [
    {
        id: 1,
        name: 'contact',
        actions: ['Open', 'Delete', 'Call'], //todo
        defaultAction: 'Open'
    },
    {
        id: 2,
        name: 'company',
        actions: ['Filter','Write message', 'Activate Contract'],
        defaultAction: 'Filter'
    },
    {
        id: 3,
        name: 'contract',
        actions: contract_actions,
        defaultAction: 'Open'
    }
]

// todo implement support for free text action
// free text action differ based on the context they are used in


const free_string_actions_contact = [
    {
        id: 'free_string_action_contact_1',
        name: 'Send as'
    },
    {
        id: 'free_string_action_contact_2',
        name: 'add as a note'
    },
    {
        id: 'free_string_action_contact_3',
        name: 'add as a field'
    }

]

const free_string_actions_default = [
    {
        id: 'free_string_actions_default_1',
        name: 'Add as a note'
    }
]


const contacts = [
    {
        id: 1,
        name: 'Alice Doe',
        type: 'contact'
    },
    {
        id: 2,
        name: 'Bob Potter',
        type: 'contact'
    },
    {
        id: 3,
        name: 'Eve Smith',
        type: 'contact'
    }
]

const companies = [
    {
        id: 'c1',
        name: 'Acme',
        type: 'company'
    },
    {
        id: 'c2',
        name: 'Nestle',
        type: 'company'
    },
    {
        id: 'c3',
        name: 'Abc inc',
        type: 'company'
    }
]

const contracts = [
    {
        id: 'con1',
        name: 'Acme contract',
        type: 'contract',
        status: 'draft'
    },
    {
        id: 'con2',
        name: 'Nestle contract',
        type: 'contract',
        status: 'active'
    },
    {
        id: 'cpm3',
        name: 'Abc inc contract',
        type: 'contract',
        status: 'active'
    }
]

const groupedData = [
    {
        label: 'Contacts', type: 'contact',
        items: [
            ...contacts.map(u => ({
                ...u,
                actions: type[0].actions
            }))
        ]
    },
    {
        label: 'Contracts', code: 'contract',
        items: [
            ...contracts.map(c=> ({
                ...c,
                actions: type[2].actions
            }))

        ]
    },
    {
        label: 'Companies', code: 'company',
        items: [
            ...companies.map(c=> ({
                ...c,
                actions: type[1].actions
            }))
        ]
    }
];
export {
    groupedData,
    contacts,
    contracts,
    companies,
    type,
    free_string_actions_default,
    free_string_actions_contact
}