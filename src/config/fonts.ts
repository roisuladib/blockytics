import { Roboto as FontMono, Inter as FontSans, Roboto_Serif } from 'next/font/google';

export const fontSans = FontSans({
   subsets: ['latin'],
   variable: '--font-sans',
});

export const fontMono = FontMono({
   subsets: ['latin'],
   variable: '--font-mono',
   weight: ['400', '500', '700'],
});

export const fontSerif = Roboto_Serif({
   subsets: ['latin'],
   variable: '--font-serif',
});
