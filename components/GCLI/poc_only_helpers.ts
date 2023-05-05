import {type} from "./data";

export const getSuggestions = (input:string) => {
    // const inputLowerCase = input.toLowerCase();
    // const userSuggestions = contacts.filter((user: any) =>
    //     user.name.toLowerCase().includes(inputLowerCase)
    // );
    //
    // const companySuggestions = companies.filter((organisation: any) =>
    //     organisation.name.toLowerCase().includes(inputLowerCase)
    // );
    //
    // const contractsSuggestions = contracts.filter((contract: any) =>
    //     contract.name.toLowerCase().includes(inputLowerCase)
    // );
    return [
        // ...userSuggestions.map((suggestion: any) => ({
        //     ...suggestion,
        //     actions: type.find(e => e.name === suggestion.type)?.actions || []
        // })),
        // ...companySuggestions.map((suggestion: any) => ({
        //     ...suggestion,
        //     actions: type.find(e => e.name === suggestion.type)?.actions || []
        // })),
        // ...contractsSuggestions.map((suggestion: any) => ({
        //     ...suggestion,
        //     actions: type.find(e => e.name === suggestion.type)?.actions || []
        // }))
    ];
}
