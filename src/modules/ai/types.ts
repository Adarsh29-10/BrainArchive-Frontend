export type IMessageRole = "user" | "ai"

export interface IMessage {
    id: string | null;
    role: IMessageRole;
    text: string;
}