export interface Answer {
    time: Date
    question: string
    answer: Message
}

export interface Message {
    value: string
    positivity: 'positive' | 'neutral' | 'negative'
}