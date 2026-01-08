import { api } from "./axios.api";
import type { Notebook } from "../types/notebook";
import type { Block } from "../types/block";


export const getNotebooks = async (): Promise<Notebook[]> => {
    const res = await api.get('/notebooks');
    return res.data.data;
}

export const createNotebook = async (data: {
    title: string;
    description?: string;
    blocks: [];
    isPublic: boolean;
    lastActivityAt: Date;
    totalTimeSpent: number;
}) => {
    const res = await api.post('/notebooks', data);
    return res.data.data;
}

export const updateNotebook = async (data: {
    notebookId: string,
    title: string,
    description?: string,
}) => {
    const {notebookId, ...payload} = data;
    const res = await api.put(`/notebooks/${notebookId}`, payload);
    return res.data.data;
}

export const deleteNotebook = async (id:string) => {
    const res = await api.delete(`/notebooks/${id}`);
    return res.data.data;
}

export const getNotebookById = async (notebookId: string) => {
    const res = await api.get(`/notebooks/${notebookId}`);
    return res.data.data;
}

export const updateNotebookBlock = async (params: {
  notebookId: string;
  blocks: Block[];
}) => {
  const { notebookId, blocks } = params;

  const res = await api.patch(`/notebooks/${notebookId}/blocks`, {
    blocks,
  });

  return res.data.data;
};