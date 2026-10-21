import { replaceText } from "./replaceText";

export function convertToSnakeCase(text: string, splitBy: string) {
   const words = text.split(splitBy).map((word) => {
      return word.toLowerCase();
   });

   return words.join('_');
}

export const snakeCase = (text: string) => {
   return replaceText(text, '_').toLowerCase();
}