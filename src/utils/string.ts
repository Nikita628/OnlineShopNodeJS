export function toBoolean(str: string): boolean {
    const lowered = str.toLowerCase();

    if (lowered === 'true') {
        return true;
    } else if (lowered === 'false') {
        return false;
    }

    throw new Error('unkown value');
}