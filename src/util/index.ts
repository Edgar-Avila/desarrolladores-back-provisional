export const isPositiveInt = (str: string): boolean => {
    const num = Number(str);
    if (Number.isInteger(num) || num > 0) {
        return true;
    }
    return false;
}