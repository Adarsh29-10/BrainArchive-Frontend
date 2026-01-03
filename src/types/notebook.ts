export interface Notebook {
  _id: string;
  title: string;
  description: string;
  createdAt: Date;
  updatedAt: Date;
}

export type NotebookFormData = Omit<Notebook, 'id' | 'createdAt' | 'updatedAt'>;
