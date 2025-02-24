type convertAoaToCsvArgs = {
    aoa: string[][];
    options?: {
        delimiter?: string;
        clif?: string;
    };
};

const defaultOptions = {
    delimiter: ",",
    clif: "\n",
}


export const convertAoaToCsv = (args:convertAoaToCsvArgs): string => {
    const { aoa, options } = args;
    const { delimiter, clif } = { ...defaultOptions, ...options };
    return aoa.map((row) => row.join(delimiter)).join(clif);
};