export type IMessageRole = "user" | "ai"

export interface IMessage {
    _id: string;
    userId?: string;
    sessionId?: string;
    role: IMessageRole;
    content: string;
    createdAt?: string;
}