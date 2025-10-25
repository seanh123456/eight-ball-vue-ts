export interface Answer {
    question: string
    answer: Message
}

export interface Message {
    value: string
    positivity: 'positive' | 'neutral' | 'negative'
}