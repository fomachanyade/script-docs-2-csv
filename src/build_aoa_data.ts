type StringArrayToAoaArgs = {
    rows: string[][];
}

export const stringArrayToAoa = (
    arg: StringArrayToAoaArgs
): string[][] => {
    const { rows } = arg;

    const result:string[][] = [];

    const headers = ["#","name", "comment"]
    result.push(headers);

    for (let i = 0; i < rows.length; i++) {
        const line = rows[i];
        const id = (i + 1).toString();
        const row = [id, line[0], line[1]];
        result.push(row);
    }

    return result;
}
