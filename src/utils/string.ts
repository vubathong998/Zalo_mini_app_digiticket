export const trimTextByChar = (text: string, characters: number) => {
    if (text.length <= characters) {
        return text;
    }
    //trim the string to the maximum length
    let trimmedString = text.slice(0, characters);

    //re-trim if we are in the middle of a word
    trimmedString = trimmedString.slice(
        0,
        Math.min(trimmedString.length, trimmedString.lastIndexOf(' ')),
    );

    if (trimmedString.length < text.length) {
        return `${trimmedString}...`;
    }

    return text;
};
