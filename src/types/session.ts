import type { Block } from "./block";

export interface Session {
    id: string
    notebookId: string;
    title: string;
    blocks: Block[];
    totalTimeSpent: number;
    createdAt: Date;
    updatedAt: Date;
}

