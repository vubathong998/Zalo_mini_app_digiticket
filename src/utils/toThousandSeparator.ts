const toThousandSeparator = (num: number) => {
    return (+num || 0)
        .toFixed()
        .toString()
        .replace(/^-?\d+/g, (m) => m.replace(/(?=(?!\b)(\d{3})+$)/g, '.'));
};
export default toThousandSeparator;
