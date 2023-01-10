import {type, companies, contracts, contacts,} from "./data";

export const getSuggestions = (input:string) => {
    const inputLowerCase = input.toLowerCase();
    const userSuggestions = contacts.filter(user =>
        user.name.toLowerCase().includes(inputLowerCase)
    );

    const companySuggestions = companies.filter(organisation =>
        organisation.name.toLowerCase().includes(inputLowerCase)
    );

    const contractsSuggestions = contracts.filter(contract =>
        contract.name.toLowerCase().includes(inputLowerCase)
    );
    return [
        ...userSuggestions.map(suggestion => ({
            ...suggestion,
            actions: type.find(e => e.name === suggestion.type)?.actions || []
        })),
        ...companySuggestions.map(suggestion => ({
            ...suggestion,
            actions: type.find(e => e.name === suggestion.type)?.actions || []
        })),
        ...contractsSuggestions.map(suggestion => ({
            ...suggestion,
            actions: type.find(e => e.name === suggestion.type)?.actions || []
        }))

    ];
}
