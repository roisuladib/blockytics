export function shortenString(string: string, charNumber = 8) {
   if (!string) return '';

   if (string.length <= charNumber) return string;

   return `${string.slice(0, charNumber - 4)}...${string.slice(-4)}`;
}
