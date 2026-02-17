import { api } from "./axios.api";
import type { Notebook } from "../types/notebook";

export const getNotebooks = async (): Promise<Notebook[]> => {
    const res = await api.get('/notebooks');
    return res.data.data;
}

export const getPublicNotebooks = async (): Promise<Notebook[]> => {
    const res = await api.get('/public/notebooks');
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
    isPublic: boolean
}) => {
    const {notebookId, ...payload} = data;
    const res = await api.put(`/notebooks/${notebookId}`, payload);
    return res.data.data;
}

export const deleteNotebook = async (id:string) => {
    const res = await api.delete(`/notebooks/${id}`);
    return res.data.data;
}

export const getNotebookById = async (notebookId: string | undefined) => {
    const res = await api.get(`/notebooks/${notebookId}`);
    return res.data.data;
}

export const addNotebookBlock = async (data: {
    notebookId: string | undefined;
    _id: string;
    type: string;
    prevBlockId: string;
}) => {
    const {notebookId} = data;

    const res = await api.post(`/notebooks/${notebookId}/block`, data);
    return res.data.data;
}

export const deleteNotebookBlock = async (data: {
    notebookId:string | undefined;
    _id: string;
}) => {
    const { notebookId, _id } = data;

    const res = await api.delete(`/notebooks/${notebookId}/block/${_id}`);

    return res.data.data;
}

export const updateNotebookBlockContent = async (data: {
  notebookId: string | undefined;
  _id: string; 
  content: string;
}) => {
  const { notebookId, ...payload } = data;

  const res = await api.patch(`/notebooks/${notebookId}/block`, payload);

  return res.data.data;
};
