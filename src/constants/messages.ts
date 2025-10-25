import type {Message} from "./types.ts";

export const messages: Message[] = [
    {value: 'It is certain', positivity: 'positive'},
    {value: 'It is decidedly so', positivity: 'positive'},
    {value: 'Yes definitely', positivity: 'positive'},
    {value: 'You may rely on it', positivity: 'positive'},
    {value: 'Without a doubt', positivity: 'positive'},
    {value: 'As I see it, yes', positivity: 'positive'},
    {value: 'Most likely', positivity: 'positive'},
    {value: 'Outlook good', positivity: 'positive'},
    {value: 'Yes', positivity: 'positive'},
    {value: 'Signs point to yes', positivity: 'positive'},
    {value: 'Reply hazy, try again', positivity: 'neutral'},
    {value: 'Ask again later', positivity: 'neutral'},
    {value: 'Better not tell you now', positivity: 'neutral'},
    {value: 'Cannot predict now', positivity: 'neutral'},
    {value: 'Concentrate and ask again', positivity: 'neutral'},
    {value: 'Don\'t count on it', positivity: 'negative'},
    {value: 'My reply is no', positivity: 'negative'},
    {value: 'My sources say no', positivity: 'negative'},
    {value: 'Outlook not so good', positivity: 'negative'},
    {value: 'Very doubtful', positivity: 'negative'},
] as const