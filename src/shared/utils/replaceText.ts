export function replaceText(text: string, replace: string) {
   const replacer = (letter: string) => (`${replace}${letter}`);
   return text.replace(/[A-Z]/g, replacer);
}