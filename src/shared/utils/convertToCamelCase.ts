export function convertToCamelCase(text: string, splitBy: string) {
   const words = text.split(splitBy).map((word, index) => {
      word = word.toLowerCase();
      return index > 0 ? (word[0].toUpperCase() + word.slice(1)) : word;
   });

   return words.join('');
}