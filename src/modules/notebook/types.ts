import type { Block } from "../editor/types";

export interface Notebook {
  _id: string;
  title: string;
  description: string;
  isPublic: boolean;
  ownerName: string;
  ownerPicture: string;
  blocks: Block[];
  createdAt: Date;
  updatedAt: Date;
}

export type NotebookFormData = Omit<Notebook, 'id' | 'createdAt' | 'updatedAt'>;
