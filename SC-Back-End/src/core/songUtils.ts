
/**
 * call this function remove all non ascii from a string. 
 * Please note it is preferable to replace non-ascii chars with
 * their ascii equivalents.
 * @param text the text to strip
 */
export function stripNonASCII(text: string) {
    return text.replace(/[^\x00-\x7F]/g, "");
}

export function removeSmartQuotes(text: string): string {
    return text.replace(/[\u2018\u2019]/g, "'")
        .replace(/[\u201C\u201D]/g, '"');
}